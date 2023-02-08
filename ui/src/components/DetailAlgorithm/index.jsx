import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { algorithms } from './algorithms';
import DropdownList from 'react-widgets/DropdownList';
import ParamRenderer from './paramRenderer';
import ResultRenderer from './resultRenderer';
import APIS from '../../services/common';
import 'react-widgets/scss/styles.scss';
import './styles.scss';

const SOCKET_SERVER = 'http://127.0.0.1:5000/';
const MAX_RESULT_ATTR_LENGTH = 5
let socket;

function useAlgoParams(initParams) {
    const [params, setParams] = useState(initParams);

    function updateParams(key, value) {
        const newParams = params;
        newParams[key] = value;
        setParams(newParams);
    }

    return [params, updateParams];
}

function useAlgoResult(initResult) {
    const [result, setResult] = useState(initResult);

    function updateResult(key, value) {
        const newResult = result;
        if (!(key in newResult)) {
            newResult[key] = []
        }
        newResult[key].push(value);
        setResult(newResult);
    }

    return [result, updateResult, setResult];
}

export default function DetailAlgorithm() {
    const [algorithmName, setAlgorithmName] = useState('');
    const [algoParams, updateParams] = useAlgoParams({});
    const [algoResult, updateResult, setResult] = useAlgoResult({});
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (algoResult !== {}) {
            socket = io(SOCKET_SERVER);
            socket.on(algorithmName, (data) => {
                updateResult('avgTotal', parseFloat(data['avg_total']));
                updateResult('avgDelay', parseFloat(data['avg_delay']));
                updateResult('avgEnergy', parseFloat(data['avg_energy']));
                updateResult('avgBattery', parseFloat(data['avg_battery']));
                updateResult('avgBackup', parseFloat(data['avg_backup']));
                if (data['end_of_data'] === 'True') {
                    socket.disconnect();
                    setIsRunning(false);
                }
            });
        }

    }, [algoResult])

    const runAlgorithm = () => {
        setIsRunning(true);
        setResult({});
        APIS.runAlgorithm(algorithmName, algoParams);
    };

    return (
        <>
            <div className="detail-algorithm-view">
                <p className="h1-title-text text-center">
                    Set up algorithm parameters
                </p>
                <div className="component d-flex flex-row">
                    <div className="align-self-center mr-5">
                        <div className="h2-title-text align-middle">
                            Choose an algorithm
                        </div>
                    </div>
                    <div className="algo-dropdown">
                        <DropdownList
                            value={algorithmName}
                            placeholder="Select an algorithm"
                            onChange={(nextAlgorithm) =>
                                setAlgorithmName(nextAlgorithm)
                            }
                            data={Object.keys(algorithms)}
                        />
                    </div>
                </div>
                {algorithmName ? (
                    <div className="component mt-5 mb-2">
                        <div className="h2-title-text align-middle">
                            Choose {algorithmName} algorithm parameters
                        </div>
                        <div>
                            <ParamRenderer
                                params={algorithms[algorithmName].params}
                                updateParams={updateParams}
                            />
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={isRunning}
                                onClick={(e) => runAlgorithm()}
                            >
                                Run algorithm
                            </button>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {Object.keys(algoResult).length === MAX_RESULT_ATTR_LENGTH ? (
                <div className="detail-algorithm-view">
                    <p className="h1-title-text text-center">
                        Running {algorithmName} algorithm result
                    </p>
                    <div>
                        <ResultRenderer result={algoResult} />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

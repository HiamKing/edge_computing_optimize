import { useState } from 'react';
import { algorithms } from './algorithms';
import DropdownList from 'react-widgets/DropdownList';
import ParamRenderer from './paramRenderer';
import ResultRenderer from './resultRenderer';
import APIS from '../../services/common';
import 'react-widgets/scss/styles.scss';
import './styles.scss';

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
        newResult[key] = value;
        setResult(newResult);
    }

    return [result, updateResult];
}

export default function DetailAlgorithm() {
    const [algorithmName, setAlgorithmName] = useState('');
    const [algoParams, updateParams] = useAlgoParams({});
    const [algoResult, updateResult] = useAlgoResult({});
    const [isRunning, setIsRunning] = useState(false);

    const runAlgorithm = () => {
        setIsRunning(true);
        APIS.runAlgorithm(algorithmName, algoParams).then((res) => {
            updateResult('areaGraph', res.data.area_graph);
            updateResult('avgTotal', res.data.avg_total);
            updateResult('avgDelay', res.data.avg_delay);
            updateResult('avgEnergy', res.data.avg_energy);
            updateResult('avgBattery', res.data.avg_battery);
            updateResult('avgBackup', res.data.avg_backup);
            setIsRunning(false);
        });
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
                                class="btn btn-primary"
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
            {!isRunning && Object.keys(algoResult).length !== 0 ? (
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

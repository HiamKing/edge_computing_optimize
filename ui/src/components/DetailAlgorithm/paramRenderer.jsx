import { useState } from 'react';

function InputRenderer({ paramLabel, paramMapping, updateParams }) {
    const [param, setParam] = useState('');

    return (
        <div className="mt-3 ml-5 d-flex flex-row">
            <div className="param-text align-self-center mr-4">
                <div className="align-middle">{paramLabel}</div>
            </div>
            <div className="algo-input">
                <input
                    className="w-100 h-100 p-1"
                    value={param}
                    placeholder="Enter a value"
                    onChange={(event) => {
                        setParam(event.target.value);
                        updateParams(paramMapping, event.target.value);
                    }}
                />
            </div>
        </div>
    );
}

function RangeInputRenderer({ paramLabel, paramMapping, updateParams }) {
    const [lowParam, setLowParam] = useState('');
    const [highparam, setHighParam] = useState('');

    return (
        <div className="mt-3 ml-5 d-flex flex-row">
            <div className="param-text align-self-center mr-4">
                <div className="align-middle">{paramLabel}</div>
            </div>
            <div className="algo-range-input">
                <input
                    className="w-80 h-100 p-1"
                    value={lowParam}
                    placeholder="Enter a low value"
                    onChange={(event) => {
                        setLowParam(event.target.value);
                        updateParams(paramMapping.low, event.target.value);
                    }}
                />
            </div>
            <div className="algo-range-input">
                <input
                    className="w-80 h-100 p-1"
                    value={highparam}
                    placeholder="Enter a high value"
                    onChange={(event) => {
                        setHighParam(event.target.value);
                        updateParams(paramMapping.high, event.target.value);
                    }}
                />
            </div>
        </div>
    );
}

const paramRendererMp = {
    'Priority coefficient': InputRenderer,
    'Number of servers': InputRenderer,
    'Length each time slot': InputRenderer,
    'Battery capacity': InputRenderer,
    'Server service rate': InputRenderer,
    'Workload (λ)': RangeInputRenderer,
    'Network congestion (k)': RangeInputRenderer,
    'Back up power coefficient (φ)': InputRenderer,
    'Battery depreciation coefficient (ω)': InputRenderer,
    'Base station static power': InputRenderer,
    'Dynamic power coefficient': InputRenderer,
    'Server power consumption': InputRenderer,
    'Time steps per episode': InputRenderer,
    'Training time slots': InputRenderer,
    'Time slots': InputRenderer,
    'Verbose': InputRenderer,
    'Random seed': InputRenderer,
};

export default function ParamRenderer({ params, paramMapping, updateParams }) {
    return (
        <div>
            {params.map((param) => {
                const ParamRenderer = paramRendererMp[param];
                return (
                    <ParamRenderer
                        key={param}
                        paramLabel={param}
                        paramMapping={paramMapping[param]}
                        updateParams={updateParams}
                    />
                );
            })}
        </div>
    );
}

import { useState } from 'react';

function TimeStepRenderer({ updateParams }) {
    const [timeSteps, setTimeSteps] = useState('');

    return (
        <div className="mt-3 ml-5 d-flex flex-row">
            <div className="param-text align-self-center mr-4">
                <div className="align-middle">Time steps</div>
            </div>
            <div className="algo-input">
                <input
                    className="w-100 h-100 p-1"
                    value={timeSteps}
                    placeholder="Enter a time steps"
                    onChange={(event) => {
                        setTimeSteps(event.target.value);
                        updateParams('time_steps', event.target.value);
                    }}
                />
            </div>
        </div>
    );
}

function TimeSlotRenderer({ updateParams }) {
    const [timeSlots, setTimeSlots] = useState('');

    return (
        <div className="mt-3 ml-5 d-flex flex-row">
            <div className="param-text align-self-center mr-4">
                <div className="align-middle">Time slots</div>
            </div>
            <div className="algo-input">
                <input
                    className="w-100 h-100 p-1"
                    value={timeSlots}
                    placeholder="Enter a time slots"
                    onChange={(event) => {
                        setTimeSlots(event.target.value);
                        updateParams('time_slots', event.target.value);
                    }}
                />
            </div>
        </div>
    );
}

function PcoeffRenderer({ updateParams }) {
    const [pCoeff, setpCoeff] = useState('');

    return (
        <div className="mt-3 ml-5 d-flex flex-row">
            <div className="param-text align-self-center mr-4">
                <div className="align-middle">Partition coefficient</div>
            </div>
            <div className="algo-input">
                <input
                    className="w-100 h-100 p-1"
                    value={pCoeff}
                    placeholder="Enter a partition coefficient"
                    onChange={(event) => {
                        setpCoeff(event.target.value);
                        updateParams('p_coeff', event.target.value);
                    }}
                />
            </div>
        </div>
    );
}

function VerboseRenderer({ updateParams }) {
    const [verbose, setVerbose] = useState('');

    return (
        <div className="mt-3 ml-5 d-flex flex-row">
            <div className="param-text align-self-center mr-4">
                <div className="align-middle">Verbose</div>
            </div>
            <div className="algo-input">
                <input
                    className="w-100 h-100 p-1"
                    value={verbose}
                    placeholder="Enter a verbose"
                    onChange={(event) => {
                        setVerbose(event.target.value);
                        updateParams('verbose', event.target.value);
                    }}
                />
            </div>
        </div>
    );
}

function RSeedRenderer({ updateParams }) {
    const [rSeed, setRSeed] = useState('');

    return (
        <div className="mt-3 ml-5 d-flex flex-row">
            <div className="param-text align-self-center mr-4">
                <div className="align-middle">Random seed</div>
            </div>
            <div className="algo-input">
                <input
                    className="w-100 h-100 p-1"
                    value={rSeed}
                    placeholder="Enter a random seed"
                    onChange={(event) => {
                        setRSeed(event.target.value);
                        updateParams('random_seed', event.target.value);
                    }}
                />
            </div>
        </div>
    );
}

const paramRendererMp = {
    'Time steps': TimeStepRenderer,
    'Time slots': TimeSlotRenderer,
    'Partition coefficient': PcoeffRenderer,
    Verbose: VerboseRenderer,
    'Random seed': RSeedRenderer,
};

export default function ParamRenderer({ params, updateParams }) {
    return (
        <div>
            {params.map((param) => {
                const ParamRenderer = paramRendererMp[param];
                return (
                    <ParamRenderer key={param} updateParams={updateParams} />
                );
            })}
        </div>
    );
}

import Plot from 'react-plotly.js';

function AreaGraphRenderer({ delayData, bakData, batteryData }) {
    console.log([Array.from(Array(delayData.length).keys())])
    console.log(delayData)
    console.log(bakData)
    console.log(batteryData)
    return (
        <div className="component">
            <div className="align-self-center mr-5">
                <div className="h2-title-text align-middle">
                    Average Costs Graph
                </div>
            </div>
            <Plot
                data={[
                    {
                        x: [Array.from(Array(delayData.length).keys())],
                        y: [Array.from(Array(delayData.length).keys())],
                        name: 'Delay Cost',
                        stackgroup: 'one'
                    },
                    {
                        x: [Array.from(Array(bakData.length).keys())],
                        y: [Array.from(Array(bakData.length).keys())],
                        name: 'Backup Cost',
                        stackgroup: 'one'

                    },
                    {
                        x: [Array.from(Array(batteryData.length).keys())],
                        y: [Array.from(Array(batteryData.length).keys())],
                        name: 'Battery Cost',
                        stackgroup: 'one'

                    },
                ]}
                layout={{ width: 800, height: 600, title: 'Average Costs Graph' }}
            />
        </div>
    );
}

// function AvgTotalRenderer() {

// }

// function AvgDelayRenderer() {

// }

// function AvgEnergyRenderer() {

// }

// function AvgBatteryRenderer() {

// }

// function AvgBackupRenderer() {

// }

export default function ResultRenderer({ result }) {
    return (
        <>
            <AreaGraphRenderer
                delayData={result['avgDelay']}
                bakData={result['avgBackup']}
                batteryData={result['avgBattery']}
            />
        </>
    );
}

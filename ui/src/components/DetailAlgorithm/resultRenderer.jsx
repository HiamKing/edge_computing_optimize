import Plot from 'react-plotly.js';
import _ from 'lodash';

function AreaGraphRenderer({ delayData, bakData, batteryData }) {
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
                        x: Array.from(Array(delayData.length).keys()),
                        y: delayData,
                        name: 'Delay Cost',
                        stackgroup: 'one'
                    },
                    {
                        x: Array.from(Array(bakData.length).keys()),
                        y: bakData,
                        name: 'Backup Cost',
                        stackgroup: 'one'

                    },
                    {
                        x: Array.from(Array(batteryData.length).keys()),
                        y: batteryData,
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
                delayData={_.get(result, 'avgDelay', [])}
                bakData={_.get(result, 'avgBackup', [])}
                batteryData={_.get(result, 'avgBattery', [])}
            />
        </>
    );
}

import Plot from 'react-plotly.js';
import _ from 'lodash';

function AreaGraphRenderer({ delayData, bakData, batteryData }) {
    const layout = {
        width: 800,
        height: 600,
        title: 'Average Costs Graph',
        xaxis: {
        title: {
            text: 'Time slot',
            font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
            }
        },
        },
        yaxis: {
        title: {
            text: 'Average Costs',
            font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
            }
        }
        }
    }

    return (
        <div className="component">
            <div className="align-self-center mr-5">
                <div className="h2-title-text align-middle">
                    Average Costs Graph
                </div>
            </div>
            <Plot
                layout={layout}
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

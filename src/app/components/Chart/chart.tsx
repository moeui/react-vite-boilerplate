import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/bar'

import * as echarts from 'echarts/lib/echarts'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import * as React from 'react'

interface IChart {
    data: any
    xAxis: string
    yAxis: string
    lineName: string
    grid?: {
        top?: string
        left: string
        right: string
    }
}

export default class Echarts extends React.Component<IChart> {
    public render() {
        const { data, xAxis, yAxis, lineName } = this.props
        if (!data) {
            return null
        }
        const xAxisList = []
        const yAxisList = []
        data.forEach(item => {
            xAxisList.push(item[xAxis])
            yAxisList.push(item[yAxis])
        })
        const grid = {
            top: '5%',
            left: '12%',
            right: '2%',
            bottom: '10%'
        }

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxisList,
                    axisLine: {
                        lineStyle: {
                            color: '#f4f4f4'
                        }
                    },
                    axisLabel: {
                        color: '#999999'
                    },
                    offset: 2
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#f4f4f4'
                        }
                    },
                    axisLabel: {
                        color: '#999999'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#f4f4f4'
                        }
                    }
                }
            ],
            series: [
                {
                    name: lineName,
                    type: 'line',
                    data: yAxisList,
                    smooth: true,
                    itemStyle: {
                        color: '#49BFB9'
                    },
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#AAEEEB' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(216, 216, 216, 0)' // 100% 处的颜色
                                    }
                                ],
                                global: false // 缺省为 false
                            }
                        }
                    }
                }
            ],
            grid: this.props.grid ? { ...grid, ...this.props.grid } : grid
        }

        return (
            <ReactEchartsCore
                echarts={echarts}
                option={option}
                className="user-chart"
                notMerge={true}
                lazyUpdate={true}
                style={{
                    height: 250
                }}
            />
        )
    }
}

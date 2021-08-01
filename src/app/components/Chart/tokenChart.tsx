import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/bar'

import * as echarts from 'echarts/lib/echarts'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import * as React from 'react'

interface IItem {
    type?: string
    name: string
    value: string
}

interface IChart {
    data: any
    xAxis: string
    yAxisArr: IItem[]
    grid?: {
        top?: string
        left: string
        right: string
    }
}

const COLORS = ['#49BFB9', '#ff6700', '#80027e', '#155fab', '#fec565', '#a6e22e', '#1890ff', '#3d655e']

export default function Chart(props: IChart) {
    const { data, xAxis, yAxisArr } = props
    if (!data) {
        return null
    }

    const seriesItem = {
        type: 'line',
        smooth: true,
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

    const xAxisList = []
    const seriesArr = []
    const yAxisObj = {}
    const legend = []
    yAxisArr.forEach((yAxis, index) => {
        const key = `${yAxis.type || ''}${yAxis.name}`
        const name = `${yAxis.type || ''}${yAxis.value}`
        yAxisObj[key] = []
        data.forEach(item => {
            if (!index) {
                xAxisList.push(item[xAxis])
            }
            yAxisObj[key].push(item[key] || 0)
        })
        legend.push(name)
        seriesArr.push({
            name,
            data: yAxisObj[key],
            itemStyle: {
                color: COLORS[index]
            },
            ...seriesItem
        })
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
        legend: {
            data: legend
        },
        series: seriesArr,
        grid: props.grid ? { ...grid, ...props.grid } : grid
    }

    return (
        <ReactEchartsCore
            echarts={echarts}
            option={option}
            className="user-chart"
            notMerge={true}
            lazyUpdate={true}
            style={{
                height: 350
            }}
        />
    )
}

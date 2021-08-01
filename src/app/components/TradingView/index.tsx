import { createChart, IChartApi } from 'lightweight-charts'
import * as React from 'react'
import { memo, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'

import { resize } from '../../utils/tool'

interface IProps {
    className?: string
    isShowFooter?: false
    children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<IProps> = (props: IProps): React.ReactElement => {
    const wrapDom = useRef<HTMLDivElement>(null)
    const boxDom = useRef<HTMLDivElement>(null)
    const [chart, setChart] = useState<IChartApi>()

    useEffect(() => {
        if (wrapDom.current) {
            setChart(
                createChart(wrapDom.current, {
                    width: 600,
                    height: 300,
                    timeScale: {
                        timeVisible: true,
                        borderColor: '#D1D4DC'
                    },
                    rightPriceScale: {
                        borderColor: '#D1D4DC'
                    },
                    layout: {
                        backgroundColor: '#131722',
                        textColor: '#d1d4dc'
                    },
                    grid: {
                        horzLines: {
                            color: '#F0F3FA'
                        },
                        vertLines: {
                            color: '#F0F3FA'
                        }
                    }
                })
            )
        }
    }, [wrapDom])

    useEffect(() => {
        if (chart) {
            // const lineSeries = chart.addLineSeries()
            // lineSeries.setData([
            //     { time: '2019-04-11', value: 80.01 },
            //     { time: '2019-04-12', value: 96.63 },
            //     { time: '2019-04-13', value: 76.64 },
            //     { time: '2019-04-14', value: 81.89 },
            //     { time: '2019-04-15', value: 74.43 },
            //     { time: '2019-04-16', value: 80.01 },
            //     { time: '2019-04-17', value: 96.63 },
            //     { time: '2019-04-18', value: 76.64 },
            //     { time: '2019-04-19', value: 81.89 },
            //     { time: '2019-04-20', value: 74.43 }
            // ])
            const series = chart.addCandlestickSeries({
                upColor: 'rgb(38,166,154)',
                downColor: 'rgb(255,82,82)',
                wickUpColor: 'rgb(38,166,154)',
                wickDownColor: 'rgb(255,82,82)',
                borderVisible: false
            })
            const data = [
                {
                    time: { year: 2018, month: 9, day: 22 },
                    open: 29.630237296336794,
                    high: 35.36950035097501,
                    low: 26.21522501353531,
                    close: 30.734997177569916
                },
                {
                    time: { year: 2018, month: 9, day: 23 },
                    open: 32.267626500691215,
                    high: 34.452661663723774,
                    low: 26.096868360824704,
                    close: 29.573918833457004
                },
                {
                    time: { year: 2018, month: 9, day: 24 },
                    open: 27.33996760497746,
                    high: 35.8060364835531,
                    low: 27.33996760497746,
                    close: 33.06283432964511
                },
                {
                    time: { year: 2018, month: 9, day: 25 },
                    open: 31.1654368745013,
                    high: 31.97284477478497,
                    low: 26.766743287285593,
                    close: 27.364979322283386
                },
                {
                    time: { year: 2018, month: 9, day: 26 },
                    open: 29.5901452337888,
                    high: 32.147919593347474,
                    low: 27.53289219709677,
                    close: 29.202912415085272
                },
                {
                    time: { year: 2018, month: 9, day: 27 },
                    open: 27.561741523265923,
                    high: 35.11649043301526,
                    low: 25.20035866163233,
                    close: 31.14520649627546
                },
                {
                    time: { year: 2018, month: 9, day: 28 },
                    open: 31.925975006823798,
                    high: 31.925975006823798,
                    low: 28.998500720406675,
                    close: 29.87723790403876
                },
                {
                    time: { year: 2018, month: 9, day: 29 },
                    open: 30.826956088992475,
                    high: 34.79463130873015,
                    low: 25.291546123273097,
                    close: 28.994812708315987
                },
                {
                    time: { year: 2018, month: 9, day: 30 },
                    open: 31.202920145287838,
                    high: 33.19178819590413,
                    low: 23.94419012923956,
                    close: 31.47253745770869
                },
                {
                    time: { year: 2018, month: 10, day: 1 },
                    open: 26.927794164758666,
                    high: 34.6744456778885,
                    low: 26.927794164758666,
                    close: 31.091122539737423
                },
                {
                    time: { year: 2018, month: 10, day: 2 },
                    open: 26.452041173938298,
                    high: 34.527917622572154,
                    low: 26.452041173938298,
                    close: 27.65703395829094
                },
                {
                    time: { year: 2018, month: 10, day: 3 },
                    open: 27.74629982387605,
                    high: 29.300441707649835,
                    low: 23.761300216231263,
                    close: 29.182874625005628
                },
                {
                    time: { year: 2018, month: 10, day: 4 },
                    open: 30.41599722290526,
                    high: 31.942643078777103,
                    low: 27.09925359459428,
                    close: 30.918477883682872
                },
                {
                    time: { year: 2018, month: 10, day: 5 },
                    open: 25.76549797105683,
                    high: 33.4650523853759,
                    low: 25.76549797105683,
                    close: 28.15984801386293
                },
                {
                    time: { year: 2018, month: 10, day: 6 },
                    open: 27.543404135965382,
                    high: 30.7227783000902,
                    low: 25.749951838020884,
                    close: 29.150903848724184
                },
                {
                    time: { year: 2018, month: 10, day: 7 },
                    open: 29.34759861812077,
                    high: 31.08503530472835,
                    low: 23.395022079647823,
                    close: 25.00923131079722
                },
                {
                    time: { year: 2018, month: 10, day: 8 },
                    open: 27.00266154335036,
                    high: 29.51599687178633,
                    low: 23.46749249241176,
                    close: 28.702932483799707
                },
                {
                    time: { year: 2018, month: 10, day: 9 },
                    open: 25.569958099853594,
                    high: 27.669071502065417,
                    low: 25.569958099853594,
                    close: 25.626920473922613
                },
                {
                    time: { year: 2018, month: 10, day: 10 },
                    open: 24.886919828178304,
                    high: 27.167620185117006,
                    low: 23.71595991386752,
                    close: 23.71595991386752
                },
                {
                    time: { year: 2018, month: 10, day: 11 },
                    open: 26.14124249813686,
                    high: 29.5638477987916,
                    low: 20.82341105699825,
                    close: 25.563138238511257
                },
                {
                    time: { year: 2018, month: 10, day: 12 },
                    open: 22.26412127509447,
                    high: 27.637685003390743,
                    low: 20.838507431464958,
                    close: 22.450517792778047
                },
                {
                    time: { year: 2018, month: 10, day: 13 },
                    open: 25.75099239090953,
                    high: 28.12000626118839,
                    low: 21.929748303510852,
                    close: 22.63015682488669
                },
                {
                    time: { year: 2018, month: 10, day: 14 },
                    open: 25.428132591291497,
                    high: 25.999229490809693,
                    low: 22.266121337091555,
                    close: 23.51047528528147
                },
                {
                    time: { year: 2018, month: 10, day: 15 },
                    open: 25.07416967939059,
                    high: 25.50535192500713,
                    low: 21.96666570325133,
                    close: 21.96666570325133
                },
                {
                    time: { year: 2018, month: 10, day: 16 },
                    open: 24.957206161449307,
                    high: 26.679727314857256,
                    low: 20.196753994637245,
                    close: 21.523347810451863
                },
                {
                    time: { year: 2018, month: 10, day: 17 },
                    open: 23.705184745772733,
                    high: 26.754094837621004,
                    low: 18.724184302695104,
                    close: 20.160857555541725
                },
                {
                    time: { year: 2018, month: 10, day: 18 },
                    open: 21.95610851644136,
                    high: 22.914889536420105,
                    low: 19.567733140100472,
                    close: 22.914889536420105
                },
                {
                    time: { year: 2018, month: 10, day: 19 },
                    open: 23.216357873687972,
                    high: 25.44815512734246,
                    low: 19.54787451276509,
                    close: 20.76851802225937
                },
                {
                    time: { year: 2018, month: 10, day: 20 },
                    open: 19.6289025950405,
                    high: 24.290702755740412,
                    low: 19.041541929894358,
                    close: 22.48608548162324
                },
                {
                    time: { year: 2018, month: 10, day: 21 },
                    open: 23.599000037544915,
                    high: 26.839019853462844,
                    low: 20.884129956680898,
                    close: 22.01878871761756
                },
                {
                    time: { year: 2018, month: 10, day: 22 },
                    open: 24.618502768742008,
                    high: 28.00099352255492,
                    low: 23.061935629399088,
                    close: 23.061935629399088
                },
                {
                    time: { year: 2018, month: 10, day: 23 },
                    open: 23.840701995876866,
                    high: 28.494382608429564,
                    low: 23.840701995876866,
                    close: 25.321841131665526
                },
                {
                    time: { year: 2018, month: 10, day: 24 },
                    open: 27.764925733189372,
                    high: 31.05550601484776,
                    low: 22.810929726970702,
                    close: 30.02406259204889
                },
                {
                    time: { year: 2018, month: 10, day: 25 },
                    open: 29.703149280184604,
                    high: 34.0185175501095,
                    low: 26.82967654698301,
                    close: 32.06834171351323
                },
                {
                    time: { year: 2018, month: 10, day: 26 },
                    open: 29.0251492427822,
                    high: 36.89478162439007,
                    low: 28.3502671011196,
                    close: 32.822663125409356
                },
                {
                    time: { year: 2018, month: 10, day: 27 },
                    open: 35.040777462643284,
                    high: 35.12524316379231,
                    low: 26.805156020579663,
                    close: 34.23626219571325
                },
                {
                    time: { year: 2018, month: 10, day: 28 },
                    open: 31.21349419519032,
                    high: 35.73068910379853,
                    low: 31.064101813812698,
                    close: 34.75020857236565
                },
                {
                    time: { year: 2018, month: 10, day: 29 },
                    open: 32.34914826794689,
                    high: 42.381605482695505,
                    low: 30.176750284055878,
                    close: 39.24138147444552
                },
                {
                    time: { year: 2018, month: 10, day: 30 },
                    open: 38.84583808993371,
                    high: 41.75165839362154,
                    low: 33.37106955991806,
                    close: 35.93904098275507
                },
                {
                    time: { year: 2018, month: 10, day: 31 },
                    open: 37.070183005323564,
                    high: 44.84460203857022,
                    low: 35.23671284121251,
                    close: 36.329972003600034
                },
                {
                    time: { year: 2018, month: 11, day: 1 },
                    open: 43.31997309164893,
                    high: 48.43216497187469,
                    low: 38.30881963355285,
                    close: 41.554948540677586
                },
                {
                    time: { year: 2018, month: 11, day: 2 },
                    open: 41.33946811092929,
                    high: 46.65347243834853,
                    low: 37.472215586661335,
                    close: 39.26832265482503
                },
                {
                    time: { year: 2018, month: 11, day: 3 },
                    open: 44.76468593661226,
                    high: 44.76468593661226,
                    low: 40.039672147314235,
                    close: 43.42106786288436
                },
                {
                    time: { year: 2018, month: 11, day: 4 },
                    open: 49.13160326887013,
                    high: 49.13160326887013,
                    low: 40.93648693038296,
                    close: 42.17817698294767
                },
                {
                    time: { year: 2018, month: 11, day: 5 },
                    open: 50.46706012970579,
                    high: 54.38104598422352,
                    low: 38.159930155343616,
                    close: 47.5899156640143
                },
                {
                    time: { year: 2018, month: 11, day: 6 },
                    open: 48.25899506613569,
                    high: 48.25899506613569,
                    low: 45.63208604138365,
                    close: 45.63208604138365
                },
                {
                    time: { year: 2018, month: 11, day: 7 },
                    open: 52.45484210527629,
                    high: 57.55979771849961,
                    low: 45.23447676016779,
                    close: 46.01127464234881
                },
                {
                    time: { year: 2018, month: 11, day: 8 },
                    open: 53.228216675179624,
                    high: 54.07804814570622,
                    low: 40.61161433961706,
                    close: 47.689867390699014
                },
                {
                    time: { year: 2018, month: 11, day: 9 },
                    open: 46.193099316212816,
                    high: 56.190537353078824,
                    low: 45.01246323828753,
                    close: 49.14012661656766
                },
                {
                    time: { year: 2018, month: 11, day: 10 },
                    open: 50.409245396927986,
                    high: 52.3082002787041,
                    low: 41.764144138886394,
                    close: 52.3082002787041
                },
                {
                    time: { year: 2018, month: 11, day: 11 },
                    open: 48.58146178816203,
                    high: 52.653922195022126,
                    low: 47.34031788474959,
                    close: 47.34031788474959
                },
                {
                    time: { year: 2018, month: 11, day: 12 },
                    open: 46.80040325283692,
                    high: 56.709349494076804,
                    low: 45.81605691554122,
                    close: 45.81605691554122
                },
                {
                    time: { year: 2018, month: 11, day: 13 },
                    open: 46.042722425788355,
                    high: 58.476056411825695,
                    low: 46.042722425788355,
                    close: 51.2300776481609
                },
                {
                    time: { year: 2018, month: 11, day: 14 },
                    open: 53.909068487588385,
                    high: 60.240990154306715,
                    low: 45.230741063278664,
                    close: 51.34529637385427
                },
                {
                    time: { year: 2018, month: 11, day: 15 },
                    open: 53.739609857086606,
                    high: 53.739609857086606,
                    low: 44.38017019990068,
                    close: 47.595960698697894
                },
                {
                    time: { year: 2018, month: 11, day: 16 },
                    open: 52.52688238296145,
                    high: 60.9220040817774,
                    low: 44.27700764117003,
                    close: 55.27309771985698
                },
                {
                    time: { year: 2018, month: 11, day: 17 },
                    open: 54.46100795908005,
                    high: 57.57937841117058,
                    low: 49.50543170388487,
                    close: 49.50543170388487
                },
                {
                    time: { year: 2018, month: 11, day: 18 },
                    open: 51.12284024600029,
                    high: 57.646718858433026,
                    low: 48.73280269653226,
                    close: 51.35457902694444
                },
                {
                    time: { year: 2018, month: 11, day: 19 },
                    open: 53.536130807863266,
                    high: 53.536130807863266,
                    low: 51.29649965636722,
                    close: 52.99088526565045
                },
                {
                    time: { year: 2018, month: 11, day: 20 },
                    open: 50.92761950009885,
                    high: 57.70671943558014,
                    low: 46.45030483558741,
                    close: 52.229112575743066
                },
                {
                    time: { year: 2018, month: 11, day: 21 },
                    open: 49.30035068900293,
                    high: 58.67691694734525,
                    low: 44.63563165197862,
                    close: 58.67691694734525
                },
                {
                    time: { year: 2018, month: 11, day: 22 },
                    open: 54.230476484061036,
                    high: 59.03831193868438,
                    low: 50.77849134047791,
                    close: 59.03831193868438
                },
                {
                    time: { year: 2018, month: 11, day: 23 },
                    open: 57.282420985156854,
                    high: 60.4869735007396,
                    low: 44.14116488798797,
                    close: 57.93461310007337
                },
                {
                    time: { year: 2018, month: 11, day: 24 },
                    open: 54.86833150125539,
                    high: 64.25102812467448,
                    low: 52.36616043331222,
                    close: 52.36616043331222
                },
                {
                    time: { year: 2018, month: 11, day: 25 },
                    open: 51.689239380620386,
                    high: 64.29747922654688,
                    low: 50.71498529572432,
                    close: 60.518206306602394
                },
                {
                    time: { year: 2018, month: 11, day: 26 },
                    open: 55.74863310659164,
                    high: 60.816819055612584,
                    low: 46.11238607935206,
                    close: 59.23044859881929
                },
                {
                    time: { year: 2018, month: 11, day: 27 },
                    open: 52.57406222528308,
                    high: 64.2058753841427,
                    low: 48.163404012323305,
                    close: 60.593847809696896
                },
                {
                    time: { year: 2018, month: 11, day: 28 },
                    open: 57.50710740029724,
                    high: 60.12123058977347,
                    low: 49.61839271711267,
                    close: 53.29152711098895
                },
                {
                    time: { year: 2018, month: 11, day: 29 },
                    open: 57.33581828303538,
                    high: 58.92432332528284,
                    low: 53.27790061455899,
                    close: 57.02787118731709
                },
                {
                    time: { year: 2018, month: 11, day: 30 },
                    open: 57.527445314328595,
                    high: 67.63249690962569,
                    low: 49.603261485289146,
                    close: 54.589123556483656
                },
                {
                    time: { year: 2018, month: 12, day: 1 },
                    open: 59.98835793934424,
                    high: 65.51917884840141,
                    low: 52.32535994476165,
                    close: 62.127135611086565
                },
                {
                    time: { year: 2018, month: 12, day: 2 },
                    open: 52.509550731662536,
                    high: 58.49971806419494,
                    low: 52.509550731662536,
                    close: 54.759948868082255
                },
                {
                    time: { year: 2018, month: 12, day: 3 },
                    open: 58.08470541982317,
                    high: 62.74987556918568,
                    low: 47.85627992158991,
                    close: 58.690428071336406
                },
                {
                    time: { year: 2018, month: 12, day: 4 },
                    open: 58.28482939034761,
                    high: 69.16675825892361,
                    low: 57.41588944088662,
                    close: 57.74515245619454
                },
                {
                    time: { year: 2018, month: 12, day: 5 },
                    open: 60.004299871302464,
                    high: 65.82447121605708,
                    low: 53.13330527599658,
                    close: 57.64488004774012
                },
                {
                    time: { year: 2018, month: 12, day: 6 },
                    open: 61.92746155137417,
                    high: 64.36944842979646,
                    low: 49.470442234694225,
                    close: 59.94404434023895
                },
                {
                    time: { year: 2018, month: 12, day: 7 },
                    open: 63.72235832229121,
                    high: 66.33649390307095,
                    low: 49.91822946887207,
                    close: 63.56396375320479
                },
                {
                    time: { year: 2018, month: 12, day: 8 },
                    open: 56.64594047326664,
                    high: 65.3730920902599,
                    low: 52.604389283975664,
                    close: 60.71684658387917
                },
                {
                    time: { year: 2018, month: 12, day: 9 },
                    open: 58.89798885700999,
                    high: 68.04578543284373,
                    low: 58.89798885700999,
                    close: 63.36111469854223
                },
                {
                    time: { year: 2018, month: 12, day: 10 },
                    open: 58.869685789579826,
                    high: 70.99828637845869,
                    low: 52.36901833289119,
                    close: 63.15473262144694
                },
                {
                    time: { year: 2018, month: 12, day: 11 },
                    open: 57.61362492091653,
                    high: 66.41975632948531,
                    low: 50.827182111530895,
                    close: 61.770769489947064
                },
                {
                    time: { year: 2018, month: 12, day: 12 },
                    open: 57.869332957269656,
                    high: 66.28374056429257,
                    low: 57.05028878520954,
                    close: 63.87762958979595
                },
                {
                    time: { year: 2018, month: 12, day: 13 },
                    open: 68.14347595614306,
                    high: 73.46304446829079,
                    low: 50.83319311788897,
                    close: 66.9144140431443
                },
                {
                    time: { year: 2018, month: 12, day: 14 },
                    open: 56.95907344942102,
                    high: 68.81432823196859,
                    low: 56.95907344942102,
                    close: 60.69722290026252
                },
                {
                    time: { year: 2018, month: 12, day: 15 },
                    open: 69.14662166493828,
                    high: 69.14662166493828,
                    low: 58.59143795311565,
                    close: 66.25235616866007
                },
                {
                    time: { year: 2018, month: 12, day: 16 },
                    open: 64.0373004661208,
                    high: 72.91321850066319,
                    low: 52.079104978168345,
                    close: 65.92678310822487
                },
                {
                    time: { year: 2018, month: 12, day: 17 },
                    open: 68.81814300123497,
                    high: 69.51927964796873,
                    low: 62.70935477415118,
                    close: 65.64565364397754
                },
                {
                    time: { year: 2018, month: 12, day: 18 },
                    open: 63.47554821643351,
                    high: 73.6284398311906,
                    low: 58.996882824636856,
                    close: 58.996882824636856
                },
                {
                    time: { year: 2018, month: 12, day: 19 },
                    open: 69.97765183896102,
                    high: 69.97765183896102,
                    low: 58.73355952507237,
                    close: 58.73355952507237
                },
                {
                    time: { year: 2018, month: 12, day: 20 },
                    open: 63.22638756186111,
                    high: 65.67137242291682,
                    low: 59.9542779777421,
                    close: 61.20003065016431
                },
                {
                    time: { year: 2018, month: 12, day: 21 },
                    open: 59.690029086102506,
                    high: 78.08665559197297,
                    low: 54.862707942292275,
                    close: 70.58935191024504
                },
                {
                    time: { year: 2018, month: 12, day: 22 },
                    open: 66.29092355620301,
                    high: 71.82667261213395,
                    low: 65.28001993201676,
                    close: 71.82667261213395
                },
                {
                    time: { year: 2018, month: 12, day: 23 },
                    open: 60.92645998120027,
                    high: 74.21283998861118,
                    low: 57.331119016099116,
                    close: 60.36728842356329
                },
                {
                    time: { year: 2018, month: 12, day: 24 },
                    open: 60.211957192084036,
                    high: 72.37883919241614,
                    low: 60.211957192084036,
                    close: 72.37883919241614
                },
                {
                    time: { year: 2018, month: 12, day: 25 },
                    open: 64.80282266865653,
                    high: 71.00204457933133,
                    low: 54.58446926152339,
                    close: 69.9468262738086
                },
                {
                    time: { year: 2018, month: 12, day: 26 },
                    open: 66.28091239894763,
                    high: 81.00843300529249,
                    low: 54.56212171317677,
                    close: 69.58528111643206
                },
                {
                    time: { year: 2018, month: 12, day: 27 },
                    open: 66.38479296949795,
                    high: 79.97207476893692,
                    low: 59.738742243860464,
                    close: 73.77893045661807
                },
                {
                    time: { year: 2018, month: 12, day: 28 },
                    open: 73.80105714462456,
                    high: 73.80105714462456,
                    low: 59.95172576316864,
                    close: 73.49823170047799
                },
                {
                    time: { year: 2018, month: 12, day: 29 },
                    open: 75.65816205696441,
                    high: 75.65816205696441,
                    low: 63.710206287837266,
                    close: 63.710206287837266
                },
                {
                    time: { year: 2018, month: 12, day: 30 },
                    open: 70.43199072631421,
                    high: 80.48229715762909,
                    low: 62.65542750589909,
                    close: 63.42588929424237
                },
                {
                    time: { year: 2018, month: 12, day: 31 },
                    open: 74.18101512382138,
                    high: 79.0918171034821,
                    low: 57.80109358134577,
                    close: 72.91361896511863
                }
            ]
            series.setData(data)
            // const datesForMarkers = [data[data.length - 19], data[data.length - 39]]
            // let indexOfMinPrice = 0
            // for (let i = 1; i < datesForMarkers.length; i++) {
            //     if (datesForMarkers[i].high < datesForMarkers[indexOfMinPrice].high) {
            //         indexOfMinPrice = i
            //     }
            // }
            // const markers = []
            // for (let i = 0; i < datesForMarkers.length; i++) {
            //     if (i !== indexOfMinPrice) {
            //         markers.push({
            //             time: datesForMarkers[i].time,
            //             position: 'aboveBar',
            //             color: '#e91e63',
            //             shape: 'arrowDown',
            //             text: 'Sell @ ' + Math.floor(datesForMarkers[i].high + 2)
            //         })
            //     } else {
            //         markers.push({
            //             time: datesForMarkers[i].time,
            //             position: 'belowBar',
            //             color: '#2196F3',
            //             shape: 'arrowUp',
            //             text: 'Buy @ ' + Math.floor(datesForMarkers[i].low - 2)
            //         })
            //     }
            // }
            // markers.push({ time: data[data.length - 48].time, position: 'aboveBar', color: '#f68410', shape: 'circle', text: 'D' })
            // series.setMarkers(markers)
            const volumeSeries = chart.addHistogramSeries({
                color: '#26a69a',
                priceFormat: {
                    type: 'volume'
                },
                priceScaleId: '',
                scaleMargins: {
                    top: 0.8,
                    bottom: 0
                }
            })

            volumeSeries.setData([
                { time: '2018-10-19', value: 19103293.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-10-22', value: 21737523.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-10-23', value: 29328713.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-10-24', value: 37435638.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-10-25', value: 25269995.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-10-26', value: 24973311.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-10-29', value: 22103692.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-10-30', value: 25231199.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-10-31', value: 24214427.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-11-01', value: 22533201.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-11-02', value: 14734412.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-05', value: 12733842.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-06', value: 12371207.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-07', value: 14891287.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-08', value: 12482392.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-09', value: 17365762.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-12', value: 13236769.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-13', value: 13047907.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-11-14', value: 18288710.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-15', value: 17147123.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-16', value: 19470986.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-19', value: 18405731.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-20', value: 22028957.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-11-21', value: 18482233.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-11-23', value: 7009050.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-11-26', value: 12308876.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-27', value: 14118867.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-11-28', value: 18662989.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-11-29', value: 14763658.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-11-30', value: 31142818.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-12-03', value: 27795428.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-04', value: 21727411.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-06', value: 26880429.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-07', value: 16948126.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-10', value: 16603356.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-12-11', value: 14991438.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-12-12', value: 18892182.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-13', value: 15454706.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-14', value: 13960870.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-17', value: 18902523.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-18', value: 18895777.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-19', value: 20968473.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-12-20', value: 26897008.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-21', value: 55413082.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-24', value: 15077207.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2018-12-26', value: 17970539.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-12-27', value: 17530977.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-12-28', value: 14771641.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2018-12-31', value: 15331758.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-02', value: 13969691.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-01-03', value: 19245411.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-04', value: 17035848.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-07', value: 16348982.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-08', value: 21425008.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-09', value: 18136000.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-01-10', value: 14259910.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-11', value: 15801548.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-14', value: 11342293.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-15', value: 10074386.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-16', value: 13411691.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-01-17', value: 15223854.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-01-18', value: 16802516.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-22', value: 18284771.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-01-23', value: 15109007.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-24', value: 12494109.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-01-25', value: 17806822.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-01-28', value: 25955718.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-01-29', value: 33789235.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-01-30', value: 27260036.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-01-31', value: 28585447.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-01', value: 13778392.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-02-04', value: 15818901.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-02-05', value: 14124794.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-06', value: 11391442.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-02-07', value: 12436168.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-02-08', value: 12011657.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-11', value: 9802798.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-12', value: 11227550.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-13', value: 11884803.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-14', value: 11190094.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-02-15', value: 15719416.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-19', value: 12272877.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-20', value: 11379006.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-21', value: 14680547.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-22', value: 12534431.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-25', value: 15051182.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-02-26', value: 12005571.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-02-27', value: 8962776.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-02-28', value: 15742971.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-01', value: 10942737.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-04', value: 13674737.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-03-05', value: 15749545.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-03-06', value: 13935530.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-03-07', value: 12644171.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-08', value: 10646710.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-11', value: 13627431.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-12', value: 12812980.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-03-13', value: 14168350.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-14', value: 12148349.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-15', value: 23715337.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-18', value: 12168133.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-03-19', value: 13462686.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-03-20', value: 11903104.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-21', value: 10920129.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-22', value: 25125385.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-25', value: 15463411.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-26', value: 12316901.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-27', value: 13290298.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-03-28', value: 20547060.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-03-29', value: 17283871.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-01', value: 16331140.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-04-02', value: 11408146.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-04-03', value: 15491724.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-04', value: 8776028.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-05', value: 11497780.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-08', value: 11680538.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-09', value: 10414416.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-04-10', value: 8782061.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-11', value: 9219930.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-04-12', value: 10847504.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-15', value: 7741472.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-04-16', value: 10239261.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-17', value: 15498037.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-04-18', value: 13189013.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-22', value: 11950365.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-23', value: 23488682.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-04-24', value: 13227084.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-04-25', value: 17425466.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-04-26', value: 16329727.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-29', value: 13984965.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-04-30', value: 15469002.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-01', value: 11627436.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-05-02', value: 14435436.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-03', value: 9388228.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-06', value: 10066145.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-05-07', value: 12963827.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-05-08', value: 12086743.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-05-09', value: 14835326.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-10', value: 10707335.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-13', value: 13759350.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-05-14', value: 12776175.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-05-15', value: 10806379.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-16', value: 11695064.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-17', value: 14436662.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-20', value: 20910590.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-21', value: 14016315.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-22', value: 11487448.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-05-23', value: 11707083.0, color: 'rgba(255,82,82, 0.8)' },
                { time: '2019-05-24', value: 8755506.0, color: 'rgba(0, 150, 136, 0.8)' },
                { time: '2019-05-28', value: 3097125.0, color: 'rgba(0, 150, 136, 0.8)' }
            ])
        }
    }, [chart])

    const size = resize()

    useEffect(() => {
        const width = (wrapDom.current?.parentNode as HTMLElement)?.clientWidth
        chart?.resize(width, 500)
    }, [size])

    return (
        <div ref={wrapDom} style={{ position: 'relative' }}>
            <div
                ref={boxDom}
                style={{
                    position: 'absolute',
                    zIndex: 2,
                    padding: 10
                }}
            />
        </div>
    )
}

export default Layout

import { useEffect, useRef, useState } from 'react'

type IUseCountDown = {
    days: string | number
    hours: string | number
    minutes: string | number
    seconds: string | number
}

/**
 * 解析毫秒为天、时、分、秒
 * @param milliseconds 毫秒
 */
const parseMs = (milliseconds: number): IUseCountDown => {
    const days = Math.floor(milliseconds / 86400000)
    const hours = Math.floor(milliseconds / 3600000) % 24
    const minutes = Math.floor(milliseconds / 60000) % 60
    const seconds = Math.floor(milliseconds / 1000) % 60
    return {
        days: days < 10 ? `0${days}` : days,
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds
    }
}

/**
 * 倒计时
 * @param endTimeStamp 结束时间的时间戳
 */
const useCountDown = (endTimeStamp: number): IUseCountDown => {
    const timer = useRef<NodeJS.Timeout>()
    const [state, setState] = useState(endTimeStamp)

    // 计算时间的差值
    const calcTimeDiff = (): void => {
        // 获取当前时间戳
        const currentTime = +new Date()
        // 计算当前时间和结束时间的差值
        const seconds = Math.floor((endTimeStamp || 0) - currentTime)
        // 如果是负数 就清空定时器
        if (seconds <= 0) {
            clearInterval(Number(timer.current))
            return setState(0)
        }
        setState(seconds)
    }

    useEffect(() => {
        calcTimeDiff()
        timer.current = setInterval(() => {
            calcTimeDiff()
        }, 1000)
        return () => {
            clearInterval(Number(timer.current))
        }
    }, [endTimeStamp])

    const { days, hours, minutes, seconds } = parseMs(state)
    return { days, hours, minutes, seconds }
}

export default useCountDown

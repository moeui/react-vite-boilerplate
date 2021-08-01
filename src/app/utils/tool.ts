import { useCallback, useEffect, useRef, useState } from 'react'

/*
* example:
    const OneSecondTimer = props => {
    const [seconds, setSeconds] = React.useState(0);
    useTimeout(() => {
    setSeconds(seconds + 1);
    }, 1000);

    return <p>{seconds}</p>;
};
*/
export const useTimeout = (callback: () => void, delay: number | null): void => {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay !== null) {
            const id = setTimeout(() => savedCallback.current(), delay)
            return () => clearTimeout(id)
        }
    }, [delay])
}

export const useInterval = (callback: () => void, delay: number | null): void => {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay !== null) {
            const id = setInterval(savedCallback.current, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

export const formatDecimal = (number: number, decimal: number): string => {
    let num = number.toString()
    const index = num.indexOf('.')
    if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
    } else {
        num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal)
}

export const formatMoney = (value: string | number, n: number): number | string => {
    if (isNaN(Number(value))) return Number(0).toFixed(n > 0 ? n : 0)
    const isNegative = value < 0
    const v = formatDecimal(Math.abs(Number(value)), n > 0 ? n : 0)
    const l = v.split('.')[0].split('').reverse()
    const r = v.split('.')[1]
    let t = ''
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '')
    }
    const res = t.split('').reverse().join('') + `${r ? '.' + r : ''}`
    return `${isNegative ? '-' : ''}${res}`
}

export function resize(): { height: number; width: number } {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return size
}

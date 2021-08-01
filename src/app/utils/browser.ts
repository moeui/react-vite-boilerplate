import UAParser from 'ua-parser-js'

const ua = new UAParser()

export const isWeChatBrowser = ua.getBrowser().name === 'WeChat'
export const isQQBrowser = ua.getBrowser().name === 'QQBrowser'
export const isQQ = ua.getBrowser().name === 'QQ'
export const isSafari = ua.getBrowser().name === 'Mobile Safari'
export const isIOS = ua.getOS().name === 'iOS'
export const isAndroid = ua.getOS().name === 'Android'
export const isIPhoneX =
    isIOS && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812
export const isIPhoneXSMax =
    isIOS && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896
export const isIPhoneXR =
    isIOS && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896

export function getQueryStringByName(name: string): string {
    const result = (location.search || location.hash).match(new RegExp('[?&]' + name + '=([^&]+)', 'i'))
    if (result == null || result.length < 1) {
        return ''
    }
    return result[1].replace(/\//, '')
}

export function fixIPhoneBottom(): void {
    function check(): void {
        const scale = window.innerWidth / window.screen.width
        // 部分浏览器在滚动页面时会显示/隐藏工具栏，影响视口高度。在有底部工具栏的情况下，不做iPhoneX的fix。100为经验值
        if (window.screen.height - window.innerHeight / scale < 100) {
            document.body.classList.add('fix-iPhoneX-bottom')
        } else {
            document.body.classList.remove('fix-iPhoneX-bottom')
        }
    }
    function throttle(func, wait) {
        let previous = 0
        return function () {
            const now = +new Date()
            const context = this
            if (now - previous >= wait) {
                func.apply(context, arguments)
                previous = now // 执行后更新 previous 值
            }
        }
    }
    if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
        check()
        window.addEventListener('scroll', throttle(check, 50))
    }
}

export function disableIPhoneScale(): void {
    window.addEventListener(
        'load',
        () => {
            // 阻止双击放大
            let lastTouchEnd = 0
            document.addEventListener('touchstart', e => {
                if (e.touches.length > 1) {
                    e.preventDefault()
                }
            })
            document.addEventListener(
                'touchend',
                e => {
                    const now = new Date().getTime()
                    if (now - lastTouchEnd <= 300) {
                        e.preventDefault()
                    }
                    lastTouchEnd = now
                },
                false
            )

            // 阻止双指放大
            document.addEventListener('gesturestart', e => {
                e.preventDefault()
            })

            document.addEventListener(
                'touchmove',
                e => {
                    if ((e as any).scale !== 1) {
                        e.preventDefault()
                    }
                },
                { passive: false }
            )
        },
        false
    )
}

export function loadScript(src: string, cb?: () => void): void {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src

    let flag = false // 防止 IE9/10 中执行两次

    script.onload = (script as any).onreadystatechange = function () {
        if (flag === false && (!this.readyState || this.readyState === 'complete')) {
            flag = true
            if (cb) {
                cb()
            }
        }
    }

    const s = document.getElementsByTagName('script')[0]
    s.parentNode?.insertBefore(script, s)
}

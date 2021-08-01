/** Global definitions for development **/

// for style loader
declare module '*.svg' {
    const value: string
    export = value
}
declare module '*.png' {
    const value: string
    export = value
}
declare module '*.jpg' {
    const value: string
    export = value
}
declare module '*.jpeg' {
    const value: string
    export = value
}
declare module '*.gif' {
    const value: string
    export = value
}
declare module '*.bmp' {
    const value: string
    export = value
}
declare module '*.tiff' {
    const value: string
    export = value
}
declare module '*.css' {
    const content: { [key: string]: string }
    export default content
}
declare module '*.less' {
    const content: { [key: string]: string }
    export default content
}

declare module '*.module.less' {
    const content: { [key: string]: string }
    export default content
}

declare module '*.module.styl' {
    const content: { [key: string]: string }
    export default content
}

declare module '*.module.scss' {
    const content: { [key: string]: string }
    export default content
}

// Omit type https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>

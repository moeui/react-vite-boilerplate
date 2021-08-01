import classnames from 'classnames'
import * as React from 'react'

import Footer from '../Footer'

interface IProps {
    className?: string
    isShowFooter?: false
    children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<IProps> = (props: IProps): React.ReactElement => {
    const { className } = props

    return (
        <div className={classnames(className)}>
            {props.children}
            {props.isShowFooter ? <Footer /> : null}
        </div>
    )
}

export default Layout

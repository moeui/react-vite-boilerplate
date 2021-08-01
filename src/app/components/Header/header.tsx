import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import style from './header.module.styl'

interface IProps extends RouteComponentProps {
    type?: string[]
    systemName?: string
    children?: JSX.Element[] | JSX.Element
}

const Header: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement => {
    const jump = (target: string): void => {
        props.history.push(target)
    }
    return (
        <header className={style.header}>
            <div className={style.logo} onClick={() => jump('/')}></div>
            {props.children}
        </header>
    )
}

export default withRouter(Header)

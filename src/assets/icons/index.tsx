import React from 'react'

type IProps = {
    name: string
}

const Icon = (props: IProps): JSX.Element => {
    return (
        <svg className="icon">
            <use xlinkHref={'#' + props.name} />
        </svg>
    )
}

export default Icon

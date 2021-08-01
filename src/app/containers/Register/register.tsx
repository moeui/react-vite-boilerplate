import './register.styl'

import { Form, Input } from 'antd'
import * as React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import useRegister from '../../hooks/useRegister'

export default (): JSX.Element => {
    const history = useHistory()
    const [form] = Form.useForm()
    const [loading, response, setLogin] = useRegister()
    const jump = (target: string): void => {
        history.push(target)
    }

    const onFinish = (): void => {
        form.validateFields().then(async val => {
            setLogin(val)
        })
    }

    useEffect(() => {
        if (response?.data) {
            history.push('/')
        }
        return () => {}
    }, [response])

    return (
        <div className="register">
            <Form className="login-form" form={form}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <div className="btn" onClick={() => onFinish()}>
                        注册2
                    </div>
                    <div className="btn" onClick={() => jump('/login')}>
                        登录
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

import './editDialog.styl'

import { Button, Form, Input, message, Modal } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { postUser } from '../../../services/adminServer/adminServer'

interface IProps {
    completed?(): void
}

export interface IAddDialog {
    show(): void
    hide(): void
}

export default forwardRef((props: IProps, ref) => {
    const [show, setShow] = useState(false)
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const confirm = (): void => {
        form.validateFields().then(async val => {
            setLoading(true)
            const res = await postUser(val)
            const data = res.data
            if (data?.code === -1) {
                message.destroy()
                message.error(data?.msg)
            } else {
                setShow(false)
                message.success('修改成功')
                if (props.completed) {
                    props.completed()
                }
            }
            setLoading(false)
        })
    }

    useImperativeHandle(ref, () => ({
        show: () => {
            setShow(true)
        },
        hide: () => {
            setShow(false)
        }
    }))

    return (
        <Modal visible={show} onCancel={() => setShow(false)} footer={null} wrapClassName="editDialog" centered width={380} destroyOnClose={true}>
            <Form form={form}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input placeholder="Password" />
                </Form.Item>
            </Form>
            <Button loading={loading} onClick={() => confirm()}>
                提交
            </Button>
        </Modal>
    )
})

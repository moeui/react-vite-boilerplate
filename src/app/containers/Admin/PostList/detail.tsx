import { Button, Form, Input, message, Select, Upload } from 'antd'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import E from 'wangeditor'

import AdminLayout from '../../../components/Layout/adminLayout'
import { getPost, IPost, IPostItem, postPost, putPost } from '../../../services/adminServer/adminServer'
import { html_decode } from '../../../utils'
import { getQueryStringByName } from '../../../utils/browser'
import { baseService } from '../../../utils/config'
import css from './list.module.styl'

function beforeUpload(file): boolean {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
}

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 }
}
const tailLayout = {
    wrapperCol: { offset: 2, span: 20 }
}

let editor: E

function Detail(props: RouteComponentProps): JSX.Element {
    const editRef = useRef(null)
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState<string>()
    const [data, setData] = useState<IPostItem | undefined>()
    const id = getQueryStringByName('id')
    const lng = getQueryStringByName('lng')
    const [content, setContent] = useState<string>()
    const jump = (target: string): void => {
        props.history.push(target)
    }
    const handleChange = (info): void => {
        if (info.file.status === 'uploading') {
            return
        }
        if (info.file.status === 'done') {
            setImageUrl(`${baseService}/public/tmp/${info.file.response.data[0].url}`)
        }
    }

    useEffect(() => {
        if (!editRef.current) return
        editor = new E(editRef.current)

        editor.config.uploadImgMaxSize = 2 * 1024 * 1024
        editor.config.uploadImgServer = `${baseService}/upload`
        editor.config.uploadFileName = 'file'
        editor.config.uploadImgMaxLength = 1
        editor.config.showLinkImgAlt = false
        editor.config.showLinkImgHref = false
        editor.config.showLinkImg = false
        editor.config.uploadImgHooks = {
            customInsert: (insertImg: any, result: any, editor) => {
                if (result.data && result.data[0]) {
                    const url = result.data[0].url
                    insertImg(`${baseService}/public/tmp/${url}`)
                }
            }
        }
        editor.config.onblur = function (newHtml) {
            setContent(newHtml)
        }
        editor.config.menus = [
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'image', // 插入图片
            'table', // 表格
            'undo', // 撤销
            'redo' // 重复
        ]
        editor.create()

        return () => {
            editor.destroy()
        }
    }, [editRef.current])

    const submit = (): void => {
        form.validateFields().then(async val => {
            const newVal = {
                title: val.title,
                type: val.type,
                index: Number(val.index),
                thumbnail: imageUrl,
                desc: val.desc,
                content: editor.txt.html(),
                lng
            }
            const response = id ? await putPost(id, newVal) : await postPost(newVal)
            message.destroy()
            if (response.data.code === 0) {
                message.success('操作成功！')
                jump(`/postList?lng=${lng}`)
            } else if (response.data.code === 1) {
                message.error(response.data.msg)
                jump('/login')
            } else {
                message.error(response.data.msg)
            }
        })
    }

    useEffect(() => {
        if (data) {
            setContent(html_decode(data?.content))
            setImageUrl(data.thumbnail)
        }
    }, [data])

    useEffect(() => {
        if (content) {
            editor.txt.html(content)
        }
    }, [content])

    const load = async (): Promise<void> => {
        if (id) {
            const res = await getPost(id, { lng })
            if (res.data.code === 0) {
                setData(res.data.data)
                form.setFieldsValue(res.data.data)
            } else if (res.data.code === 1) {
                message.error(res.data.msg)
                jump('/login')
            }
        }
    }

    useEffect(() => {
        if (id) {
            load()
        } else {
            form.setFieldsValue({ title: '', index: 1, type: 1 })
        }
    }, [id])

    return (
        <AdminLayout className={css.pageList} key={`${id}${lng}`}>
            <Form {...layout} className={css.search} form={form}>
                <Form.Item label="标题" name="title">
                    <Input placeholder="请输入标题" />
                </Form.Item>
                <Form.Item label="封面">
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={`${baseService}/upload`}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : '+'}
                    </Upload>
                </Form.Item>
                <Form.Item label="类别" name="type">
                    <Select>
                        <Select.Option value={1}>进行中</Select.Option>
                        <Select.Option value={2}>往期</Select.Option>
                    </Select>
                </Form.Item>
                <span style={{ color: '#999', padding: '0 0 0 120px' }}>(前台页面展示以这个值的权重来判断，值越大越前面)</span>
                <Form.Item label="排序" name="index">
                    <Input placeholder="请输入排序权重" />
                </Form.Item>
                <Form.Item label="简介" name="desc">
                    <Input placeholder="请输入简介" />
                </Form.Item>
                <Form.Item label="内容">
                    <div ref={editRef}></div>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" onClick={() => submit()}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </AdminLayout>
    )
}

export default withRouter(Detail)

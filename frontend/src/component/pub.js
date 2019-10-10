import React from 'react'
import { observer } from 'mobx-react'
import { Form, Icon, Input, Button, message } from 'antd'
import { inject } from '../utils'
import { postService as service } from '../service/post'

import 'antd/lib/form/style'
import 'antd/lib/icon/style'
import 'antd/lib/input/style'
import 'antd/lib/button/style'
import 'antd/lib/message/style'

const { TextArea } = Input

@inject({ service })
@observer
export default class Pub extends React.Component {
    handleSubmit(event) {
        event.preventDefault()
        const [title, content] = event.target
        service.pub(title.value, content.value)
    }

    render() {
        let msg = service.msg
        return (
            <Form layout='vertical' onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label='标题' labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} required={true}>
                    <Input placeholder='请输入标题' />
                </Form.Item>
                <Form.Item label='内容' labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} required={true}>
                    <TextArea placeholder='请输入文章内容' rows={20} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
                    <Button type='primary' htmlType='submit'>确认提交</Button>
                </Form.Item>
            </Form>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.service.msg) {
            message.info(prevProps.service.msg, 3, () => prevProps.service.msg = '')
        }
    }
}
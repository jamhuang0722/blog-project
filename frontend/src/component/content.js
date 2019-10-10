import React from 'react'
import { inject, parse_qs } from '../utils'
import { postService as service } from '../service/post'
import { message, Card, Col, Row } from 'antd'
import { observer } from 'mobx-react'
import 'antd/lib/message/style'
import 'antd/lib/card/style'

@inject({ service })
@observer
export default class Post extends React.Component {
    constructor(props) {
        super(props)
        let { id = -1 } = props.match.params
        service.getPost(id)
    }

    render() {
        let msg = service.msg
        const { title = '', content = '', author, postdate } = service.post
        if (title) {
            return (<Row><Col span={24}><Card title={title} bordered>
                <p>作者：{author} {new Date(postdate * 1000).toLocaleDateString()}</p>
                <p>{content}</p>
            </Card></Col></Row>)
        }
        else { return <div>无数据</div> }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.service.msg) {
            message.info(prevProps.service.msg, 3, () => prevProps.service.msg = '')
        }
    }
}
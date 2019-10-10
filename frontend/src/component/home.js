import React from 'react'
import { inject, parse_qs } from '../utils'
import { postService as service } from '../service/post'
import { message, Card, Col, Row } from 'antd'
import { observer } from 'mobx-react'
import 'antd/lib/message/style'
import 'antd/lib/card/style'

export default class Home extends React.Component {
    render() {
        const { Meta } = Card;
        return (
            <div style={{ padding: '30px' }}>
                <Row>
                    <Col span={24}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="http://ps3.tgbus.com/UploadFiles/201110/20111014190250416.jpg" />}
                        >
                            <Meta title="WELCOME! 欢迎来到我的网站！" description="www.viya.com" />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
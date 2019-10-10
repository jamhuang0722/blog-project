import React from 'react'
import { inject, parse_qs } from '../utils'
import { postService as service } from '../service/post'
import { List, Icon } from 'antd'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import 'antd/lib/list/style'

@inject({ service })
@observer
export default class L extends React.Component {
    constructor(props) {
        super(props)
        service.list(props.location.search)
    }

    handleChange(page, pageSize) {
        let search = `?page=${page}&size=${pageSize}`
        service.list(search)
    }

    getUrl(c) {
        let obj = parse_qs(this.props.location.search)
        let { size = 10 } = obj
        return `/list?page=${c}&size=${size}`
    }

    itemRender(page, type, originalElement) {
        if (page == 0) { return originalElement }
        if (type === 'page') {
            return <Link to={this.getUrl(page)}>{page}</Link>
        }
        if (type === 'prev') {
            return <Link to={this.getUrl(page)} className="ant-pagination-item-link"><Icon type="left" /></Link>
        }
        if (type === 'next') {
            return <Link to={this.getUrl(page)} className="ant-pagination-item-link"><Icon type="right" /></Link>
        }
    }

    render() {
        let data = service.posts
        if (data.length) {
            const pagination = service.pagination
            return (
                <List
                    header="文章列表"
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta title={<Link to={'/post/' + item.post_id}>{item.title}</Link>} />
                        </List.Item>)}
                    pagination={{
                        current: pagination.page,
                        total: pagination.count,
                        pageSize: pagination.size,
                        onChange: this.handleChange.bind(this),
                        itemRender:this.itemRender.bind(this)
                    }}>
                </List>
            )
        }
        else
            return (<div>无数据</div>)
    }
}
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../css/login.css'
import { userService as service } from '../service/user'
import { observer } from 'mobx-react'
import { message } from 'antd'
import 'antd/lib/message/style'
import { inject } from '../utils'


@inject({ service })
@observer
export default class Login extends React.Component {
    handleClick(event) {
        event.preventDefault()
        let fm = event.target.form
        service.login(fm[0].value, fm[1].value)
    }

    render() {
        if (service.loggedin) { return <Redirect to='/' /> }
        let err = service.errMsg
        return (
            <div className="login-page">
                <div className="form">
                    <form className="login-form">
                        <input type="text" placeholder="邮箱" />
                        <input type="password" placeholder="密码" />
                        <button onClick={this.handleClick.bind(this)}>登录</button>
                        <p className="message">还未注册？ <Link to='/reg'>点击注册</Link></p>
                    </form></div></div>)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.service.errMsg) {
            message.info(prevProps.service.errMsg, 3, () => prevProps.service.errMsg = '')
        }
    }
}
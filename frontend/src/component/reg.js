import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../css/login.css'
import { userService as service } from '../service/user';
import { observer } from 'mobx-react'
import { message } from 'antd'
import 'antd/lib/message/style'
import { inject } from '../utils'


@inject({ service })
@observer
export default class Reg extends React.Component {
    validatePwd(pwd1, pwd2) {
        return pwd1.value === pwd2.value
    }

    handleClick(event) {
        event.preventDefault()
        const [name, email, password, confirm] = event.target.form
        if (this.validatePwd(password, confirm)) {
            service.reg(name.value, email.value, password.value)
        }
        else { service.errMsg = '密码输入不一致' }
    }

    render() {
        if (service.loggedin) { return <Redirect to='/' /> }
        let err = service.errMsg
        return (
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input type="text" placeholder="用户名" />
                        <input type="text" placeholder="邮箱" />
                        <input type="password" placeholder="密码" />
                        <input type="password" placeholder="确认密码" />
                        <button onClick={this.handleClick.bind(this)}>提交</button>
                        <p className="message">已注册？ <Link to="login">点击登录</Link></p>
                    </form>
                </div>
            </div>)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.service.errMsg) {
            message.info(prevProps.service.errMsg, 3, () => prevProps.service.errMsg = '')
        }
    }
}
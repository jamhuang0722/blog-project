import Axios from 'axios'
import store from 'store'
import { observable } from 'mobx'

store.addPlugin(require('store/plugins/expire'))

class UserService {
    @observable loggedin = false
    @observable errMsg = ''

    login(email, password) {
        console.log(email, password)
        Axios.post('/api/user/login', { 'email': email, 'password': password }).then(
            response => {
                console.log(response.data)
                console.log(response.status)
                store.set('token', response.data.token, (new Date()).getTime() + (8 * 3600 * 1000))
                this.loggedin = true
            }).catch(error => {
                console.log(error)
                this.errMsg = '用户名或密码错误'
            })
    }

    reg(name, email, password) {
        console.log(name, email, password)
        Axios.post('api/user/reg', {
            'email': email, 'password': password, 'name': name
        }).then(response => {
            console.log(response.data)
            console.log(response.status)
            store.set('token', response.data.token, (new Date()).getTime() + (8 * 3600 * 1000))
            this.loggedin = true
        }).catch(error => {
            console.log(error)
            this.errMsg = '该用户已存在'
        })

    }
}


export const userService = new UserService()
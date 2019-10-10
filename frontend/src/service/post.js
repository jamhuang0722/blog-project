import { observable } from 'mobx'
import Axios from 'axios'
import store from 'store'

class PostService {
    constructor() {
        this.Axios = Axios.create({
            baseURL: '/api/post/'
        })
    }

    @observable msg = ''
    @observable posts = []
    @observable pagination = {page:1, size:10, count:10, pages:0}
    @observable post = {}

    getJwt() {
        return store.get('token', null)
    }

    pub(title, content) {
        console.log(title)
        this.Axios.post('pub', { title, content }, { headers: { 'Jwt': this.getJwt() } })
            .then(response => {
                console.log(response.data)
                console.log(response.status)
                this.msg = '提交成功'
            }
            ).catch(error => {
                console.log(error)
                this.msg = '提交失败'
            })
    }

    list(search) {
        this.Axios.get(search).then(response => {
            this.posts = response.data.posts
            this.pagination = response.data.pagination
        }).catch(error => {
            console.log(error)
            this.msg = '文章列表加载失败'
        })
    }

    getPost(id) {
        this.Axios.get(id).then(response => {
            this.post = response.data.post
        }).catch(error => {
            console.log(error)
            this.post = {}
            this.msg = '文章加载失败'
        })
    }
}

const postService = new PostService()
export { postService }
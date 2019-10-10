import React from 'react';
import ReactDom from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from './component/login';
import Reg from './component/reg';
import Pub from './component/pub';
import L from './component/list';
import Post from './component/content'
import Home from './component/home';
import { Layout, Menu, Icon, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'antd/lib/menu/style'
import 'antd/lib/icon/style'
import 'antd/lib/layout/style'
import './css/index.css'

const { Header, Content, Footer } = Layout

const About = () => (
  <div>
    <h2>站长：JamHuang</h2>
    <h2>邮件：123456@gmail.com</h2>
  </div>
);

const App = () => (
  <Router>
    <Layout>
      <Header>
        <img src="./src/viya.png" className="logo" />
        <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px' }}>
          <Menu.Item key='home'><Link to="/"><Icon type='home' />主页</Link></Menu.Item>
          <Menu.Item key='list'><Link to="/list"><Icon type='bars' />文章</Link></Menu.Item>
          <Menu.Item key='pub'><Link to="/pub"><Icon type='edit' />发布</Link></Menu.Item>
          <Menu.Item key='login'><Link to="/login"><Icon type='login' />登录</Link></Menu.Item>
          <Menu.Item key='reg'><Link to="/reg"><Icon type='user-add' />注册</Link></Menu.Item>
          <Menu.Item key='about'><Link to="/about"><Icon type='info-circle' />关于</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '10px 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 600 }}>
          <Route exact path="/" component={Home} />
          <Route path="/list" component={L} />
          <Route path="/pub" component={Pub} />
          <Route path="/login" component={Login} />
          <Route path="/reg" component={Reg} />
          <Route path="/about" component={About} />
          <Route path="/post/:id" component={Post} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        viya.com Made with ❤ by JamHuang ©2019-2029
      </Footer>
    </Layout>
  </Router>
);

ReactDom.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root'));
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from "history";
import 'antd/dist/antd.css';
import './index.css'
import { Breadcrumb, Menu, Icon } from 'antd';
import Home from '../component/home.jsx'
import List from '../component/dataList.jsx'
import emitter from '../util/events';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ['{"type":"1","zIndex":"1","name":"面板监控","path":"home"}']
    };
  }
  componentDidMount() {
    // 组件装载完成以后声明一个自定义事件
    this.eventEmitter = emitter.addListener('changeMessage', (message) => {
      this.setState({
        message: message,
      });
    });
  }
  componentWillUnmount() {
    emitter.removeListener(this.eventEmitter);
  }
  render() {
    return (
      <Breadcrumb>
        {
          this.state.message.reverse().map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>{JSON.parse(item).name}</Breadcrumb.Item>
            )
          })
        }
      </Breadcrumb>
    )
  }
}
const history = createBrowserHistory()
const { SubMenu } = Menu;
const data = [
  {
    type: 1,
    zIndex: 1,
    name: '面板监控',
    path: 'home'
  },
  {
    type: 1,
    zIndex: 1,
    name: '数据列表',
    path: 'symbol'
  },
  {
    type: 1,
    zIndex: 1,
    name: '在线聊天',
    path: 'chat'
  },
  {
    type: 2,
    zIndex: 1,
    name: '二级菜单1',
    list: [
      {
        zIndex: 2,
        name: '二级菜单1-1',
        path: 'chat'
      },
      {
        zIndex: 2,
        name: '二级菜单1-2',
        path: 'chat'
      }
    ]
  },
  {
    type: 2,
    zIndex: 1,
    name: '二级菜单2',
    list: [
      {
        zIndex: 2,
        name: '二级菜单2-1',
        path: 'chat'
      },
      {
        zIndex: 2,
        name: '二级菜单2-2',
        path: 'chat'
      }]
  },


]

class TabBar extends React.Component {
  state = {
    collapsed: false,
  };
  handleClick = value => {
    console.log(value.key)
    history.push(JSON.parse(value.key).path)
    emitter.emit('changeMessage', value.keyPath)
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={['{"type":1,"zIndex":1,"name":"面板监控","path":"home"}']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
          {
            data.map((item, index) => {
              if (item.type == 1) {
                return (
                  <Menu.Item key={JSON.stringify(item)}>
                    <Icon type="pie-chart" />
                    <span>{item.name}</span>
                  </Menu.Item>
                )
              } else {
                return (
                  <SubMenu
                    key={JSON.stringify(item)}
                    title={
                      <span>
                        <Icon type="mail" />
                        <span>{item.name}</span>
                      </span>
                    }
                  >
                    {
                      item.list.map((itemC, indexC) => {
                        return (
                          <Menu.Item key={JSON.stringify(itemC)}>{itemC.name}</Menu.Item>
                        )
                      })
                    }
                  </SubMenu>
                )
              }

            })
          }
        </Menu>
      </div>
    );
  }
}
class GlobalRouter extends React.Component {
  render() {
    return (
      <div>
        <header>
          React 后台管理系统
                </header>
        <div className="sidebar">
          <TabBar />
        </div>
        <main>
          <Root />
          <Router history={history}>
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path="/symbol" component={List} />
              <Route exact path="/inbox" component={List} />
            </Switch>
          </Router>
        </main>

      </div>
    )
  }
}
export default GlobalRouter
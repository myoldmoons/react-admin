import React from 'react'
import 'whatwg-fetch'
import { Input, Button, message, Select } from 'antd';
import '../static/component.css'
const { Search } = Input;
const { Option } = Select;
// fetch('&menu=红烧肉&pn=3').then(res => {
//     console.log(res)
// })
class DataView extends React.Component {
    render() {
        return (
            <div className='view'>
                <div className='top'>
                    <div className='view_left'>
                        <img src={this.props.data.albums[0]} />
                    </div>
                    <div className='view_right'>
                        <div className='title'>菜名：<span>{this.props.data.title}</span></div>
                        <div className='title'>点评：<span>{this.props.data.imtro}</span></div>
                        <div className='title'>食材：<span>{this.props.data.ingredients}</span></div>
                        <div className='title'>调料：<span>{this.props.data.burden}</span></div>
                    </div>
                </div>
                <div className='step'>
                    <div className='header'>制作步骤</div>
                    {
                        this.props.data.steps.map((item, index) => {
                            if (index > 9) return;
                            return (
                                <div className='step_item'>
                                    <img src={item.img} alt="" />
                                    <p>{item.step}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default class Recipe extends React.Component {
    state = {
        value: '',
        list: [],
        size: 10
    }
    componentWillMount() {
        this.setState({
            list: JSON.parse(localStorage.getItem('reactJhApi')) || []
        })
    }
    inputChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    handleChange(value) {
        console.log(value)
        this.setState({
            size: value
        })
    }
    submits() {
        if (this.state.value == '') {
            message.warning('请输入菜名！')
            return;
        }
        fetch('&menu=' + this.state.value + '&pn=2&rn=' + this.state.size).then(res => res.json()).then(res => {
            console.log(res)
            this.setState({
                list: res.result.data
            })
            // 缓存数据 防刷新空白
            localStorage.setItem('reactJhApi', JSON.stringify(res.result.data))
        })
    }
    render() {
        return (
            <div>
                <div>
                    <span style={{ 'fontSize': '18px' }}>菜名：</span>
                    <Search
                        value={this.state.value}
                        placeholder="请输入您要搜索菜名"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                        size='large'
                        onChange={this.inputChange.bind(this)}
                    />
                    <span style={{ 'fontSize': '18px', 'marginLeft': '20px' }}>条数：</span>
                    <Select defaultValue="10条" style={{ width: 120 }} size='large' onChange={this.handleChange.bind(this)}>
                        <Option value="10">10条</Option>
                        <Option value="20">20条</Option>
                        <Option value="30">30条</Option>
                    </Select>
                    <Button size='large' type="primary" onClick={this.submits.bind(this)} style={{ 'marginLeft': '10px' }}>搜索</Button>
                </div>
                {
                    this.state.list.map((item, index) => {
                        return (
                            <DataView data={item} />
                        )
                    })
                }
            </div >
        )
    }
}
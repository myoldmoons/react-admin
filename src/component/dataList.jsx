import React from 'react'
import { Table, Divider, Tag } from 'antd';
import 'whatwg-fetch'
fetch('http://apis.juhe.cn/cook/query?key=27cd67fab918227f6aa1a789ea40b9e8&menu=%E8%A5%BF%E7%BA%A2%E6%9F%BF&rn=10&pn=3').then(res => {
    console.log(res)
})

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <a>邀请 {record.name}</a>
                <Divider type="vertical" />
                <a>删除</a>
            </span>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default class TableList extends React.Component {
    render() {
        return (
            <Table columns={columns} dataSource={data} />
        )
    }
}
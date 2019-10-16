const data = [{
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
        name: '聚合菜谱',
        path: 'recipe'
    },
    {
        type: 2,
        zIndex: 1,
        name: '二级菜单',
        list: [{
                zIndex: 2,
                name: '二级菜单1',
                path: 'chat'
            },
            {
                zIndex: 2,
                name: '二级菜单2',
                path: 'chat'
            }
        ]
    },
    {
        type: 2,
        zIndex: 1,
        name: '适用工具',
        list: [{
                zIndex: 2,
                name: 'Editor',
                path: 'editor'
            },
            {
                zIndex: 2,
                name: '二级菜单2-2',
                path: 'chat'
            }
        ]
    },
]
export default data
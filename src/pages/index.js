import React, { Component } from "react";
import { Menu, icons, Tabs } from "antd"
import { MobileOutlined, DatabaseOutlined, SnippetsOutlined } from '@ant-design/icons';
import DataNodes from "./data"
import LogNodes from "./log"
import PicNodes from "./pic"
import HelpNodes from "./help"
import "./test"
import styles from "./index.less"
const { SubMenu } = Menu;
const { TabPane } = Tabs
const items = [{
    icon: <MobileOutlined />,
    name: '实时截图',
    children: <PicNodes />,
}, {
    icon: <DatabaseOutlined />,
    name: '数据中心',
    children: <DataNodes />,
}, {
    icon: <SnippetsOutlined />,
    name: '执行日志',
    children: <LogNodes />,
}, {
    icon: <SnippetsOutlined />,
    name: '帮助文档',
    children: <HelpNodes />,
}]
export default class App extends React.Component {

    render() {
        return (
            <>
                <Tabs defaultActiveKey="1">
                    {items.map(v => {
                        return <TabPane
                            tab={<span> {v.icon}{v.name}</span>}
                            key={v.name}
                        >
                            {v.children}
                        </TabPane>
                    })}
                </Tabs>
            </>
        );
    }
}
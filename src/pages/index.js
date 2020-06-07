import React, { Component } from "react";
import { Menu, icons, Tabs } from "antd"
import { MobileOutlined, DatabaseOutlined, SnippetsOutlined,SettingOutlined,CloudServerOutlined} from '@ant-design/icons';

import PicNodes from "./pic"
import DataNodes from "./data"
import ScriptConfig from "./scriptConfig"
import DocumentManager from "./documentManager"
import HelpNodes from "./help"
import "./test"
import styles from "./index.less"
const { SubMenu } = Menu;
const { TabPane } = Tabs
const items = [{
    icon: <MobileOutlined />,
    name: '设备管理',
    children: <PicNodes />,
}, {
    icon: <DatabaseOutlined />,
    name: '数据中心',
    children: <DataNodes />,
}, {
    icon: <SettingOutlined />,
    name: '脚本配置',
    children: <ScriptConfig />,
}, {
    icon: <CloudServerOutlined />,
    name: '服务器文件管理',
    children: <DocumentManager />,
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
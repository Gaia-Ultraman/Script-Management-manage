import React, { Component } from "react";
import { Menu, icons, Tabs } from "antd"
import { MobileOutlined, DatabaseOutlined, SnippetsOutlined } from '@ant-design/icons';
import DataNodes from "./data"
import LogNodes from "./log"
import PicNodes from "./pic"
import "./test"
import styles from "./index.less"
const { SubMenu } = Menu;
const { TabPane } = Tabs
export default class App extends React.Component {
    
    render() {
        return (
            <>
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={<span> <MobileOutlined />实时截图</span>}
                        key="1"
                    >
                        <PicNodes />
                    </TabPane>

                    <TabPane
                        tab={<span><DatabaseOutlined /> 数据中心</span>}
                        key="2"
                    >
                        <DataNodes />
                    </TabPane>

                    <TabPane
                        tab={<span><SnippetsOutlined />执行日志</span>}
                        key="3"
                    >
                        <LogNodes />
                    </TabPane>
                </Tabs>
            </>
        );
    }
}
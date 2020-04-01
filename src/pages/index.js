import React, { Component } from "react";
import { Menu, icons } from "antd"
import { MobileOutlined, DatabaseOutlined, SnippetsOutlined } from '@ant-design/icons';
import DataNodes from "./data"
import LogNodes from "./log"
import PicNodes from "./pic"
const { SubMenu } = Menu;

export default class App extends React.Component {
    state = {
        current: 'pic',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    renderChildren = () => {
        let node;
        switch (this.state.current) {
            case "pic":
                node = <PicNodes/>;
                break;
            case "data":
                node = <DataNodes/>;
                break;
            case "log":
                node = <LogNodes/>;
                break;
        }
        return node
    }

    render() {
        return (
            <>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="pic">
                        <MobileOutlined />
                    实时截图
                </Menu.Item>
                    <Menu.Item key="data">
                        <DatabaseOutlined />
                    数据中心
                </Menu.Item>
                    <Menu.Item key="log">
                        <SnippetsOutlined />
                    执行日志
                </Menu.Item>
                </Menu>
                {this.renderChildren()}
            </>
        );
    }
}
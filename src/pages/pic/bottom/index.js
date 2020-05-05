import React, { Component } from "react";
import { Button, Input, Select } from "antd"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
const { Option } = Select
import styles from "./index.less"

export default class Bottom extends React.Component {

    //记得备注每个参数是什么得值
    state = {
        extend: false,
        scriptData: "",
        centerControlData: "",
        terminalData: "",
        downLoadUrl: "",
        downLoadPath: "",
        action: "",
        scriptName: "",
        param: ""
    }

    sendData = (data) => {
        const { sendFunc } = this.props
        sendFunc(data)
    }


    render() {
        const { extend, scriptData, centerControlData, terminalData, downLoadUrl, downLoadPath, scriptName, param } = this.state
        const { callBack } = this.props
        return (
            <div className={styles.container}>
                <div className={styles.item}>
                    <Button onClick={() => { callBack("一键启动", { scriptName, param }) }}>一键启动</Button>&nbsp;&nbsp;
                    <Input style={{ width: "200px" }} placeholder="脚本名称" value={scriptName} onChange={(e) => { this.setState({ scriptName: e.target.value }) }} />&nbsp;&nbsp;
                     <Input style={{ width: "200px" }} placeholder="启动参数" value={param} onChange={(e) => { this.setState({ param: e.target.value }) }} />
                    <Button style={{ marginLeft: "100px" }} onClick={() => { callBack("一键停止") }}>一键停止脚本</Button>
                </div>
                {
                    extend ? <>
                    <div className={styles.item}> <Button>向脚本发送信息</Button>&nbsp;&nbsp;<Input value={scriptData} onChange={(e) => { this.setState({ scriptData: e.target.value }) }} /></div>
                    <div className={styles.item}> <Button onClick={() => { callBack("执行中控命令", centerControlData) }}>执行中控命令</Button>&nbsp;&nbsp;<Input value={centerControlData} onChange={(e) => { this.setState({ centerControlData: e.target.value }) }} /></div>
                    <div className={styles.item}> <Button onClick={() => { callBack("执行终端命令", terminalData) }}>执行终端命令</Button>&nbsp;&nbsp;<Input value={terminalData} onChange={(e) => { this.setState({ terminalData: e.target.value }) }} /></div>
                
                
                    <div className={styles.item}>
                        <Button onClick={() => { callBack("一键下载", { downLoadUrl, downLoadPath }) }}>一键下载</Button>&nbsp;&nbsp;
                        <Input placeholder="下载连接" value={downLoadUrl} onChange={(e) => { this.setState({ downLoadUrl: e.target.value }) }} />&nbsp;&nbsp;
                        <Input placeholder="下载目录" value={downLoadPath} onChange={(e) => { this.setState({ downLoadPath: e.target.value }) }} />&nbsp;&nbsp;
                    </div>

                    </> : null
                }
                <div className={styles.extendItem} onClick={(e) => { this.setState({ extend: !extend }) }}>
                    {extend ? "收起全部" : "展开更多"} {extend ? <UpOutlined /> : <DownOutlined />}
                </div>
                
            </div>
        );
    }
}
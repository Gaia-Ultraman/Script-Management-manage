import React, { Component } from "react";
import { Button, Input, Select } from "antd"
const { Option } = Select
import styles from "./index.less"

export default class Bottom extends React.Component {

    state = {
        scriptData: "",
        centerControlData: "",
        terminalData: "",
        downLoadUrl: "",
        downLoadPath: "",
        action: "",
        scriptName:"",
        param:""
    }

    sendData = (data) => {
        const { sendFunc } = this.props
        sendFunc(data)
    }


    render() {
        const { scriptData, centerControlData, terminalData, downLoadUrl, downLoadPath, scriptName,param} = this.state
        const {callBack}=this.props
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.item}> <Button>向脚本发送信息</Button>&nbsp;&nbsp;<Input value={scriptData} onChange={(e) => { this.setState({ scriptData: e.target.value }) }} /></div>
                    <div className={styles.item}> <Button>执行中控命令</Button>&nbsp;&nbsp;<Input value={centerControlData} onChange={(e) => { this.setState({ centerControlData: e.target.value }) }} /></div>
                    <div className={styles.item}> <Button onClick={()=>{callBack("执行终端命令",terminalData)}}>执行终端命令</Button>&nbsp;&nbsp;<Input value={terminalData} onChange={(e) => { this.setState({ terminalData: e.target.value }) }} /></div>
                </div>
                <div className={styles.right}>
                    <div className={styles.item}>
                        <Button>一键下载</Button>&nbsp;&nbsp;
                        <Input placeholder="下载连接" value={downLoadUrl} onChange={(e) => { this.setState({ downLoadUrl: e.target.value }) }} />&nbsp;&nbsp;
                        <Input placeholder="下载目录" value={downLoadPath} onChange={(e) => { this.setState({ downLoadPath: e.target.value }) }} />&nbsp;&nbsp;
                        <span>完成时动作：</span>
                        <Select style={{ width: 120 }} onChange={(action) => { this.setState({ action }) }}>
                            <Option value="test">测试</Option>
                        </Select>
                    </div>
                    <div className={styles.item}>
                        <Button>一键启动</Button>&nbsp;&nbsp;
                        <Input placeholder="脚本名称" value={scriptName} onChange={(e) => { this.setState({ scriptName: e.target.value }) }} />&nbsp;&nbsp;
                        <Input placeholder="启动参数" value={param} onChange={(e) => { this.setState({ param: e.target.value }) }} />
                    </div>
                    <div className={styles.item}>
                        <Button danger type={"primary"}>一键停止脚本</Button>
                    </div>
                </div>
            </div>
        );
    }
}
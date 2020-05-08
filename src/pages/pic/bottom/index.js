import React, { Component } from "react";
import { Button, Input, Select } from "antd"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
const { Option } = Select
import styles from "./index.less"

export default class Bottom extends React.Component {

    //记得备注每个参数是什么得值
    state = {
        extend: false,           //展开 收起 
        
        scriptName: "",          //脚本名称
        scriptUI:"",             //脚本UI

        downLoadUrl: "",         //下载连接
        downLoadPath: "",        //下载储存路径
        removeFilePath: "",      //删除文件路径
        listFilePath:"",         //查看目录
        fileExistsPath:"",       //查询文件是否存在
        
        terminalData: "",        //终端命令
        processName:"",          //进程名称
        execPath:"",             //可执行文件路径
        execParameter:"",        //可执行文件参数

        installAppPath:"",       //安装app路径
        uninstallAppBundleID:"", //卸载app包名



        centerControlData: "" 
    }

    sendData = (data) => {
        const { sendFunc } = this.props
        sendFunc(data)
    }


    render() {
        const { extend, scriptName,scriptUI, downLoadUrl, downLoadPath,removeFilePath, listFilePath, fileExistsPath,terminalData,processName,execPath,execParameter,installAppPath,uninstallAppBundleID, centerControlData} = this.state
        const { callBack } = this.props
        return (
            <div className={styles.container}>
                <div className={styles.extendItem} onClick={(e) => { this.setState({ extend: !extend }) }}>
                    {extend ? "收起全部" : "展开更多"} {extend ?  <DownOutlined /> : <UpOutlined />}
                </div>
                {
                    extend ? <>
                    <p align="center" > 触摸精灵操作 </p>
                    <div className={styles.item}> 
                        <Button onClick={() => { callBack("运行脚本", {scriptName, scriptUI }) }}>运行脚本</Button>&nbsp;&nbsp;
                        <Input style={{ width: "200px" }} placeholder="脚本名称" value={scriptName} onChange={(e) => { this.setState({ scriptName: e.target.value }) }} />&nbsp;&nbsp;
                        <Input style={{ width: "200px" }} placeholder="UI参数" value={scriptUI} onChange={(e) => { this.setState({ scriptUI: e.target.value }) }} />
                        
                        <Button style={{ marginLeft: "100px" }} onClick={() => { callBack("停止脚本") }}>停止脚本</Button>
                        <Button style={{ marginLeft: "100px" }} onClick={() => { callBack("重启触摸") }}>重启触摸精灵</Button>
                        <Button style={{ marginLeft: "100px" }} onClick={() => { callBack("获取触摸精灵版本") }}>获取触摸精灵版本</Button>
                    </div>




                    <p align="center" > 文件操作 </p>
                    <div className={styles.item}>
                        <Button onClick={() => { callBack("下载文件", { downLoadUrl, downLoadPath }) }}>下载文件</Button>&nbsp;&nbsp;
                        <Input style={{ width: "200px" }} placeholder="下载连接" value={downLoadUrl} onChange={(e) => { this.setState({ downLoadUrl: e.target.value }) }} />&nbsp;&nbsp;
                        <Input style={{ width: "200px" }} placeholder="保存路径" value={downLoadPath} onChange={(e) => { this.setState({ downLoadPath: e.target.value }) }} />&nbsp;&nbsp;
                
                        <Button style={{ marginLeft: "200px" }} onClick={() => { callBack("删除文件", removeFilePath) }}>删除文件</Button>&nbsp;&nbsp;
                        <Input style={{ width: "300px" }} placeholder="文件路径" value={removeFilePath} onChange={(e) => { this.setState({ removeFilePath: e.target.value }) }} />
                    </div>
                    <div className={styles.item}>
                        <Button onClick={() => { callBack("查看目录", listFilePath) }}>查看目录</Button>&nbsp;&nbsp;
                        <Input style={{ width: "300px" }} placeholder="目录路径" value={listFilePath} onChange={(e) => { this.setState({ removeFilePath: e.target.value }) }} />
                        
                        <Button style={{ marginLeft: "300px" }} onClick={() => { callBack("检查文件", fileExistsPath) }}>检查文件是否存在</Button>&nbsp;&nbsp;
                        <Input style={{ width: "300px" }} placeholder="文件路径" value={fileExistsPath} onChange={(e) => { this.setState({ removeFilePath: e.target.value }) }} />
                    </div>

                    
                    
                    
                    <p align="center" > 系统操作 </p>
                    <div className={styles.item}>
                    <Button  onClick={() => { callBack("软重启") }}>软重启</Button>
                    <Button style={{ marginLeft: "80px" }} onClick={() => { callBack("注销SpringBoard") }}>注销SpringBoard</Button>
                    <Button style={{ marginLeft: "80px" }} onClick={() => { callBack("系统运行时长") }}>系统运行时长</Button>
                    <Button style={{ marginLeft: "80px" }} onClick={() => { callBack("可用运存") }}>系统可用运存</Button>
                    <Button style={{ marginLeft: "80px" }} onClick={() => { callBack("正在运行进程") }}>正在运行进程</Button>
                    <Button style={{ marginLeft: "80px" }} onClick={() => { callBack("重启") }}>重启设备</Button>
                    </div>
                    <div className={styles.item}>
                        <Button onClick={() => { callBack("执行终端命令", terminalData) }}>执行终端命令</Button>&nbsp;&nbsp;
                        <Input style={{ width: "400px" }} placeholder="终端命令" value={terminalData} onChange={(e) => { this.setState({ terminalData: e.target.value }) }} />
                        
                        <Button style={{ marginLeft: "200px" }} onClick={() => { callBack("结束进程", processName) }}>结束进程</Button>&nbsp;&nbsp;
                        <Input style={{ width: "400px" }} placeholder="进程名称" value={processName} onChange={(e) => { this.setState({ processName: e.target.value }) }} />
                    </div>
                    <div className={styles.item}>
                    <Button onClick={() => { callBack("运行可执行文件", { execPath, execParameter }) }}>运行可执行文件</Button>&nbsp;&nbsp;
                    <Input style={{ width: "200px" }} placeholder="可执行文件路径" value={execPath} onChange={(e) => { this.setState({ execPath: e.target.value }) }} />&nbsp;&nbsp;
                    <Input style={{ width: "200px" }} placeholder="运行参数用空格分割" value={execParameter} onChange={(e) => { this.setState({ execParameter: e.target.value }) }} />&nbsp;&nbsp;

                    </div>



                    <p align="center" > app操作 </p>
                    <div className={styles.item}>
                    <Button onClick={() => { callBack("安装app", installAppPath) }}>安装app</Button>&nbsp;&nbsp;<Input style={{ width: "200px" }} placeholder="ipa路径" value={installAppPath} onChange={(e) => { this.setState({installAppPath: e.target.value }) }} />

                    <Button style={{marginLeft: "100px" }} onClick={() => { callBack("卸载app", uninstallAppBundleID) }}>卸载app</Button>
                    <Input style={{width: "200px" }} placeholder="app包名" value={uninstallAppBundleID} onChange={(e) => { this.setState({uninstallAppBundleID: e.target.value }) }} />
                
                    </div>



                    <div className={styles.item}> <Button onClick={() => { callBack("执行中控命令", centerControlData) }}>执行中控命令</Button>&nbsp;&nbsp;<Input value={centerControlData} onChange={(e) => { this.setState({ centerControlData: e.target.value }) }} /></div>
                    
                
                
                    

                    </> : <>
                    <Button onClick={() => { callBack("运行脚本", { scriptName, scriptUI }) }}>运行脚本</Button>&nbsp;&nbsp;
                    <Input style={{ width: "200px" }} placeholder="脚本名称" value={scriptName} onChange={(e) => { this.setState({ scriptName: e.target.value }) }} />&nbsp;&nbsp;
                    <Input style={{ width: "200px" }} placeholder="UI参数" value={scriptUI} onChange={(e) => { this.setState({scriptUI: e.target.value }) }} />
                    
                    <Button style={{ marginLeft: "300px" }} onClick={() => { callBack("停止脚本") }}>停止脚本</Button>
                    </>
                }
             </div>
        );
    }
}
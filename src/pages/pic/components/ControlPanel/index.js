import React, { Component } from "react";
import { Button, Input, Select, message } from "antd"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
const { Option } = Select
import styles from "./index.less"
const tips = ["文件", "系统", "app", "设备", "deb", "客户端"]

var keyMSleep = 0;  // keyClike 按下时间
export default class ControlPanel extends React.Component {
    // 记得备注每个参数是什么得值
    state = {
        extend: "触摸",        // 展开 收起

        scriptName: "",        // 脚本名
        scriptUI: "",          // 脚本UI

        downLoadUrl: "",       // 下载连接
        downLoadPath: "",      // 下载路径
        existsPath: "",        // 检查文件路径
        lsPath: "",            // 查看目录路径
        removePath: "",        // 删除文件路径

        terminalCmd: "",       // 终端命令
        processName: "",       // 结束进程名

        appInstallPath: "",     // app安装路径
        uninstallBid: "",       // 卸载包名
        isInstallBid: "",       // 是否安装包名
        closeAppBid: "",        // 关闭包名

        deviceProperty: "",      // 要查询的设备信息
        keyNumber: "",           // clike key值

        installDebPath: "",      // deb安装路径
        uninstallDeb: "",        // deb卸载包名

        deviceNumber: "",        // 设备编号
        socketSever: "",         // 更换服务器地址
        pingTime: "",            // 心跳包时间
        overTime: "",            // 超时时间
        NETCondition: "",        // 网络连接条件
        consoleCmd: "",          // 中控指令
    }

    sendData = (data) => {
        const { sendFunc } = this.props
        sendFunc(data)
    }


    render() {
        const { extend,
            scriptName, scriptUI,    // 触摸
            downLoadUrl, downLoadPath, existsPath, lsPath, removePath,  // 文件
            terminalCmd, processName, // 系统
            appInstallPath, uninstallBid, isInstallBid, closeAppBid,// app
            deviceProperty, keyNumber, // 设备
            installDebPath, uninstallDeb, // deb
            deviceNumber, socketSever, pingTime, overTime, NETCondition, consoleCmd // 客户端
        } = this.state
        const { sendCmd } = this.props
        return (
            <div className={styles.container}>
                <div className={styles.item}>
                    {tips.map(v => {
                        return <p key={v} style={{ fontSize: "15px", color: "#2593FC" }} onClick={() => {
                            if (extend == v) return this.setState({ extend: "触摸" });
                            this.setState({ extend: v });
                        }} >{v}{extend == v ? <DownOutlined /> : <UpOutlined />}</p>
                    })}
                </div>
                
                {
                    extend == "触摸" ? <div className={styles.item}>
                        <div style={{ display: "flex" }}>
                            <Button onClick={() => {
                                if (!scriptName) return message.error("脚本名称不能为空");
                                if (scriptUI) sendCmd({ codeType: "touchelf", cmd: "runScript", scriptName, UI: scriptUI})
                                else sendCmd({codeType: "touchelf", cmd: "runScript", scriptName})
                            }}>运行脚本</Button>
                            <Input placeholder="脚本名称" value={scriptName} onChange={(e) => { this.setState({ scriptName: e.target.value }) }} />
                            <Input placeholder="UI参数 用;分割" value={scriptUI} onChange={(e) => { this.setState({ scriptUI: e.target.value }) }} />
                        </div>

                        <Button onClick={() => {
                            sendCmd({ codeType: "touchelf", cmd: "stopScript" })
                        }}>停止脚本</Button>

                        <Button onClick={() => {
                            sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "killall -9 tedaemon" })
                            setTimeout(sendCmd, 1000, { codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "tedaemon" })
                        }}>重启触摸精灵</Button>

                        <Button onClick={() => {
                            sendCmd({ codeType: "touchelf", cmd: "getTouchelfVersion" })
                        }}>获取触摸精灵版本</Button>
                    </div> : null
                }

                {
                    extend == "文件" ? <div className={styles.item}>
                        <div style={{ width: "45%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!downLoadUrl) return message.error("下载连接不能为空")
                                    if (downLoadPath) sendCmd({ codeType: "file", cmd: "curlDown", url: downLoadUrl, path:downLoadPath})
                                    else sendCmd({ codeType: "file", cmd: "curlDown", url: downLoadUrl})
                                }}>下载文件</Button>
                                <Input placeholder="下载连接" value={downLoadUrl} onChange={(e) => { this.setState({ downLoadUrl: e.target.value }) }} />
                                <Input placeholder="保存路径" value={downLoadPath} onChange={(e) => { this.setState({ downLoadPath: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "ls " + lsPath })
                                }}>查看目录</Button>
                                <Input placeholder="目录路径" value={lsPath} onChange={(e) => { this.setState({ lsPath: e.target.value }) }} />
                            </div>
                        </div>

                        <div style={{ width: "45%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!existsPath) return message.error("路径不能为空")
                                    sendCmd({ codeType: "file", cmd: "fileExists", path: existsPath })
                                }}>文件是否存在</Button>
                                <Input placeholder="文件/目录 路径" value={existsPath} onChange={(e) => { this.setState({ existsPath: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!removePath) return message.error("路径不能为空")
                                    sendCmd({ codeType: "file", cmd: "removeFile", path: removePath })
                                }}>删除文件</Button>
                                <Input placeholder="文件路径" value={removePath} onChange={(e) => { this.setState({ removePath: e.target.value }) }} />
                            </div>
                        </div>
                    </div> : null
                }

                {
                    extend == "系统" ? <div className={styles.item}>
                        <div style={{ width: "35%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!terminalCmd) return message.error("终端命令不能为空")
                                    sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: terminalCmd })
                                }}>执行终端命令</Button>
                                <Input placeholder="终端命令" value={terminalCmd} onChange={(e) => { this.setState({ terminalCmd: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "ldrestart" })
                                }}>软重启</Button>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "killall -9  SpringBoard" })
                                }}>注销SpringBoard</Button>
                            </div>
                        </div>

                        <div style={{ width: "35%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!processName) return message.error("进程名不能为空")
                                    sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "killall -9 " + processName })
                                }}>结束进程</Button>
                                <Input placeholder="进程名称" value={processName} onChange={(e) => { this.setState({ processName: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "system", cmd: "bootTime" })
                                }}>系统启动时间</Button>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "system", cmd: "availableMemory" })
                                }}>系统可用内存</Button>
                            </div>
                        </div>

                        <div style={{ width: "10%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "ps -A" })
                                }}>正在运行进程</Button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "reboot" })
                                }}>重启</Button>
                            </div>
                        </div>
                    </div> : null
                }

                {
                    extend == "app" ? <div className={styles.item}>
                        <div style={{ width: "35%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!appInstallPath) return message.error("安装路径不能为空")
                                    sendCmd({ codeType: "app", cmd: "installApp", path: appInstallPath, isRemove: "YES" })
                                }}>安装app</Button>
                                <Input placeholder="ipa路径" value={appInstallPath} onChange={(e) => { this.setState({ appInstallPath: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!isInstallBid) return message.error("包名不能为空")
                                    sendCmd({ codeType: "app", cmd: "isInstall", bundleID: isInstallBid })
                                }}>app是否安装</Button>
                                <Input placeholder="app包名" value={isInstallBid} onChange={(e) => { this.setState({ isInstallBid: e.target.value }) }} />
                            </div>
                        </div>

                        <div style={{ width: "35%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!uninstallBid) return message.error("包名不能为空")
                                    sendCmd({ codeType: "app", cmd: "uninstallAPP", bundleID: uninstallBid })
                                }}>卸载app</Button>
                                <Input placeholder="app包名" value={uninstallBid} onChange={(e) => { this.setState({ uninstallBid: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!closeAppBid) return message.error("包名不能为空")
                                    sendCmd({ codeType: "app", cmd: "killApp", bundleID: closeAppBid })
                                }}>关闭app</Button>
                                <Input placeholder="app包名" value={closeAppBid} onChange={(e) => { this.setState({ closeAppBid: e.target.value }) }} />
                            </div>
                        </div>

                        <div style={{ width: "10%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "app", cmd: "lsApp", icon: "NO" })
                                }}>已安装列表</Button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "app", cmd: "killAllApp" })
                                }}>关闭全部app</Button>
                            </div>
                        </div>
                    </div> : null
                }

                {
                    extend == "设备" ? <div className={styles.item}>
                        <div style={{ width: "35%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!deviceProperty) return message.error("要获取的信息不能为空")
                                    sendCmd({ codeType: "device", cmd: "MGCopyAnswe", property: deviceProperty })
                                }}>查询设备信息</Button>
                                <Input placeholder="要查询的信息" value={deviceProperty} onChange={(e) => { this.setState({ deviceProperty: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Button onMouseDown={() => { keyMSleep = new Date().getTime() }} onMouseUp={() => {
                                        sendCmd({ codeType: "Touch", cmd: "keyClick", key: "234", mSleep: (new Date().getTime() - keyMSleep) })
                                    }}>音量-</Button>
                                    <Button onMouseDown={() => { keyMSleep = new Date().getTime() }} onMouseUp={() => {
                                        sendCmd({ codeType: "Touch", cmd: "keyClick", key: "233", mSleep: (new Date().getTime() - keyMSleep) })
                                    }}>音量+</Button>
                                </div>
                                <Button onMouseDown={() => { keyMSleep = new Date().getTime() }} onMouseUp={() => {
                                    sendCmd({ codeType: "Touch", cmd: "keyClick", key: "226", mSleep: (new Date().getTime() - keyMSleep) })
                                }}>静音</Button>
                            </div>
                        </div>
                        <div style={{ width: "35%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onMouseDown={() => { keyMSleep = new Date().getTime() }} onMouseUp={() => {
                                    if (!keyNumber) return message.error("按键码不能为空")
                                    sendCmd({ codeType: "Touch", cmd: "keyClick", key: keyNumber, mSleep: (new Date().getTime() - keyMSleep) })
                                }}>keyClike</Button>
                                <Input placeholder="按键码" value={keyNumber} onChange={(e) => { this.setState({ keyNumber: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onMouseDown={() => { keyMSleep = new Date().getTime() }} onMouseUp={() => {
                                    sendCmd({ codeType: "Touch", cmd: "keyClick", key: "48", mSleep: (new Date().getTime() - keyMSleep) })
                                }}>电源</Button>
                                <Button onMouseDown={() => { keyMSleep = new Date().getTime() }} onMouseUp={() => {
                                    sendCmd({ codeType: "Touch", cmd: "keyClick", key: "64", mSleep: (new Date().getTime() - keyMSleep) })
                                }}>home</Button>
                            </div>
                        </div>
                        <div style={{ width: "10%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "device", cmd: "getSnapshot" })
                                }} >刷新截图</Button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "device", cmd: "getLocalIPAddress" })
                                }}>获取内网IP</Button>
                            </div>
                        </div>
                    </div> : null
                }

                {
                    extend == "deb" ? <div className={styles.item}>
                        <div style={{ display: "flex" }}>
                            <Button onClick={() => {
                                if (!installDebPath) return message.error("deb包路径不能为空")
                                sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "dpkg -i " + installDebPath })
                            }}>安装deb</Button>
                            <Input placeholder="deb包路径" value={installDebPath} onChange={(e) => { this.setState({ installDebPath: e.target.value }) }} />
                        </div>
                        <div style={{ display: "flex" }}>
                            <Button onClick={() => {
                                if (!uninstallDeb) return message.error("deb包名不能为空")
                                sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "dpkg -P " + uninstallDeb })
                            }}>卸载deb</Button>
                            <Input placeholder="deb包名" value={uninstallDeb} onChange={(e) => { this.setState({uninstallDeb: e.target.value }) }} />
                        </div>
                        <Button onClick={() => {
                            sendCmd({ codeType: "system", cmd: "runTerminalCmd", TerminalCmd: "dpkg --get-selections" })
                        }}>已安装deb列表</Button>
                    </div> : null
                }

                {
                    extend == "客户端" ? <div className={styles.item}>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (deviceNumber) sendCmd({ codeType: "websocket", cmd: "setDeviceNumber", deviceNumber})
                                    else sendCmd({ codeType: "websocket", cmd: "setDeviceNumber"})
                                }}>设备编号</Button>
                                <Input placeholder="设置新的设备编号,不填为获取" value={deviceNumber} onChange={(e) => { this.setState({ deviceNumber: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (pingTime) sendCmd({ codeType: "websocket", cmd: "setPingTime", pingTime})
                                    else sendCmd({ codeType: "websocket", cmd: "setPingTime"})
                                }}>心跳包时间</Button>
                                <Input placeholder="更改心跳包时间(秒),不填为获取" value={pingTime} onChange={(e) => { this.setState({ pingTime: e.target.value }) }} />

                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (window.confirm("设备将与服务器断开连接,断开后你需要手动开启")) sendCmd({ codeType: "websocket", cmd: "setEnabled", enabled: "NO" })
                                }}>断开连接</Button>
                                <Button onClick={() => {
                                    sendCmd({ codeType: "websocket", cmd: "VERSION" })
                                }}>客户端版本</Button>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!socketSever) return message.error("服务器地址不能为空")
                                    if (window.confirm("要将设备连接到-> " + socketSever + " 吗?")) sendCmd({ codeType: "websocket", cmd: "setServerURL", url: socketSever })
                                }}>服务器地址</Button>
                                <Input  placeholder="新服务器地址 ws:\\ " value={socketSever} onChange={(e) => { this.setState({ socketSever: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button  onClick={() => {
                                    if (overTime) sendCmd({ codeType: "websocket", cmd: "setOvertime", overtime:overTime})
                                    else sendCmd({ codeType: "websocket", cmd: "setOvertime"})
                                }}>超时时间</Button>
                                <Input placeholder="更改超时时间(秒),不填为获取" value={overTime} onChange={(e) => { this.setState({ overTime: e.target.value }) }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!NETCondition) return sendCmd({ codeType: "websocket", cmd: "setNETCondition" })
                                    if (window.confirm("改变网络条件有可能会使设备与服务器断开连接")) sendCmd({ codeType: "websocket", cmd: "setNETCondition", condition: NETCondition })
                                }}>网络条件</Button>
                                <Input placeholder=" wifi cellularNET unlimited " value={NETCondition} onChange={(e) => { this.setState({ NETCondition: e.target.value }) }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    if (!consoleCmd) return message.error("中控指令不能为空")
                                    try {
                                        const msg = JSON.parse(consoleCmd)
                                        sendCmd(msg)
                                    } catch (err) {
                                        return message.error("错误的json格式")
                                    }
                                }}>执行中控指令</Button>
                                <Input placeholder="json格式指令" value={consoleCmd} onChange={(e) => { this.setState({ consoleCmd: e.target.value }) }} />
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        );
    }
}
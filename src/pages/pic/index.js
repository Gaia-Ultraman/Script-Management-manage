import React, { Component } from "react";
import { Checkbox, Button, message, Modal, Input, Select, Slider } from "antd"
import Cards from "./cards"
import Bottom from "./bottom"
import { PlusOutlined } from '@ant-design/icons';
import { getGroup, setGroup, deletGroup } from "@/utils/group"

const { Option } = Select;

const styles = require('./index.less')

export default class App extends React.Component {
    ws = null
    state = {
        tempId: new Date().getTime(),
        //服务端连接状态
        hasConnect: false,
        groups: getGroup(),
        //所有的设备
        allDevices: [],
        //需要展示的设备
        showDevices: [],
        //目前选中的group
        currentGroup: "全部",
        //删除模态框
        visible: false,
        //需要删除的分组的名字
        name: "",
        //全选盒子
        checked: false,

        //添加分组模态框
        addVisible: false,
        addName: "",
        type: 2,
        reg: "",


        //服务端连接
        url: "",

    };
    componentDidMount() {
        document.title = "ID:" + this.state.tempId
        let url = localStorage.getItem("url")
        this.setState({ url })
    }

    componentWillUnmount() {
        this.state.hasConnect && this.ws.close()
    }

    //连接SOCKET
    connect = () => {
        const { tempId, url } = this.state
        if (!url) {
            message.error("连接不能为空!")
            return
        }
        this.ws = new WebSocket(`${url}/manager?id=${tempId}`)
        this.ws.addEventListener('message', (event) => {
            let result = {}
            try {
                result = JSON.parse(event.data)
            } catch (err) {
                console.log("消息返回解析错误:", err)
                return
            }
            const { currentGroup, groups, showDevices, allDevices } = this.state

            //获得所有设备，更新设备状态
            if (result.from && result.from.group == "server") {
                if (result.data && result.data.cmd == "getAllOnline") {
                    this.setState({ showDevices: result.data.retMsg, allDevices: result.data.retMsg, currentGroup: "全部", checked: false })
                } else if (result.data && result.data.cmd == "online") {
                    message.success(`${result.data.retMsg.name} 上线`)
                    allDevices.push(result.data.retMsg)
                    this.setState({
                        allDevices: JSON.parse(JSON.stringify(allDevices))
                    }, () => {
                        this.handleGroup(groups.filter(v => v.name == currentGroup)[0])
                    })

                } else if (result.data && result.data.cmd == "offline") {
                    message.error(`${result.data.retMsg.name} 下线`)
                    this.setState({
                        allDevices: JSON.parse(JSON.stringify(allDevices.filter(v => v.id != result.data.retMsg.id)))
                    }, () => {
                        this.handleGroup(groups.filter(v => v.name == currentGroup)[0])
                    })
                }
            }
            //接受来自手机的消息
            else if (result.from && result.from.group == "phone") {

                if(result.data.msgType != 'base64'){
                        //全部设备里面的截图更新
                        allDevices.forEach(v => {
                            if (v.id == result.from.id) {
                                v.des = JSON.stringify(result.data.retMsg)
                            }
                        })
                        //当前显示设备里的截图更新
                        showDevices.forEach(v => {
                            if (v.id == result.from.id) {
                                v.des = JSON.stringify(result.data.retMsg)
                            }
                        })
                }

                //获取图片
                if (result.data && result.data.cmd == "updateSnapshot") {
                    //客户端截图成功
                    if (result.data.msgType == 'base64') {
                        //全部设备里面的截图更新
                        allDevices.forEach(v => {
                            if (v.id == result.from.id) {
                                v.src = "data:image/jpeg;base64," + result.data.retMsg
                            }
                        })
                        //当前显示设备里的截图更新
                        showDevices.forEach(v => {
                            if (v.id == result.from.id) {
                                v.src = "data:image/jpeg;base64," + result.data.retMsg
                            }
                        })
                    } 
                }

                this.forceUpdate()
            }
        });
        this.ws.addEventListener('error', (event) => {
            console.log('Error', event);
            message.error("服务器连接失败!")
        });

        this.ws.addEventListener('open', (event) => {
            console.log('Open', event);
            this.setState({
                hasConnect: true,
            })
            this.getAllDevices()
            message.success("服务器连接成功!")
        });

        this.ws.addEventListener('close', (event) => {
            console.log('Close', event);
            message.info("连接已关闭!")
            this.setState({
                hasConnect: false,
                showDevices: [],
                allDevices: [],
                checked: false
            })
        });

    }

    //筛选
    handleGroup = (value) => {
        console.log("value", value)
        const { allDevices } = this.state
        let showDevices = [];
        //去掉checked属性
        let cloneAllDevices = allDevices && allDevices.map(v => {
            let temp = JSON.parse(JSON.stringify(v))
            delete temp.checked;
            return temp
        });

        if (value.name == "全部") {
            this.setState({ showDevices: allDevices, currentGroup: value.name, checked: false })
            return
        }


        //filter 返回的子元素是引用类型时，需要深拷贝一下数组，不然会影响原数据
        if (value.type == 1) {
            let reg = new RegExp(value.reg)
            showDevices = cloneAllDevices.filter(v => reg.test(v.id))
        } else if (value.type == 2) {
            showDevices = cloneAllDevices.filter(v => { return value.data.indexOf(v.id) != -1 })
        }
        this.setState({ showDevices, currentGroup: value.name, checked: false })
    }

    //==========================删除模态框==========================
    handleOk_delete = () => {
        // this.setState({ visible: !this.state.visible })
        const { name, groups } = this.state
        console.log("inputValue", this.state.name)
        if (name == "全部") {
            message.error("不能删除全部分组!")
            return
        }
        if (groups.filter(v => v.name == name).length == 0) {
            message.error(`没有分组:${name}`)
            return
        }
        message.success("删除成功!")
        this.setState({
            currentGroup: "全部",
            groups: deletGroup(name),
            visible: !this.state.visible,
            checked: false,
        })
    }

    handleModal_delete = () => {
        this.setState({ visible: !this.state.visible })
    }

    handleInputName = (e) => {
        this.setState({ name: e.target.value })
    }

    //==========================添加模态框==========================
    handleOk_add = () => {
        const { addName, type, reg, showDevices } = this.state
        console.log("OK:", addName, type, reg)
        let item = { name: addName, type }
        if (type == 1) {
            item.reg = reg
        } else {
            item.data = showDevices.filter(v => v.checked).map(v => v.id)
        }
        let result = setGroup(item)
        if (!result) {
            message.error("添加失败！")
            return
        }
        this.setState({
            groups: result,
            addVisible: false
        })
        this.handleGroup(item)
    }

    handleModal_add = () => {
        this.setState({ addVisible: !this.state.addVisible })
    }

    handleInput_add = (key, value) => {
        this.setState({
            [key]: value
        })
    }


    //checkBox 全选
    handleCheck = (e) => {
        const { showDevices } = this.state
        showDevices.forEach(v => {
            v.checked = e.target.checked
        })
        this.setState({
            checked: e.target.checked
        })
    }

    //处理设备被check
    handleCardCheck = (showDevices) => {
        this.setState({ showDevices })
    }

    //底部回调的值
    handleBottomObj = (type,data) => {
        const {showDevices}=this.state
        let ids=showDevices.filter(v=> v.checked).map(v=>v.id)
        console.log("BottomCB", type,data)
        if(type=="执行终端命令"){
            this.sendMessage({codeType:"system",cmd:"runTerminalCmd",TerminalCmd:data},{ group: "phone", id : ids})
        }
    }


    //调用websocket发送消息 
    sendMessage = (data, dis) => {
        const { hasConnect, tempId } = this.state
        if (!hasConnect) {
            message.error("未连接，执行失败！")
            return
        }
        let from = { group: "console", id: tempId.toString() }
        this.ws && this.ws.send(JSON.stringify({
            from,
            data,
            dis
        }))
    }


    //操作连接地址Input
    handleInputUrl = (e) => {
        this.setState({ url: e.target.value })
        //缓存
        localStorage.setItem("url", e.target.value)
    }

    //  连接/断开按钮
    handleConnect = () => {
        const { hasConnect } = this.state
        if (hasConnect) {
            this.ws && this.ws.close()
        } else {
            this.connect()
        }
    }

    //获取所有设备
    getAllDevices = () => {
        this.sendMessage({ cmd: "getAllOnline" }, { group: "server" })
    }

    //滑动条
    handleSlider = (value) => {
        this.sendMessage({ codeType: "device", cmd: "setScreenBrightness", brightness: value }, { group: "phone", id: "all" })
    }

    render() {
        const { groups, allDevices, currentGroup, visible, checked, addVisible, type, showDevices, hasConnect, url } = this.state
        return <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <Button type="primary" danger onClick={this.handleModal_delete} className={styles.notice}>删除分组</Button>
                    <Checkbox checked={checked} onClick={this.handleCheck}>全选</Checkbox>
                    <span style={{ paddingLeft: "30px" }}>当前分组数量:<span style={{ color: "green", fontSize: 20 }}>{showDevices.length}</span></span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>调节屏幕亮度:<Slider className={styles.slider} defaultValue={30} max={100} min={0} onAfterChange={this.handleSlider} /></div>
                <div className={styles.status}>
                    {hasConnect ? <div style={{ color: "green" }}>已连接</div> : <div style={{ color: "red" }}>未连接</div>}
                    <Input value={url} placeholder={"服务器地址"} onChange={this.handleInputUrl} />
                    <Button onClick={this.handleConnect}>{hasConnect ? "断开" : "连接"}</Button>
                </div>
            </div>

            <div className={styles.content}>

                <div className={styles.groupList}>
                    {groups.map((value, i) => {
                        return <Button type={currentGroup == value.name ? "primary" : null} key={i} onClick={() => { this.handleGroup(value) }} >{value.name}</Button>
                    })}
                    <Button onClick={this.handleModal_add}><PlusOutlined style={{ fontSize: 45, color: "rgba(0,0,0,0.3)" }} /></Button>
                </div>


                <Cards devices={showDevices} onChecked={this.handleCardCheck} sendFunc={this.sendMessage} />

            </div>

            <Bottom callBack={this.handleBottomObj} sendFunc={this.sendMessage} />

            <Modal
                title="删除分组"
                visible={visible}
                onOk={this.handleOk_delete}
                onCancel={this.handleModal_delete}
            >
                <Input placeholder="请输入需要删除分组的名字!" onChange={this.handleInputName} />
            </Modal>
            <Modal
                title="添加分组"
                visible={addVisible}
                onOk={this.handleOk_add}
                onCancel={this.handleModal_add}
            >
                <Input className={styles.item} placeholder="请输入需分组名字！" onChange={(e) => { this.handleInput_add("addName", e.target.value) }} />
                <Select className={styles.item} defaultValue={type} style={{ width: 180 }} onChange={(value) => {
                    this.handleInput_add("type", value)
                }
                }>
                    <Option value={1}>正则表达式筛选</Option>
                    <Option value={2}>手动点击筛选</Option>
                </Select>
                {type == 1 ? <Input className={styles.item} placeholder="请输入正则表达式！" onChange={(e) => { this.handleInput_add("reg", e.target.value) }} /> : null}
            </Modal>
        </div>
    }
}
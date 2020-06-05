import React, { Component } from "react";
import { Checkbox, Card, Pagination, Modal, message, Tooltip, Popover, Popconfirm, Button } from "antd"
import { ReloadOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons"
// import { List } from 'react-virtualized';
import { getLocalPic, setLocalPic } from "@/utils/picture"
import { getGroup, deleteGroup, setGroup } from "@/utils/group"
import { getLogs } from "@/services/log"
import styles from "./index.less"
const { Meta } = Card

const list = [
    'Brian Vaughn',
    // And so on...
];

export default class MyCard extends React.Component {

    timer = ""
    state = {
        page: 1,
        pageSize: 10,
        visible: false,
        //放大的视图
        src: "",
        name: "",
        id: "",
        //日志列表
        data: []
    }
    //已经发送过命令的ID列表
    hasGetList = []

    handleCheck = (e, id) => {
        const { onChecked, devices } = this.props
        devices.forEach(v => {
            if (v.id == id) {
                v.checked = e.target.checked
            }
        })
        //深拷贝回调
        onChecked(JSON.parse(JSON.stringify(devices)))
    }

    // handlePage = (page, pageSize) => {
    //     this.setState({
    //         page, pageSize
    //     })
    //     this.sendData({ type: "getPic", data: devices.slice((page - 1) * pageSize, page * pageSize).map(v => v.id) })
    // }

    sendData = (data, dis) => {
        const { sendFunc } = this.props
        sendFunc(data, dis)
    }

    handleAmplification = (value) => {
        if (getLocalPic(value.id)) {
            this.setState({ visible: true, ...value, src: getLocalPic(value.id) }, () => {
                this.getLogs(value.id, 10)
            })

        } else {
            message.error("没有可以预览的截图！")
        }
    }

    refresh = (e, id) => {
        e.stopPropagation()
        this.getPic(id)
    }


    componentDidMount() {
        this.timer = setInterval(() => {
            const { devices } = this.props
            if (devices.length) {
                for (let i = 0; i < devices.length; i++) {
                    if (devices[i].src == undefined) {
                        //是否已经发送过命令
                        if (this.hasGetList.indexOf(devices[i].id) == -1) {
                            this.hasGetList.push(devices[i].id)
                            this.getPic(devices[i].id)
                            break;
                        }
                    }
                }
            }
        }, 200)
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    getPic = (id) => {
        this.sendData({ codeType: "device", cmd: "getSnapshot" }, { group: "phone", id: id })
    }

    getLogs = (id, limit) => {
        const { visible } = this.state
        if (!visible) return
        getLogs(id, limit).then(res => {
            console.log("Res", res)
            if (res && res.succes) {
                this.setState({ data: res.data })
            }
        })
    }

    handleDevice = (group, ids, add) => {
        //add 为true是在分组中添加 false是删除
        const { handleDevice } = this.props
        handleDevice(group, ids, add)
    }

    //处理显示消息
    handleDescription = (value) => {
        let text = ""
        //刚开始连接设备的时候没有data段
        if (value.data) {
            var msgType = value.data.msgType;
            if (msgType && (msgType == "string" || msgType == "number" || msgType == "boolean")) {
                text = value.data.retMsg
                if (value.data.cmd == "ret_runTerminalCmd") {
                    let str = value.data.retMsg
                    text = str.replace(/\n/g, "\r\n")
                }
            } else {
                text = JSON.stringify(value.data.retMsg)
            }
        }
        return <Tooltip title={text}>
            <span>{text}</span>
        </Tooltip>
    }

    rowRenderer=({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    })=> {
        const { devices, currentGroup } = this.props
        let value = devices[index]
        console.log('@@@',value,key,index)
        return (
            <Card key={value.id}
                style={{ width: 165, marginTop: "5px", marginLeft: "5px", marginRight: "5px" }}
                cover={
                    <div onClick={() => { this.handleAmplification(value) }}>
                        <div className={styles.iconList} onClick={(e) => { e.stopPropagation() }}>
                            <ReloadOutlined className={styles.icon} onClick={(e) => this.refresh(e, value.id)} />
                            <Popover placement="right" title={"添加至分组"} content={getGroup().filter(v => v.type == 2).map(v => <div key={v.name} style={{ cursor: "pointer" }} onClick={() => { this.handleDevice(v, [value.id], true) }}>{v.name}</div>)} trigger="click">
                                <PlusOutlined className={styles.icon} />
                            </Popover>
                            <Popconfirm
                                title="确定从该分组中删除此设备吗？"
                                placement="right"
                                onConfirm={() => { this.handleDevice(currentGroup, [value.id], false) }}
                                okText="是的"
                                cancelText="再想想"
                            >
                                <CloseOutlined className={styles.icon} />
                            </Popconfirm>,
                    </div>
                        {getLocalPic(value.id) ? <img
                            style={{ width: 160, height: 280 }}
                            alt="屏幕截图"
                            src={getLocalPic(value.id)}
                        /> : <div style={{ width: 160, height: 280, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                未获取截图
                        </div>
                        }
                    </div>
                }>
                <Meta
                    title={<Checkbox checked={value.checked} onClick={(e) => { this.handleCheck(e, value.id) }}>{value.name}</Checkbox>}
                    description={this.handleDescription(value)}
                />
            </Card>
        );
    }

    render() {
        const { devices, currentGroup } = this.props
        const { page, pageSize, src, name, id, visible, data } = this.state
        return (
            <div className={styles.cardContainer}>
                <div className={styles.cards}>
                    {/* 虚拟列表优化性能 TODO */}
                    {/* {
                        devices.length ? <List
                            width={1000}
                            height={1000}
                            rowHeight={100}
                            rowCount={devices.length}
                            rowRenderer={this.rowRenderer}
                        /> : null
                    } */}

                    {
                        devices.map(value => {
                            return <Card key={value.id}
                                style={{ width: 165, marginTop: "0.3rem", marginLeft: "0.3rem", marginRight: "0.3rem" }}
                                cover={
                                    <div onClick={() => { this.handleAmplification(value) }}>
                                        <div className={styles.iconList} onClick={(e) => { e.stopPropagation() }}>
                                            <ReloadOutlined className={styles.icon} onClick={(e) => this.refresh(e, value.id)} />
                                            <Popover placement="right" title={"添加至分组"} content={getGroup().filter(v => v.type == 2).map(v => <div key={v.name} style={{ cursor: "pointer" }} onClick={() => { this.handleDevice(v, [value.id], true) }}>{v.name}</div>)} trigger="click">
                                                <PlusOutlined className={styles.icon} />
                                            </Popover>
                                            <Popconfirm
                                                title="确定从该分组中删除此设备吗？"
                                                placement="right"
                                                onConfirm={() => { this.handleDevice(currentGroup, [value.id], false) }}
                                                okText="是的"
                                                cancelText="再想想"
                                            >
                                                <CloseOutlined className={styles.icon} />
                                            </Popconfirm>,
                                        </div>
                                        {getLocalPic(value.id) ? <img
                                            style={{ width: 160, height: 280 }}
                                            alt="屏幕截图"
                                            src={getLocalPic(value.id)}
                                        /> : <div style={{ width: 160, height: 280, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                未获取截图
                                            </div>
                                        }
                                    </div>
                                }>
                                <Meta
                                    title={<Checkbox checked={value.checked} onClick={(e) => { this.handleCheck(e, value.id) }}>{value.name}</Checkbox>}
                                    description={this.handleDescription(value)}
                                />
                            </Card>
                        })
                    }
                </div>
                {devices.length && currentGroup.type == 2 ? <Button type="primary" danger onClick={() => { this.handleDevice(currentGroup, devices.filter(v => v.checked).map(v => v.id), false) }}>移除勾选设备</Button> : null}
                {/* <Pagination defaultCurrent={1} total={devices.length} onChange={this.handlePage} /> */}
                <Modal
                    title={name}
                    visible={visible}
                    onCancel={() => { this.setState({ visible: false }) }}
                    footer={null}
                    width={'800px'}
                >
                    <div className={styles.modalContainer}>
                        <img src={src} style={{ width: "320px", height: "560px" }}></img>
                        <ul style={{ width: "auto", height: "560px", overflow: "auto" }}>
                            {data && data.length ? data.map((v) => {
                                return <li>{v.data}</li>
                            }) : null}
                        </ul>
                    </div>

                </Modal>
            </div>
        );
    }
}
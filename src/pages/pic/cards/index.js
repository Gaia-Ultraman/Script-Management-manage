import React, { Component } from "react";
import { Checkbox, Card, Pagination, Modal, message,Tooltip  } from "antd"
import { ReloadOutlined } from "@ant-design/icons"
import styles from "./index.less"
const { Meta } = Card

export default class MyCard extends React.Component {

    timer=""
    state = {
        page: 1,
        pageSize: 10,
        visible: false,
        //放大的视图
        src: "",
        name: ""
    }
    //已经发送过命令的ID列表
    hasGetList=[]

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

    handlePage = (page, pageSize) => {
        this.setState({
            page, pageSize
        })
        this.sendData({ type: "getPic", data: devices.slice((page - 1) * pageSize, page * pageSize).map(v => v.id) })
    }
    sendData = (data, dis) => {
        const { sendFunc } = this.props
        sendFunc(data, dis)
    }

    handleAmplification = (value) => {
        if (value.src) {
            this.setState({ visible: true, ...value })
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
                        if(this.hasGetList.indexOf(devices[i].id) ==-1){
                            this.hasGetList.push(devices[i].id)
                            this.getPic(devices[i].id)
                            break;
                        }
                    }
                }
            }
        }, 200)
    }

    componentWillUnmount(){
        this.timer && clearInterval(this.timer)
    }

    getPic = (id) => {
        this.sendData({ codeType: "device", cmd: "getSnapshot" }, { group: "phone", id: id })
    }


    render() {
        const { devices } = this.props
        const { page, pageSize, src, name, visible } = this.state
        return (
            <div className={styles.cardContainer}>
                <div className={styles.cards}>
                    {
                        devices.map(value => {
                            return <Card key={value.id}
                                style={{ width: 165, marginTop: "0.3rem", marginLeft: "0.4rem", marginRight: "0.4rem" }}
                                cover={
                                    <div onClick={() => { this.handleAmplification(value) }}>
                                        <ReloadOutlined className={styles.icon} onClick={(e) => this.refresh(e, value.id)} />
                                        {value.src ? <img
                                            style={{ width: 165, height: 200 }}
                                            alt="屏幕截图"
                                            src={value.src}
                                        /> : <div style={{ width: 165, height: 200, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                未获取截图
                                            </div>
                                        }
                                    </div>
                                }>
                                <Meta
                                    title={<Checkbox checked={value.checked} onClick={(e) => { this.handleCheck(e, value.id) }}>{value.name}</Checkbox>}
                                    // description={value.des ? value.des : ""}
                                    description={<Tooltip title={value.des ? value.des : ""}>
                                        <span>{value.des ? value.des : ""}</span>
                                    </Tooltip>
                                        
                                    }
                                />
                            </Card>
                        })
                    }
                </div>
                {/* <Pagination defaultCurrent={1} total={devices.length} onChange={this.handlePage} /> */}
                <Modal
                    title={name}
                    visible={visible}
                    onCancel={() => { this.setState({ visible: false }) }}
                    footer={null}
                >
                    <img src={src} style={{ width: "100%" }}></img>
                </Modal>
            </div>
        );
    }
}
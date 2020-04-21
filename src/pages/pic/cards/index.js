import React, { Component } from "react";
import { Checkbox, Card, Pagination, Modal, message } from "antd"
import { ReloadOutlined } from "@ant-design/icons"
import styles from "./index.less"
const { Meta } = Card

export default class MyCard extends React.Component {

    state = {
        page: 1,
        pageSize: 10,
        visible: false,
        //放大的视图
        url: "",
        name: ""
    }

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
    sendData = (data) => {
        const { sendFunc } = this.props
        sendFunc(data)
    }

    handleAmplification=(value)=>{
        message.error("没有可以预览的截图！")
        if(value.url){
            this.setState({ visible: true, url: value.url, name: value.name }) 
        }
        
    }
  
    componentWillReceiveProps(nextProps){
        const { devices } = nextProps;
        const { page, pageSize} = this.state
        if(devices.length){
            this.sendData({data:{codeType:"device",cmd:"getSnapshot"}},{group:"phone",id:devices.slice(0, page * pageSize).map(v=>v.id)})
        }
    }

    render() {
        const { devices } = this.props
        const { page, pageSize, url, name, visible } = this.state
        return (
            <div className={styles.cardContainer}>
                <div className={styles.cards}>
                    {
                        devices.map(value => {
                            return <Card key={value.id}
                                style={{ width: 165, marginTop: "0.3rem", marginLeft: "0.4rem", marginRight: "0.4rem" }}
                                cover={
                                    <div onClick={() => { this.handleAmplification(value) }}>
                                        <ReloadOutlined className={styles.icon} />
                                        {value.img ? <img
                                            style={{ width: 165, height: 200 }}
                                            alt="屏幕截图"
                                            src={value.img}
                                        /> : <div style={{ width: 165, height: 200, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                未获取截图
                                            </div>
                                        }
                                    </div>
                                }>
                                <Meta
                                    title={<Checkbox checked={value.checked} onClick={(e) => { this.handleCheck(e, value.id) }}>{value.name}</Checkbox>}
                                    description={value.des ? value.des : "This is the description"}
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
                    <img src={url} style={{ width: "100%" }}></img>
                </Modal>
            </div>
        );
    }
}
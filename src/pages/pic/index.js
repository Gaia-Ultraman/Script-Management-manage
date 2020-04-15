import React, { Component } from "react";
import { Checkbox, Button, Card} from "antd"
import { PlusOutlined } from '@ant-design/icons';
import {getGroup,setGroup,deletGroup} from "@/utils/group"
const { Meta } = Card;
const styles = require('./index.less')

export default class App extends React.Component {
    ws = null
    state = {
        tempId: new Date().getTime(),
        hasConnect: false,
        groups: [],
        //所有的设备
        allDevices: [{ id:"1025",name: "iphone", url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", lastLog: "开机" },{ id:"asds",name: "iphone", url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", lastLog: "开机" },{ id:"asd123",name: "iphone", url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", lastLog: "开机" }],
        //需要展示的设备
        showDevices:[]
    };
    componentDidMount() {
        document.title=`你的Id为：${this.state.tempId}`
        this.connect()
    }

    componentWillUnmount() {
        this.state.hasConnect && this.ws.close()
    }

    connect = () => {
        const { tempId } = this.state
        this.ws = new WebSocket(`ws://localhost:8080/manager?id=${tempId}`)
        this.ws.addEventListener('message', (event) => {
            console.log('Message from server ', event.data, this.state);
            
        });
        this.ws.addEventListener('error', (event) => {
            console.log('Error', event);
            message.error("服务器连接失败!请手动连接!")
        });

        this.ws.addEventListener('open', (event) => {
            console.log('Open', event);
            this.setState({
                hasConnect: true,
            })
            message.success("服务器连接成功!")
        });

        this.ws.addEventListener('close', (event) => {
            console.log('Close', event);
            message.info("连接已关闭!")
            this.setState({
                hasConnect: false,
            })
        });

    }


    render() {
        const { groups ,devices} = this.state
        for(let i=0;i<60;i++){
            devices.push({ name: "iphone", url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", lastLog: "开机" })
        }
        return <div className={styles.container}>
            
            <div className={styles.content}>
                <div className={styles.groupList}>
                    {groups.map((value) => {
                        return <Button>{value}</Button>
                    })}
                    <Button><PlusOutlined style={{ fontSize: 45, color: "rgba(0,0,0,0.3)" }} /></Button>
                </div>
                <div className={styles.cardContainer}>
                <Checkbox>全选</Checkbox>
                    {devices.map((value, index) => {
                        return <Card
                            hoverable
                            style={{ width: 120,height:230,margin:10 }}
                            cover={<img alt="example" src={value.url} />}
                        >
                            <Meta title={value.name} description={value.lastLog} />
                        </Card>
                    })}
                </div>
            </div>

        </div>
    }
}
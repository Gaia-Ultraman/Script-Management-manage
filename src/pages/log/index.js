import React, { Component } from "react";
import { Menu, icons ,Button,message,Input} from "antd"
import { MobileOutlined, DatabaseOutlined,SnippetsOutlined } from '@ant-design/icons';

const styles=require('./index.less')
let Mess=[]


export default class App extends React.Component {
    ws=null
    state = {
        tempId:new Date().getTime(),
        mess:[],
        hasConnect:false,
        value:""
    };
    componentDidMount(){
       this.connect()
    }

    componentWillUnmount(){
        this.state.hasConnect && this.ws.close()
    }

    connect=()=>{
        let {tempId,mess}=this.state
        this.ws=new WebSocket(`ws://localhost:8080/manager?id=${tempId}`)
        this.ws.addEventListener('message',  (event)=> {
            console.log('Message from server ', event.data,this.state);
            Mess.push(event.data)
            this.setState({
                mess:JSON.parse(JSON.stringify(Mess))
            })
        });
        this.ws.addEventListener('error',  (event)=> {
            console.log('Error', event);
            message.error("服务器连接失败!")
        });

        this.ws.addEventListener('open',  (event)=> {
            console.log('Open', event);
            this.setState({
                hasConnect:true,
            })
            message.success("服务器连接成功!")
        });

        this.ws.addEventListener('close',  (event)=> {
            console.log('Close', event);
            message.info("连接已关闭!")
            this.setState({
                hasConnect:false,
            })
        });
        
    }

    render() {
        const {mess}=this.state
        return (
            <div>
                控制台ID是 {this.state.tempId}<Button onClick={this.connect} disabled={this.state.hasConnect}>连接sokcet</Button>
                <div className={styles.flexBox}>
                <Input placeholder="发送的参数" value={this.state.value} onChange={(e)=>{this.setState({value:e.target.value})}}/>
                <Button onClick={()=>{
                    this.ws && this.ws.send(this.state.value) && message.success("消息发送成功!")
                }}>发送消息</Button>
                </div>
            <div>返回的消息体:<br></br>{mess.map(v=>(<div>{v} ---{new Date().toString()}</div>))}</div>
            </div>
            
        );
    }
}
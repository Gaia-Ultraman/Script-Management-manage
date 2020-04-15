import React, { Component } from "react";
import { Checkbox, Button, Card} from "antd"
import { PlusOutlined } from '@ant-design/icons';
const { Meta } = Card;
const styles = require('./index.less')

export default class App extends React.Component {
    state = {
        groups: ["全部设备", "自定义设备", "全部设备", "自定义设备"],
        devices: [{ name: "iphone", url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", lastLog: "开机" }]
    };


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
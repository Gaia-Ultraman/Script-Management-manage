import React, { Component } from "react";
import { Button, Modal, Input, Select, Divider, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { getGroup, deletGroup, setGroup } from "@/utils/group"
import styles from "./index.less"
const { Option } = Select
export default class Groups extends React.Component {

    state = {
        groups: getGroup(),
        currentGroup: getGroup()[0],
        visible: false,
        //表单数据
        name: "",
        type: 2,
        regs: {
            codeType: [""],
            cmd: [""],
            retMsg: [""],
            runState: [""],
            msgType: [""]
        }

    }
    //选择了分组，回调
    handleSelct = (value) => {
        const { handleBack } = this.props
        this.setState({
            currentGroup: value
        }, () => {
            handleBack(value)
        })
    }

    componentDidMount() {
        const { handleBack } = this.props
        handleBack(this.state.currentGroup)
    }

    showModal = () => {
        this.setState({
            visible: !this.state.visible
        })
    }
    handleOk = () => {
        //type 为1是正则匹配[{name:"全部",type:1,regs:{}}]     为2时为手动勾选的[{name:"例子",type:2,data:["id-1","id-2"]}];    
        const { handleBack } = this.props
        const { name, type, regs } = this.state
        let result = null
        if (type == 1) {
            result = setGroup({ name, type, regs })
        } else {
            result = setGroup({ name, type, data: devices.filter(v => v.checked).map(v => v.id) })
        }
        this.showModal()
        if (result) {
            this.setState({
                groups: result,
                currentGroup: result[0],
            }, () => { handleBack(this.state.currentGroup); message.success("操作成功!") })
        } else {
            message.success("操作失败!")
        }
    }


    render() {
        const { devices } = this.props
        const { name, type, regs, currentGroup, visible, groups } = this.state
        return (<>
            <div className={styles.groupList}>
                {groups.map((value, i) => {
                    return <Button type={currentGroup.name == value.name ? "primary" : null} key={i} onClick={() => { this.handleSelct(value) }} >{value.name}</Button>
                })}
                <Button onClick={this.showModal}><PlusOutlined style={{ fontSize: 45, color: "rgba(0,0,0,0.3)" }} /></Button>
            </div>

            <Modal
                title="编辑分组"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.showModal}
            >
                <div className={styles.container}>
                    {/* 正则表达式类型 */}
                    <div className={styles.modalLeft}>
                        <div className={styles.tip}>正则表达式筛选:</div>
                        {groups.filter(v => v.name != "全部" && v.type == 1).map(v => <span>{v.name}</span>)}
                    </div>
                    {/* 手动选择类型 */}
                    <div className={styles.modalRight}>
                        <div className={styles.tip}>手动选择:</div>
                        {groups.filter(v => v.name != "全部" && v.type == 2).map(v => <span>{v.name}</span>)}
                    </div>
                </div>
                <Divider />
                <Input className={styles.item} placeholder="请输入需分组名字！" onChange={(e) => { this.setState({ name: e.target.value }) }} />
                <Select className={styles.item} value={type} style={{ width: 180 }} onChange={(type) => { this.setState({ type }) }}>
                    <Option value={1}>正则表达式筛选</Option>
                    <Option value={2}>手动点击筛选</Option>
                </Select>
                {type == 1 ? <div>
                    {Object.keys(regs).map(key => {
                        return <div key={key} style={{paddingBottom:"5px"}}>
                            {key}:{regs[key].map((v, i) => {
                                return [<Input size="small" value={v} className={styles.regItem} onChange={(e) => { regs[key][i] = e.target.value; this.forceUpdate() }} />,
                                regs[key].length-1 == i?<a onClick={()=>{regs[key].push("");this.forceUpdate()}}>增加</a>:null]
                            })
                            }
                        </div>
                    })}
                </div>
                    :
                    <div>已勾选&nbsp;<span style={{ fontSize: "20px", color: "green" }}>{devices && devices.filter(v => v.checked).length}</span>&nbsp;台</div>}
            </Modal>
        </>
        );
    }
}





    // //==========================删除模态框==========================
    // handleOk_delete = () => {
    //     // this.setState({ visible: !this.state.visible })
    //     const { name, groups } = this.state
    //     console.log("inputValue", this.state.name)
    //     if (name == "全部") {
    //         message.error("不能删除全部分组!")
    //         return
    //     }
    //     if (groups.filter(v => v.name == name).length == 0) {
    //         message.error(`没有分组:${name}`)
    //         return
    //     }
    //     message.success("删除成功!")
    //     this.setState({
    //         currentGroup: "全部",
    //         groups: deletGroup(name),
    //         visible: !this.state.visible,
    //         checked: false,
    //     })
    // }

    // handleModal_delete = () => {
    //     this.setState({ visible: !this.state.visible })
    // }

    // handleInputName = (e) => {
    //     this.setState({ name: e.target.value })
    // }

    // //==========================添加模态框==========================
    // handleOk_add = () => {
    //     const { addName, type, reg, showDevices } = this.state
    //     console.log("OK:", addName, type, reg)
    //     let item = { name: addName, type }
    //     if (type == 1) {
    //         item.reg = reg
    //     } else {
    //         item.data = showDevices.filter(v => v.checked).map(v => v.id)
    //     }
    //     let result = setGroup(item)
    //     if (!result) {
    //         message.error("添加失败！")
    //         return
    //     }
    //     this.setState({
    //         groups: result,
    //         addVisible: false
    //     })
    //     this.handleGroup(item, true)
    // }

    // handleModal_add = () => {
    //     this.setState({ addVisible: !this.state.addVisible })
    // }

    // handleInput_add = (key, value) => {
    //     this.setState({
    //         [key]: value
    //     })
    // }

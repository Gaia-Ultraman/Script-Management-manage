import React, { Component } from "react";
import { Button, Modal, Input, Select, Divider, message } from "antd"
import { PlusOutlined, CloseCircleTwoTone } from "@ant-design/icons"
import { getGroup, deleteGroup, setGroup } from "@/utils/group"
import styles from "./index.less"
const { Option } = Select
export default class Groups extends React.Component {

    state = {
        groups: getGroup(),
        currentGroup: getGroup()[0],
        visible: false,
        //表单数据
        name: "",
        type: 1,
        addRegs: {
            codeType: [""],
            cmd: [""],
            retMsg: [""],
            runState: [""],
            msgType: [""]
        },
        deleteRegs: {
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


    //手勾选分组设备的增删
    handleDevice = (group, ids, add) => {
        console.log("删除设备", group, ids, add)
        const { handleBack } = this.props
        if (!(group.data instanceof Array)) {
            message.error('未知错误!')
            return
        }
        if (add) {
            group.data = group.data.concat(ids)
        } else {
            group.data = group.data.filter(v => {
                return ids.indexOf(v) == -1
            })
        }
        let result = setGroup(group)
        if (result) {
            this.setState({
                groups: result,
            }, () => { handleBack(group); message.success("操作成功!") })
        } else {
            message.success("操作失败!")
        }
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
    //点击OK
    handleOk = () => {
        //type 为1是正则匹配[{name:"全部",type:1}]     为2时为手动勾选的[{name:"例子",type:2,data:["id-1","id-2"]}];    
        const { handleBack, devices } = this.props
        const { name, type, addRegs, deleteRegs} = this.state
        let result = null

        if (type == 1) {
            result = setGroup({ name, type, addRegs, deleteRegs ,})
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

    //删除分组
    deleteGroup = (name) => {
        let result = deleteGroup(name)
        if (result) {
            this.setState({ groups: result })
            message.success('删除成功!')
        } else {
            message.error('删除失败!')
        }
    }

    //设置内容为当前分组
    setGroup = (group) => {
        this.setState({
            ...group
        })
    }

    render() {
        const { devices } = this.props
        const { name, type, addRegs, deleteRegs, currentGroup, visible, groups } = this.state
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
                        {groups.filter(v => v.name != "全部" && v.type == 1).map((v,i) => <div className={styles.nameItem} key={i} onClick={() => { this.setGroup(v) }} style={name == v.name ? { color: "#1890ff" } : {}}>{v.name}&nbsp;&nbsp;<CloseCircleTwoTone onClick={() => { this.deleteGroup(v.name) }} className={styles.deleteIcon} twoToneColor="#eb2f96" /></div>)}
                    </div>
                    {/* 手动选择类型 */}
                    <div className={styles.modalRight}>
                        <div className={styles.tip}>手动选择:</div>
                        {groups.filter(v => v.name != "全部" && v.type == 2).map(v => <div className={styles.nameItem} onClick={() => { this.setGroup(v) }} style={name == v.name ? { color: "#1890ff" } : {}}>{v.name}&nbsp;&nbsp;<CloseCircleTwoTone onClick={() => { this.deleteGroup(v.name) }} className={styles.deleteIcon} twoToneColor="#eb2f96" /></div>)}
                    </div>
                </div>
                <Divider />
                <Input className={styles.item} placeholder="请输入需分组名字！" value={name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                <Select className={styles.item} value={type} style={{ width: 180 }} onChange={(type) => { this.setState({ type }) }}>
                    <Option value={1}>正则表达式筛选</Option>
                    <Option value={2}>手动点击筛选</Option>
                </Select>
                {type == 1 ? <div>
                    <div style={{fontSize:"18px",marginBottom:"5px",fontWeight:'600'}}>添加设备:</div>
                    {Object.keys(addRegs).map(key => {
                        return <div key={key} style={{ paddingBottom: "5px" }}>
                            {key}:{addRegs[key].map((v, i) => {
                                return [<Input size="small" value={v} className={styles.regItem} onChange={(e) => { addRegs[key][i] = e.target.value; this.forceUpdate() }} />,
                                addRegs[key].length - 1 == i ? <a onClick={() => { addRegs[key].push(""); this.forceUpdate() }}>增加</a> : <CloseCircleTwoTone onClick={() => { addRegs[key].splice(i, 1); this.forceUpdate() }} className={styles.deleteIcon} twoToneColor="#eb2f96" />]
                            })
                            }
                        </div>
                    })}
                    <div style={{fontSize:"18px",marginBottom:"5px",fontWeight:'600'}}>移除设备:</div>
                    {Object.keys(deleteRegs).map(key => {
                        return <div key={key} style={{ paddingBottom: "5px" }}>
                            {key}:{deleteRegs[key].map((v, i) => {
                                return [<Input size="small" value={v} className={styles.regItem} onChange={(e) => { deleteRegs[key][i] = e.target.value; this.forceUpdate() }} />,
                                deleteRegs[key].length - 1 == i ? <a onClick={() => { deleteRegs[key].push(""); this.forceUpdate() }}>增加</a> : <CloseCircleTwoTone onClick={() => { deleteRegs[key].splice(i, 1); this.forceUpdate() }} className={styles.deleteIcon} twoToneColor="#eb2f96" />]
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

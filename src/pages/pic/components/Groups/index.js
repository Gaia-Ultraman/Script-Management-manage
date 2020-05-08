import React, { Component } from "react";
import { Button ,Modal} from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { getGroup, setGroup, deletGroup } from "@/utils/group"
import styles from "./index.less"

export default class Groups extends React.Component {

    state = {
        groups: getGroup(),
        currentGroup: getGroup()[0],
        visible:false
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

    showModal=()=>{
        this.setState({
            visible:!this.state.visible
        })
    }
    handleOk=()=>{
        this.showModal()
        this.setState
    }


    render() {
        const { } = this.props
        const { groups, currentGroup,visible } = this.state
        return (<>
            <div className={styles.groupList}>
                {groups.map((value, i) => {
                    return <Button type={currentGroup.name == value.name ? "primary" : null} key={i} onClick={() => { this.handleSelct(value) }} >{value.name}</Button>
                })}
                <Button onClick={this.showModal}><PlusOutlined style={{ fontSize: 45, color: "rgba(0,0,0,0.3)" }} /></Button>
            </div>
           
            {/* <Modal
                title="编辑分组"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.showModal}
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
            </Modal> */}
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

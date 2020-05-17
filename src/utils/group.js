import{zip,unzip} from "./gzip"
let version="group_v1"
//type 为1是正则匹配[{name:"全部",type:1,regs:{}}]     为2时为手动勾选的[{name:"例子",type:2,data:["id-1","id-2"]}];    
let defaultGroup=[{name:"全部",type:1,regs:{}}];
function getGroup(){
    try{
        let temp=localStorage.getItem(version)
        if(temp){
            return JSON.parse(unzip(temp))
        }else{
            localStorage.setItem(version,zip(JSON.stringify(defaultGroup)))
            return defaultGroup
        }
        
    }catch(err){
        console.log("err:",err)
        return defaultGroup
    }
}

//设置分组，已有该分组则有编辑，没有则为添加
function setGroup(obj){
    try{
        let temp=localStorage.getItem(version),groups=[];
        let key=null;
        if(temp){
            groups=JSON.parse(unzip(temp))
        }else{
            groups=JSON.parse(JSON.stringify(defaultGroup))
        }
        debugger
        groups.forEach((v,i)=>{
            if(v.name==obj.name){
                key=i
            }
        })
        if(key){
            groups[key]=obj
        }else{
            groups.push(obj)
        }
        localStorage.setItem(version,zip(JSON.stringify(groups)))
        return groups
    }catch(err){
        console.log("err:",err)
        return false
    }
}

function deletGroup(name){
    try{
        let temp=localStorage.getItem(version),groups=[]
        if(temp){
            groups=JSON.parse(unzip(temp))
            groups=groups.filter(v=>v.name!=name)
            localStorage.setItem(version,zip(JSON.stringify(groups)))
            return groups
        }else{
            throw new Error("没有可以删除的分组！");
        }
    }catch(err){
        console.log("err:",err)
        return false
    }
}

export {getGroup,setGroup,deletGroup}
import{zip,unzip} from "./gzip"
//type 为1是正则匹配， 为2时为手动勾选的   [{name:"例子",type:2,data:["id-1","id-2"]}];
let defaultGroup=[{name:"全部",type:1,reg:"/\d/g"}];
function getGroup(){
    try{
        let temp=localStorage.getItem("group")
        if(temp){
            return JSON.parse(unzip(temp))
        }else{
            localStorage.setItem('group',zip(JSON.stringify(defaultGroup)))
            return defaultGroup
        }
        
    }catch(err){
        console.log("err:",err)
        return defaultGroup
    }
}

function setGroup(obj){
    try{
        let temp=localStorage.getItem("group"),groups=[];
        if(temp){
            groups=JSON.parse(unzip(temp))
        }else{
            groups=JSON.parse(JSON.stringify(defaultGroup))
        }

        if(groups.filter(v=>v.name==obj.name).length){
            throw new Error("重复命名！");
        }
        groups.push(obj)
        localStorage.setItem('group',zip(JSON.stringify(groups)))
        return groups
    }catch(err){
        console.log("err:",err)
        return false
    }
}

function deletGroup(name){
    try{
        let temp=localStorage.getItem("group"),groups=[]
        if(temp){
            groups=JSON.parse(unzip(temp))
            groups=groups.filter(v=>v.name!=name)
            localStorage.setItem('group',zip(JSON.stringify(groups)))
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

//type 为1是正则匹配， 为2时为手动勾选的
let defaultGroup=[{name:"全部",type:1,reg:/\d/g}];
function getGroup(){
    try{
        let temp=localStorage.getItem("group")
        if(temp){

        }else{
            localStorage.setItem('group',JSON.stringify())
        }
    }catch(err){
        console.log("err:",err)
        return defaultGroup
    }
}

function setGroup(){

}

function deletGroup(){

}
export {getGroup,setGroup,deletGroup}

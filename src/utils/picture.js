let pictures=new Map()
function getLocalPic(id){
    return pictures.get(id)
}

function setLocalPic(id,data){
    pictures.set(id,data)
}

export {getLocalPic,setLocalPic}
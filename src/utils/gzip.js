import pako from "pako"
function unzip(b64Data){
    var strData   = atob(b64Data);
    // Convert binary string to character-number array
    var charData  = strData.split('').map(function(x){return x.charCodeAt(0);});
    // Turn number array into byte-array
    var binData   = new Uint8Array(charData);
    // // unzip
    var data    = pako.inflate(binData);
    // Convert gunzipped byteArray back to ascii string:
    strData   = String.fromCharCode.apply(null, new Uint16Array(data));
    return decodeURIComponent(strData);
}
function zip(str){
     var binaryString = pako.gzip(encodeURIComponent(str), { to: 'string' })
     return btoa(binaryString);
}

export {zip,unzip}
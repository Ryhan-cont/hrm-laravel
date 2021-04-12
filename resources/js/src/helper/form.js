window.createForm = function(data, form = null){
    var formData = new FormData;
    for ( var key in data) {
        var value = data[key];
        if(value == null || value == undefined){
            cleanValue = '';
            formData.append(key, cleanValue)
        }else{
            cleanValue = value;
            formData.append(key, cleanValue)
        }
    }
    return formData;
}
window.collectFile = function(data, indexing=''){
    var fileArr = {};
    for (var key in data) {
        var value = data[key];
        if(value != null && value!= undefined){
            if(key == 'hasFile'){
                for(var i=0; value.length>i; i++){
                    if(data[value[i]] != null && data[value[i]] != undefined){
                     fileArr[indexing+value[i]]=data[value[i]];                       
                    }
                }
            }else if(value.constructor.name == "Array"){
                for(var i=0; value.length>i; i++){
                    //console.log(value)
                    var returnData = collectFile(value[i], key+'.'+i+'.');
                    for(var valKey in returnData){fileArr[valKey]=returnData[valKey];}
                }
            }else if(value.constructor.name == "Object"){
                for(var valKey in returnData){fileArr[valKey]=returnData[valKey];}
            }
        }
    }
    return fileArr;
}
window.formFiles = function(data, formData){
    var fileArr = collectFile(data);
    console.log(fileArr);
    for(var valKey in fileArr){
        formData.append(valKey, fileArr[valKey]);
    }
    return formData;
}
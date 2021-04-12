import { times } from "lodash";

const mixin = {
    data(){
        return{
            errorData:{},
            btnDisabled:false,
        }
    },
    mounted(){

    },
    methods:{
        notificationAlert(response, title, color = ""){
            this.btnDisabled = false;
            let msg_title = "";
            let msg = "";

            if(response.data){
                //let color = "";
                let status_code = response.status;

                //Color and Title Generator
                if (status_code >= 100 && status_code < 200){
                    color ="warning";
                    msg_title =response.statusText;
                    if (response.data.message){
                        msg = response.data.message;
                    }else{
                        msg = 'Something is happened';
                    }
                }
                else if (status_code >= 200 && status_code < 400){
                    color ="success";
                    msg_title =response.statusText;
                    if (response.data.message){
                        msg = response.data.message;
                    }else{
                        msg = 'The action performed successfully';
                    }
                }
                else if(status_code >= 400 && status_code <600){
                    if(status_code === 401){
                        localStorage.setItem("auth", "false");
                        this.$router.push('/login');
                    }
                    if(status_code === 500){
                        msg = 'Internal server problem';
                    }
                    if (status_code === 422){
                        if (response.data.errors){
                            this.validateInput(response.data.errors);
                            var result = Object.keys(response.data.errors).map((key) => [Number(key), response.data.errors[key]]);
                            this.$store.commit('UPDATE_ERROR_DATA',response.data.errors);
                            msg = result[0][1][0];
                        }else{
                            this.validateInput(response.data.message);
                            var result = Object.keys(response.data.message).map((key) => [Number(key), response.data.message[key]]);
                            this.$store.commit('UPDATE_ERROR_DATA',response.data.message);
                            msg = result[0][1][0];
                        }
                    }else{
                        if (response.data.message){
                            msg = response.data.message;
                        }else{
                            msg = 'Something is wrong';
                        }

                    }
                    color ="danger";
                    msg_title =response.statusText;
                }

                //Title Recheck
                if (response.data.title){
                    msg_title = response.data.title;
                }
                if (title){
                    msg_title = title;
                }
            }else {
                msg = response;
                msg_title = title
            }

            //Notification fire
            this.$vs.notify({
                time:15000,
                color: color,
                title: msg_title,
                text: msg,
            })
        },

        logView(title, data){
            let status = true;
            let ttl ='';
            if (status == true){
                if (title){
                    ttl =title;
                }
                console.log(ttl,data);
            }
        },

        inputList(input, keyExt=''){
            var keyList = [];
            if(input == null || input == undefined){return keyList;}
            if(input.constructor.name != "Array" && input.constructor.name != "Object"){return keyList;}
            for(var key in input){
                var value = input[key];
                if(value == null || value == undefined){
                    if(keyExt != '' && keyExt != undefined && keyExt != null){
                        keyList.push(keyExt+''+key);
                    }else{
                        keyList.push(key);
                    }
                }else if(value.constructor.name == "Array"){
                    for(var i=0; value.length>i; i++){
                        var newKeySet = this.inputList(value[i], keyExt+key+'.'+i+'.');
                        for(var k=0; newKeySet.length>k; k++){keyList.push(newKeySet[k])}
                    }
                }else if(value.constructor.name == "Object"){
                    var newKeySet = this.inputList(value[i], keyExt+'.');
                    for(var k=0; newKeySet.length>k; k++){keyList.push(newKeySet[k])}
                }else{
                    if(keyExt != '' && keyExt != undefined && keyExt != null){
                        keyList.push(keyExt+''+key);
                    }else{
                        keyList.push(key);
                    }
                }
            }
            return keyList;
        },

        validateInput(input, ignore = []){
            // console.log('val',input)
            var keyList = this.inputList(input);
            //console.log(keyList);
            var validationField = _.cloneDeep(this.$store.state.formValidationField);
            //console.log(validationField);
            var newField = {}
            var noErr = true;
            var notification_fire = true;
            for(var key in validationField){
                var value = validationField[key];
                if(keyList.indexOf(key) > -1){
                    if(validationField[key].error == true){
                        if(!ignore.includes(key)) {
                            validationField[key].showError = true;
                            noErr = false;
                            if (notification_fire) {
                                this.$vs.notify({
                                    color: 'danger',
                                    title: 'Input Required!',
                                    text: validationField[key].message,
                                });
                                notification_fire = false;
                            }
                            //console.log(validationField[key]);
                        }

                    }
                    newField[key]=validationField[key];
                }else{
                    validationField[key].showError = false;
                    newField[key]=validationField[key];
                }
            }
            //console.log('JJJ',newField)
            this.$store.commit('UPDATE_FULL_ERROR_FIELD',newField);
            return noErr;
        },
        resetError(){
            this.$store.commit('UPDATE_ERROR_DATA',[]);
            var validationField = _.cloneDeep(this.$store.state.formValidationField);
            var newField = {};
            for(var key in validationField){
                validationField[key].resetErrIni=true;
                validationField[key].showError=false;
                newField[key]=validationField[key];
            }
            this.$store.commit('UPDATE_FULL_ERROR_FIELD',newField);
        },

        /**
         * Pop-up confirmation before action executed
         * Added by: Hasan Masud
         *
         * @param params - Selected item data
         * @param actionMethod - The method to be executed
         * @param message (optional) - Message in the Pop-up
         * @param color (optional) - Pop-up color
         * @param title (optional) - Pop-up title
         * ************************************************************/
        actionConfirm(params, actionMethod, message = 'proceed', color='danger', title = 'Confirm') {
            //console.log(params);
            this.$vs.dialog({
                type: 'confirm',
                color: color,
                title: title,
                text: `Are you sure, you want to ${message}?`,
                acceptText: 'ok',
                accept: actionMethod,
                parameters: params,
            })
        },
    }
}

//- export it as a plugin
export default {
    install (Vue, options) {
        Vue.mixin(mixin)
    }
}

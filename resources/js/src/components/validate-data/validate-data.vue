<template>
  <div class="py-1 text-sm text-red-400">
    <div v-if="laravelerror && showLaravelError">{{ laravelerror[0] | addAltName(name, altName) }}</div>
    <div v-else><div v-if="showError">{{ message | addAltName(name, altName) }}</div></div>
    <!-- <div @click="chk()">xxx</div> -->
  </div>
</template>

<script>
export default {
  name: 'validate-data',
  props:{
    value:{
      required: true,
    },
    name:{
      type: String,
    },
    altName:{
      required: false,
      default:null,
    },
    rules:{
      type: String,
    },

  },
  data(){
    return{
      message:null,
      showError:false,
      error:false,
      showLaravelError:false,
    }
  },
  mounted(){
    if(this.$store.state.formValidationField[this.name]){
      var storeData = this.$store.state.formValidationField[this.name];
      if(storeData){this.trigger(storeData)}
    }else{
      this.error = this.validate()
      this.$store.commit('UPDATE_ERROR_FIELD',{name:this.name, option:{showError:this.showError, error:this.error, message:this.message}});
    }
  },
  filters:{
    addAltName(value, name, altName){
      if(value != null && altName != null){
        var newVal = value.toString().replace(name, altName);
        return newVal;
      }else{
        return value;
      }
    },
  },
  methods:{
    chk(){
      console.log(this.name)
      console.log(this.showError)
      console.log(this.error)
      console.log(this.message)
      console.log('field error',this.$store.state.formValidationField)
      console.log('laravel error full',this.$store.state.formErrorData)
      console.log('laravel error',this.$store.state.formErrorData[this.name])
    },
    validate(){
      if(this.rules == undefined || this.rules == null || this.rules == ''){
        return true;
      }
      var ruleArr = this.rules.split("|");
      for(var i=0; ruleArr.length>i; i++){
        if(ruleArr[i].indexOf(':') > -1){
          var rulePeramArr = ruleArr[i].split(":");
          var rule = rulePeramArr[0];
          var peram = rulePeramArr[1];
        }else{
          var rule = ruleArr[i];
          var peram = null;
        }

        //Required
        if(rule == 'required'){
          if(this.value == undefined || this.value == null || this.value == ''){
            this.message = 'The '+this.name+' field is required.'
            return true;
          }
        }

        //MAX
        if(rule == 'max'){
          if(this.value != undefined && this.value != null){
            if(this.value.length>peram){
              this.message = 'The '+this.name+' field must be less then '+peram+' charecters.'
              return true;              
            }

          }
        }

        //Email
        if(rule == 'email'){
          if(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.value.trim()) == false){
              this.message = 'The '+this.name+' is not valid.'
              return true;  
          }
        }

        //Integer
        if(rule == 'integer'){
          if(isNaN(this.value)){
              this.message = 'The '+this.name+' must be a number.'
              return true;  
          }
        }
        
      }
      this.message=null;
      return false;
    },
    trigger(storeData){
        this.message=storeData.message;
        this.showError=storeData.showError;
        this.error=storeData.error;
    }
  },
  computed:{
    laravelerror: function(){
      this.showLaravelError=true;
      return this.$store.state.formErrorData[this.name];
    },
  },
  watch:{
    value: function (){
      var storeData = this.$store.state.formValidationField[this.name];
      this.error = this.validate();
      this.showLaravelError = false;

      if(storeData.resetErrIni){
        this.showError = false;
        this.$store.commit('UPDATE_ERROR_FIELD',{name:this.name, option:{showError:this.showError, error:this.error, message:this.message}});
      }else{
        this.showError = true;
        this.$store.commit('UPDATE_ERROR_FIELD',{name:this.name, option:{showError:this.showError, error:this.error, message:this.message}});
      }
    },
    '$store.state.formValidationField': function(){
      var storeData = this.$store.state.formValidationField[this.name];
      if(storeData){this.trigger(storeData)}else{}
    }
  }
}
</script>

<style>
</style>

<template>
  <div class="main-window">
      <h1>welcome</h1>
      <p>enter your name</p>
      <input type="text" class="answer" @change="setUserName($event.target.value)" @keypress="validate($event.target.value)">
      <br>
      <router-link :to="{name:'board'}" v-if="visable" >
        <button class="btn" >start</button>
      </router-link>
  </div>
</template>

<script>

import {mapActions,mapGetters} from 'vuex'




export default {
  name: 'main-window',

  data(){
return{
  name:'',
  visable:false

 
}
  },
  methods:{
    validate:function(e){
      if(e.length>0){
        return this.visable = true
      }
    },
    getName:function(userName){
      console.log(userName)
      this.btnVisable = true
  return this.name = userName

    },
    setHistory(){
    if( !JSON.parse(localStorage.getItem('history'))){
      
      return localStorage.setItem('history', JSON.stringify([]));

}
    }
    ,
      ...mapActions(['setUserName']),
  
    
  },
   computed:{
  ...mapGetters(['getName'])
  },
  mounted(){
   this.setHistory()
  }
  }


</script>

<style>
.main-window{
   padding-top: 150px;
   height: 98vh;
}
h1{
  font-size: 40px;
 
}
.answer{
  margin-bottom: 20px;
  border: 2px solid white;
padding: 10px 40px;
background: transparent;
color: white;
font-size: 20px;
}
</style>
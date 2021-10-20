<template>
<div class="statistic">
  <h1>Last games</h1>
  <table>
    <tr>
      <th>name:</th>
      <th>score:</th>
       <th>amount:</th>
      <th>correct:</th>
      <th>inCorrect:</th>
    </tr>
    <tr v-for="data in history"  :key="history.indexOf(data)">
 <td>{{data.name}}</td>
<td>{{data.score}}</td>
<td>{{data.amount}}</td>
<td>{{data.correct}}</td>
<td>{{data.inCorrect}}</td>
    </tr>   
  </table>

<router-link :to="{name:'board'}">  
<button class="btn" >back</button>
</router-link>
<br>
<button class="btn" @click="clear()">clear statistic</button>


</div>
</template>

<script>


export default {
  name: 'statistic',
    data(){
    return {
     history:[]
    }
  },
  methods:{
    setStatistic:function(){
     this.history = JSON.parse(localStorage.getItem('history'))
     
       },
       clear(){
       
        localStorage.removeItem('history')}
  },
  mounted(){
    setInterval(()=>{
      this.setStatistic()
    },10)

  }
  
}
</script>

<style>
.statistic{
padding-top: 100px;

}

.btn{
    padding: 10px 40px;
    background: transparent;
    color: white;
    border: 2px solid white;
    font-weight: bold;
    margin:10px 0;

}
table{
  width: 80%;
  margin: 0 auto;
}
th,td,tr{
  border:1px solid white;
  padding: 10px 20px;
}
@media (min-width: 300px) and (max-width: 400px) { 
 
th,td,tr{
  padding: 2px 4px;
}


  }

</style>
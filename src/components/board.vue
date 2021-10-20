<template>
<div>
  <header>
 <p>name:{{this.name}}</p>
<p>score:{{this.score}}</p>
<p>amount:{{this.amount}}</p>
<p>correct:{{this.correct}}</p>
<p>incorrect:{{this.inCorrect}}</p>
<router-link :to="{name:'main'}">  
<button @click="addHistory()">exit</button>
</router-link>

    <router-link :to="{name:'statistic'}">
       <button>Statistic</button>
       </router-link>
   
  </header>
    <div class="board">
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
    <CategoryBox />
  </div>
</div>
</template>

<script>
import CategoryBox from '@/components/CategoryBox'

export default {
  name: 'board',
  components: {
    CategoryBox
  },
  data(){
    return {
      name:'',
      score:null,
      correct:null,
      inCorrect:null,
      amount:null,
      history:[]
    }
  },
  methods: {
    setResult:function(){
    this.name = JSON.parse(localStorage.getItem('name'))
      this.score = JSON.parse(localStorage.getItem('score'))
       this.correct = JSON.parse(localStorage.getItem('correct'))
          this.inCorrect = JSON.parse(localStorage.getItem('inCorrect'))
           this.amount = JSON.parse(localStorage.getItem('amount'))
    },
    addHistory() {
      const  newHistory = {
       name:this.name,
        score:this.score,
        amount:this.amount,
        correct:this.correct,
        inCorrect:this.inCorrect
      }
     this.history = JSON.parse(localStorage.getItem('history'))
      console.log(this.history)
      this.history.push(newHistory);
      this.saveHistory();
      localStorage.removeItem('name')
      localStorage.removeItem('score')
      localStorage.removeItem('correct')
      localStorage.removeItem('inCorrect')
       localStorage.removeItem('amount')
    },
    saveHistory() {
      const parsed = JSON.stringify(this.history);
      localStorage.setItem('history', parsed);
      }
  },
  mounted(){
    setInterval(()=>{
      this.setResult()
    },50)


  }
}
</script>

<style>
[v-cloak] {
  display: none;
}

.board {

  text-align: center;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 5px;
  background: rgb(250, 249, 249);
}

header{
  display: flex;
  justify-content: space-between;
  background: #737fda;
  padding: 10px 10px;
  font-weight: bold;
  font-size: 20px;
  align-items: center;
  border-bottom: 5px solid #fff;
}
button{
  background: transparent;
  color: white;
  border: 2px solid white;
}
@media (min-width: 300px) and (max-width: 400px) { 
  .board{
     display: flex;;
flex-direction: column;
  }
  header{
    flex-direction: column;

  }



  }


</style>
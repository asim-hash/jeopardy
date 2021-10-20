<template>

    <div class="clue-container">
      <div class="clue-value" v-bind:class="colorChange()" v-if="clue.nothingVisible === false" @click="showModal(clue)">
        <p>
          ${{ clue.value }}
        </p>
      </div>
      <modal v-show="clue.isModalVisible" @close="closeModal">
        <div class="clue-content"  v-if="clue.questionVisible === true && clue.answerVisible === false">
          <p v-bind:class="colorChange()" class="time">{{this.time}}</p>
          <p class="clue-content">
            {{ clue.question }}?
            <br>
            <input type="text" v-bind:class="colorChange()"   class="answer" @change="checkAnswer($event.target.value)">
            <br>
            <button class="btn" @click="showAnswer(clue)">ok</button>
          </p>
        </div>
        <div class="clue-content" v-if="clue.answerVisible === true && clue.nothingVisible === false" @click="closeModal(clue)">
          <p v-cloak>
            {{ clue.answer }}
          </p>
        </div>
      </modal>

      <div class="clue-content" v-if="clue.nothingVisible === true"></div>
    </div>

</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'ClueBox',
  components: {
    Modal
  },
  props: [
    'clue'
  ],
  data(){
   return{
    score:null,
    correct:null,
    inCorrect:null,
    time:60,
    answer:null,
    amount:0,
   }
  },

  methods: {
   
    showAnswer (clue) {
      clue.answerVisible = true
      this.$forceUpdate()
   this.amount = JSON.parse(localStorage.getItem('amount'))+1
    
    },
    showModal (clue) {
      clue.isModalVisible = true
      clue.questionVisible = true
      this.$forceUpdate()
      console.log(this.clue.answer)
      setInterval(()=>{
      while(this.time>0){
        return this.time--
      }
      },1000)
    
    },
    colorChange(){
if(this.answer ===false){
  return 'red'
}
if(this.answer ===true){
  return 'green'
}

  if(this.time ===0){
  
       return 'red'
     }
    },
    
    closeModal (clue) {
      clue.isModalVisible = false
      clue.nothingVisible = false
      this.$forceUpdate()
       this.setAmount(this.amount) 
    },
  
    checkAnswer(val){
       this.answer = val===this.clue.answer
     if(!this.answer || this.time<1){
        this.score = JSON.parse(localStorage.getItem('score'))-this.clue.value 
    this.inCorrect = JSON.parse(localStorage.getItem('inCorrect'))+1
    this.sendIncorect()
    this.setScore(this.score) 
     }else{
        this.score =  JSON.parse(localStorage.getItem('score'))+this.clue.value 
       this.correct = JSON.parse(localStorage.getItem('correct'))+1
       this.sendCorrect()
       this.setScore(this.score)
      
     }
     
    },
    sendCorrect(){
    
       let parsedCorrect = JSON.stringify(this.correct);
      localStorage.setItem('correct', parsedCorrect);
   
    },
    sendIncorect(){
  
      let parsedInCorrect = JSON.stringify(this.inCorrect);
      localStorage.setItem('inCorrect', parsedInCorrect);
    },
    setScore(score){
      let parsedScore = JSON.stringify(score);
      localStorage.setItem('score', parsedScore);
    },
     setAmount(amount){
      let parsedAmount = JSON.stringify(amount);
      localStorage.setItem('amount', parsedAmount);
    }
  
    
  },
 
}
</script>


<style scoped>
.clue-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.clue-value {
  font-weight: 900;
  color: #d69f4c;
  font-size: 3rem;
  text-shadow: 7px 7px 2px rgb(3, 3, 3);
  cursor: pointer;
  
}
.clue-value.red{
  color: red;
   pointer-events: none;
}
.clue-value.green{
  color: green;
   pointer-events: none;
}
.clue-content {
  font-family: 'Libre Baskerville', serif;
  font-weight: 700;
  font-size: 4rem;
  text-transform: uppercase;
  text-shadow: 3px 3px 2px rgb(3, 3, 3);
  cursor: pointer;
}
.answer{
border: 2px solid white;
padding: 10px 40px;
background: transparent;
color: white;
font-size: 20px;
}
.answer.red{
  border:1px solid red;
  pointer-events: none;
}
.time.red{
  color: red;
}
.btn{
  border: 2px solid white;
padding: 10px 40px;
background: transparent;
color: white;
font-size: 20px;
}
@media (min-width: 300px) and (max-width: 400px) { 
 
.clue-content{
  font-size: 1rem;
}


  }
</style>

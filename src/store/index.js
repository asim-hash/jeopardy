import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        name:'',
        score:0,
        questions:[],
        correct:0,
        inCorrect:0,
    },
    mutations:{
       SET_DATA:(state,questions)=>{
           state.questions = questions
       },
       SET_NAME:(state,name)=>{
        state.name = name
    },
    SET_SCORE:(state,score)=>{
        state.score = score
    },
    SET_CORRECT:(state,correct)=>{
        state.correct = correct
    },
    SET_INCORRECT:(state,inCorrect)=>{
        state.inCorrect = inCorrect
    }

    },
    getters:{
        getData(state){
            return state.questions

        },
        getName(state){
        return state.name
        },
        getScore(state){
            return state.score
            },
     getCorrect(state){
                return state.correct
                   },
                   getInCorrect(state){
                    return state.inCorrect
                       }
    }
    ,
    actions:{
       async getAllData({commit}){
            try{
             let res = await axios.get('https://jservice.io/api/clues')
                commit('SET_DATA',res.data)
                let parsed = JSON.stringify(this.state.questions);
                localStorage.setItem('questions', parsed)
                console.log(res.data)

            }catch(e){
                console.log('error')
            }
            
          },
          setUserName({commit},name){
              commit('SET_NAME',name)
              let parsed = JSON.stringify(this.state.name);
              localStorage.setItem('name', parsed)
          },
          setScore({commit},score){
            commit('SET_SCORE',score)
            let parsed = JSON.stringify(this.state.score);
            localStorage.setItem('score', parsed);
        }
        ,
          setCorrect({commit},correct){
            commit('SET_CORRECT',correct)
            let parsed = JSON.stringify(this.state.correct);
            localStorage.setItem('correct', parsed);
        }    ,
        setInCorrect({commit},inCorrect){
          commit('SET_INCORRECT',inCorrect)
          let parsed = JSON.stringify(this.state.inCorrect);
          localStorage.setItem('inCorrect', parsed);
      }
    }
})
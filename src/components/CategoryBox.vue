<template>

  <section>
    <h1>{{ categories.title }}</h1>
    <div class="clue" v-for="clue in uniqueClues" :clue="clue" :key="clue.id">
      <ClueBox :clue="clue" />
    </div>

  </section>
</template>

<script>
import axios from 'axios'
import ClueBox from '@/components/ClueBox'
export default {
  name: 'CategoryBox',
  components: {
    ClueBox
  },
  data () {
    return {
      clue: {},
      categories: []
    }
  },
  computed: {
    uniqueClues: function () {

      this.categories.clues.map(function (clue) {
        const increaseDate = new Date('2001-11-26T12:00:00.000Z')
        const airdate = new Date(clue.airdate)
        if (airdate < increaseDate) {
          clue.value = clue.value * 2
        } else {
          return clue.value
        }
      })
      // remove duplicate values
      const uClues =
       this.categories.clues.reduce((acc, current) => {
         const x = acc.find(item => item.value === current.value)
         if (!x) {
           return acc.concat([current])
         } else {
           return acc
         }
       }, [])
       // remove clues with empty or invalid values
      const filteredClues =
            uClues
              .filter(item => item.value !== null)
              .filter(item => item.value !== 0)
              .filter(item => item.question !== '')
              .filter(item => item.invalid_count !== 1)
      // sort by value, least to highest
      const sortedClues =
            filteredClues
              .sort((a, b) => a.value - b.value)
      const addVisible =
            sortedClues.map(item => ({ ...item, answerVisible: false, questionVisible: false, nothingVisible: false, isModalVisible: false }))
      return addVisible
    }
  },
  created () {
    this.getCategories()
    console.log(this.categories.title)
  
  },
  beforeUpdate () {
    if (this.uniqueClues.length !== 5) {
      this.getCategories()
    }
  },
  methods: {
    getCategories () {
      const self = this
      // category id's range from 1 to 18418
      const randomId = Math.round(Math.random() * 18418)
      const url = 'https://jservice.io//api/category.json'
      axios
        .get(url + '?id=' + randomId)
        .then(response => (self.categories = response.data))

    }
  }
}
</script>


<style scoped>
section {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 2px;
  background: rgb(243, 241, 241);

}
h1 {
  background: #737fda;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 10px;
  padding: 1rem;
  text-shadow: 2px 2px 1px rgb(3, 3, 3);
}
.clue {
  background: #737fda;
  
}
@media (min-width: 300px) and (max-width: 400px) { 
  section{
     display: flex;;
flex-direction: column;
  }


 }
</style>

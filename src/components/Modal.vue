<template>
<transition name="modal-fade">
  <div class="modal">
    <!-- <div class="modal"> -->
      <slot></slot>
    <!-- </div> -->
  </div>
</transition>
</template>

<script>
export default {
  name: 'Modal',

  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #737fda;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 12rem;
  }

</style>

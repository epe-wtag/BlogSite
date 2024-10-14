<template>
  <div>
    <div v-if="error">
      <p>Error occurred: {{ errorMessage }}</p>
      <button @click="retry">Retry</button>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      errorMessage: '',
    };
  },
  methods: {
    retry() {
      this.error = null;
      this.errorMessage = '';
      this.$forceUpdate(); 
    },
  },
  errorCaptured(error, vm, info) {
    this.error = error;
    this.errorMessage = `An error occurred: ${info}`;
    return false; 
  },
};
</script>

<style scoped>
p {
  color: red;
}
button {
  margin-top: 10px;
}
</style>

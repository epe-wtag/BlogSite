<template>
  <div>
    <div v-if="error">
      <slot name="error-message">
        <p>Error occurred: {{ errorMessage }}</p>
      </slot>
      <button @click="retry">Retry</button>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Error,
      default: null,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      internalError: null,
    };
  },
  watch: {
    error(newError) {
      if (newError) {
        this.internalError = newError;
      }
    },
  },
  methods: {
    retry() {
      this.internalError = null;
      this.$emit('retry');
    },
  },
  errorCaptured(error, vm, info) {
    this.internalError = error;
    this.$emit('error-captured', `An error occurred: ${info}`);
    return false;
  },
};
</script>

<style scoped>
p {
  color: red;
  padding: 10px;
  border: 1px solid red;
  border-radius: 5px;
  background-color: #ffe6e6;
}
button {
  margin-top: 10px;
}
</style>

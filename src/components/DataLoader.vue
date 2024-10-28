<template>
  <div class="loader-overlay">
    <div class="loader">
      <div class="spinner"></div>
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.loader-overlay {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 4, 7, 0.8); 
  display: flex; 
  justify-content: center;
  align-items: center;
  z-index: 999; 

  .loader {
    display: flex;
    flex-direction: column; 
    align-items: center; 
    font-size: 24px; 
    color: #eef0fc; 

    .spinner {
      border: 8px solid rgba(255, 255, 255, 0.3); 
      border-top: 8px solid #eff0f5; 
      border-radius: 50%; 
      width: 40px; 
      height: 40px; 
      animation: spin 1s linear infinite; 
      margin-bottom: 16px; 
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg); 
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

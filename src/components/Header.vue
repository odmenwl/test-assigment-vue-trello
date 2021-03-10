<template>
    <header class="app-header">
      <div class="app-header-container">
        <span class="app-header__title">Trello</span>
      </div>
    </header>
</template>

<script>
export default {
name: "Header"
}
</script>

<style scoped>
  .app-header {
    position: fixed;
    top: 0;
    background: cornflowerblue;
    width: 100%;
    padding: 10px;
    height: 40px;
  }
  .app-header-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .app-header__title {
    font-size: 36px;
    color: #ffffff;
  }
</style>

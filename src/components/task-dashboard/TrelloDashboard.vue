<template functional>
  <div class="trello-dashboard-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TrelloDashboard'
}
</script>

<style scoped>
  .trello-dashboard-container {
    display: flex;
    flex-wrap: wrap;
    padding: 50px 30px;
  }
</style>

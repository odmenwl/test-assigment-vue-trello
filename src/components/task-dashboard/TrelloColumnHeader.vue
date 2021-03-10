<template>
  <div class="trello-column-header">
    <span class="trello-column-header__title">{{ text }} {{length}}</span>
  </div>
</template>

<script>
export default {
  name: "TrelloColumnHeader",
  props: ['text', 'length']
}
</script>

<style scoped>
  .trello-column-header {
    padding: 10px;
  }
  .trello-column-header__title {
    color: #172b4d;
    font-weight: 500;
  }
</style>

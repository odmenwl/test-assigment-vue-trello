<template>
  <div class="trello-card">
    <div class="trello-card-title">
      <span class="trello-card__title">
        {{ task.title }}
      </span>
    </div>
    <div class="trello-card-description">
      <span class="trello-card__description">
        {{ task.description }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrelloCard',
  props: ['task']
}
</script>

<style scoped>
.trello-card {
  background-color: #ffffff;
  box-shadow: 0 1px 0 rgba(0,0,0,0.2);
  border-radius: 3px;
  padding: 10px;
  margin: 10px 5px;
  cursor: move;
  z-index: 20;
}
.trello-card__title {
  color: #172b4d;
  font-size: 18px;
}
.trello-card-title {
  margin-bottom: 10px;
}
.trello-card__description {
  font-size: 14px;
}
</style>

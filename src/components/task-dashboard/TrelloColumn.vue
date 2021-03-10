<template>
  <div class="trello-column">
    <TrelloColumnHeader :length="tasks.length" :text="text" />
    <TrelloColumnList
        :state="id"
    >
      <TrelloCard
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
      />
    </TrelloColumnList>
  </div>
</template>

<script>

import TrelloColumnList from '@/components/task-dashboard/TrelloColumnList';
import TrelloCard from '@/components/task-dashboard/TrelloCard';
import TrelloColumnHeader from '@/components/task-dashboard/TrelloColumnHeader';
export default {
  name: 'TrelloColumn',
  components: {TrelloColumnHeader, TrelloCard, TrelloColumnList},
  props: ['id', 'text', 'color', 'tasks']
}
</script>

<style scoped>
  .trello-column {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    min-height: 400px;
    margin-right: 50px;
    background-color: #ebecf0;
    border-radius: 10px;
  }
  .trello-column:last-child {
    margin-right: 0;
  }
</style>

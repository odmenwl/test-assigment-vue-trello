<template>
  <div>
    <Header />
    <main class="app-main">
      <TrelloDashboard v-if="this.todoTasks.length || this.inProgressTasks.length || this.completedTasks.length">
        <TrelloColumn
          v-for="({ id, color, text }, index) in taskColumns"
          :key="index"
          :id="id"
          :color="color"
          :text="text"
          :tasks="getTasks(id)"
        />
      </TrelloDashboard>
      <div v-else>
        <span>Loading...</span>
      </div>
    </main>
  </div>
</template>

<script>

import Header from '@/components/Header';
import TrelloDashboard from '@/components/task-dashboard/TrelloDashboard';
import TrelloColumn from '@/components/task-dashboard/TrelloColumn';
import {TASK_CARD_STATE, TASK_CARD_STATE_LIST} from '@/utils/task-card-state';
export default {
  name: 'Trello',
  components: {TrelloColumn, TrelloDashboard, Header},
  computed: {
    todoTasks() {
      return this.$store.getters.todoTasks
    },
    inProgressTasks() {
      return this.$store.getters.inProgressTasks
    },
    completedTasks() {
      return this.$store.getters.completedTasks
    },
    taskColumns() {
      return Object.values(this.taskCardStateList)
    }
  },
  async mounted() {
    if (!this.todoTasks.length && !this.inProgressTasks.length && !this.completedTasks.length) {
      await this.$store.dispatch('fetchTasks');
    }
  },
  data: () => ({
    taskCardStateList: TASK_CARD_STATE_LIST
  }),
  methods: {
    getTasks: function (id) {
      switch (id) {
        case TASK_CARD_STATE.TODO: {
          return this.todoTasks;
        }
        case TASK_CARD_STATE.IN_PROGRESS: {
          return this.inProgressTasks;
        }
        case TASK_CARD_STATE.COMPLETED: {
          return this.completedTasks;
        }
      }
    }
  }
}
</script>

<style>
  .app-main {
    margin-top: 50px;
  }
  .trello-task_disabled {
    background: grey !important;
  }
  .trello-drag-container_active {
    background: lightgrey;
  }
</style>

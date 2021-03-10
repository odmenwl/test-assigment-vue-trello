<template>
  <div v-dragAndDrop:state="state" @onDrop="onDropHandler" class="trello-drag-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TrelloColumnList',
  props: ['state'],
  methods: {
    onDropHandler: function ({detail}) {
      this.$store.dispatch('dragAndDropHandler', detail);
    }
  }
}
</script>

<style scoped>
  .trello-drag-container {
    height: 100%;
    -webkit-user-drag: none;
  }
</style>

<script setup>
import ToDoEvent from './components/ToDoEvent.vue';
</script>

<template>
  <div>
    <h1>ToDo List</h1>
    <to-do-event />
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  width: 300px;
  height: 300px;
  padding: 0;
  background-color: #f0f8ff;
}

li {
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: black;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
}

li span {
  margin-right: 10px;
}
</style>


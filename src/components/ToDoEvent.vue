<template>
    <div>
      <h2>Your Tasks</h2>
      <input v-model="newTask" placeholder="Enter a task" />
      <button @click="addTask">Add Task</button>
  
      <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.name }} 
            <span v-if="task.finished">Finished</span>
            <span v-else>Not Finished</span>
          <button class="finish" @click="finishTask(task.id)">Finish</button>
          <button @click="removeTask(task.id)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabaseClient'
  
  export default defineComponent({
    name: 'TodoList',
  
    setup() {
      const tasks = ref<{ id: number, name: string, finished: boolean }[]>([])
      const newTask = ref('')
  
      const getTasks = async () => {
        const { data, error } = await supabase.from('todo_list').select()
        if (error) {
          console.error('Error fetching tasks:', error)
        } else {
          tasks.value = data
        }
      }

      const addTask = async () => {
        if (newTask.value.trim() !== '') {
            const { data, error } = await supabase
            .from('todo_list')
            .insert([{ name: newTask.value, finished: false }])
            .select()

            if (error) {
            console.error('Error adding task:', error)
            } else if (data) {
            tasks.value.push(data[0])
            newTask.value = ''
            }
        }
        }


      const removeTask = async (id: number) => {
        const { error } = await supabase.from('todo_list').delete().eq('id', id)
        if (error) {
          console.error('Error removing task:', error)
        } else {
          tasks.value = tasks.value.filter(task => task.id !== id) // Remove from local list
        }
      }

      const finishTask = async (id: number) => {
      const { data, error } = await supabase
        .from('todo_list')
        .update({ finished: true })
        .eq('id', id)
        .select()

      if (error) {
        console.error('Error finishing task:', error.message)
      } else if (data) {
        const task = tasks.value.find(task => task.id === id)
        if (task) {
            task.finished = true
        }
      }
      
    }
    

  
      onMounted(() => {
        getTasks()
      })
  
      return {
        tasks,
        newTask,
        addTask,
        removeTask,
        finishTask,
      }
    }
  })
  </script>
  
  <style scoped>
  input {
    padding: 8px;
    font-size: 14px;
  }
  span{
    margin-left: 10px;
  }
  button {
    margin-left: 10px;
    padding: 8px 12px;
    font-size: 14px;
    background-color: rgb(255, 0, 0);
    color: white;
    border: none;
    cursor: pointer;
  }

  button.finish {
    position: fixed; 
    margin-left: 10px;
    padding: 8px 12px;
    font-size: 14px;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
    right: 700px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  </style>
  
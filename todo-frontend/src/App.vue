<template>
  <div id="app">
    <h1>To-Do List</h1>

    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add a new task" />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo._id">
        {{ todo.text }}
        <button @click="deleteTodo(todo._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      todos: [],
      newTodo: ''
    };
  },
  methods: {
    async fetchTodos() {
      const res = await axios.get('http://localhost:5000/tasks');
      this.todos = res.data;
    },
    async addTodo() {
      if (!this.newTodo.trim()) return;
      const res = await axios.post('http://localhost:5000/todos', {
        text: this.newTodo,
        completed: false
      });
      this.todos.push(res.data);
      this.newTodo = '';
    },
    async deleteTodo(id) {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      this.todos = this.todos.filter(todo => todo._id !== id);
    }
  },
  mounted() {
    this.fetchTodos();
  }
};
</script>

<style>
body {
  font-family: sans-serif;
  padding: 2rem;
}
input {
  margin-right: 0.5rem;
}
</style>

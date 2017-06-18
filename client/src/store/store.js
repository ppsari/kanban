//https://medium.com/@bradfmd/vue-vuex-getting-started-f78c03d9f65
import * as firebase from 'firebase'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const config = {
  apiKey: "AIzaSyDiG_4BgiLlr8BFJdAyIaOuZ-jAsY8qKY4",
  databaseURL: 'https://kanban-553f0.firebaseio.com',
  projectId: 'kanban-553f0'
}
firebase.initializeApp(config);

const db = firebase.database()
let dbRef = db.ref('todos')
const store = new Vuex.Store({
  state: {
    todoList : []
  },
  actions: {
    getTodo: function(store) {
      store.todoList = [];
      dbRef.on('value', todoes => {
        let todoList = [];
        console.log('------------------------------------------------')
        for (let key in todoes.val())
          todoList.push(todoes.val()[key]);

        store.commit('setTodoList',todoList);
      });
    },
    updateTodo: function(store,todo) {
      // console.log('-------------------------------');
      // console.log(todo);
      db.ref(`todos/${todo.id}`).set({
        id: todo.id,
        descr: todo.descr,
        poin: todo.poin,
        user: todo.user,
        status: todo.status
      });
      // console.log('updated');
      store.dispatch('getTodo');
    },
    createTodo: function(store,todo) {
      let len = store.state.todoList.length;

      console.log(len)
      let todoId = (len === 0 ? 1: parseInt(store.state.todoList[len-1].id) +1 );
      db.ref(`todos/${todoId}`).set({
        descr: todo.descr,
        id:todoId,
        status: 'backlog',
        poin: todo.poin,
        user: todo.user
      })
      store.dispatch('getTodo');
    },
    removeTodo: function(store,todo_id) {
      db.ref(`todos/${todo_id}`).remove();
      store.dispatch('getTodo');
    },
    markTodo: function(store,todo) {
      let todo_id = todo.id;
      todo.status = 'todo';
      db.ref(`todos/${todo_id}`).set(todo)
      store.dispatch('getTodo');
    },
    markDoing: function(store,todo) {
      let todo_id = todo.id;
      todo.status = 'doing';
      db.ref(`todos/${todo_id}`).set(todo)
      store.dispatch('getTodo');
    },
    markBacklog: function(store,todo) {
      let todo_id = todo.id;
      todo.status = 'backlog';
      db.ref(`todos/${todo_id}`).set(todo)
      store.dispatch('getTodo');
    },
    markDone: function(store,todo) {
      let todo_id = todo.id;
      todo.status = 'done';
      db.ref(`todos/${todo_id}`).set(todo)
      store.dispatch('getTodo');
    }

  },
  mutations: {
    setTodoList(state,todos) {
      state.todoList = todos;
    }
  },
  getters: {
    getBacklog(state) {
      return state.todoList.filter(todo => todo.status === 'backlog')
    },
    getTodo(state) {
      return state.todoList.filter(todo => todo.status === 'todo');
    },
    getDoing(state) {
      return state.todoList.filter(todo => todo.status === 'doing');
    },
    getDone(state) {
      return state.todoList.filter(todo => todo.status === 'done');
    }
  },
  modules: {
    // The modules object provides a way to split your store in multiple stores, but allow them to all remain part of the store tree
  }
})
export default store
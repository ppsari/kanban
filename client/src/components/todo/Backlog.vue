<template>
  <div>
    Backlog
    <div style="width:90%;border:1px solid black" v-for="todo in getBacklog">
      <strong> {{ todo.descr}} </strong>
      {{todo.user}}<br/>
      {{todo.poin}}<br/>
      {{todo.status}}<br/>
      <a @click="markTodo(todo)">Todo</a><br/>
      <a @click="deleteTodo(todo.id)">Delete</a><br/>
      <a @click="editTodo(todo)">Edit</a></br>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Backlog',
    computed: {
      ...mapGetters([
        'getBacklog'
      ])
    },
    methods : {
      markTodo : function (todo) {
        this.$emit('todo',todo);
      },
      deleteTodo: function(id) {
        console.log('ceritanya dia emit')
        this.$emit('remove',id);
      },
      editTodo: function(todo) {
        console.log(todo)
        this.$emit('edit',todo)
        // console.log(this.form_todo.title)
        // this.createedit = 'EDIT';
      }
    }
  }
</script>
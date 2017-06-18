<template>
  <div>
    Todo
    <div style="width:90%;border:1px solid black" v-for="todo in getTodo">
      <strong> {{ todo.descr}} </strong><br/>
      {{todo.user}}<br/>
      {{todo.poin}}<br/>
      {{todo.status}}<br/>
      <a @click="markBacklog(todo)">Backlog</a> - <a @click="markDoing(todo)">Doing</a>  <br/>
      <a @click="deleteTodo(todo.id)">Delete</a><br/>
      <a @click="editTodo(todo)">Edit</a></br>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Todo',
    computed: {
      ...mapGetters([
        'getTodo'
      ])
    },
    methods : {
      markBacklog : function (todo) {
        this.$emit('backlog',todo);
      },
      markDoing : function (todo) {
        this.$emit('doing',todo);
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
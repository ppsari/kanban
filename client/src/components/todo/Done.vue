<template>
  <div>
    DONE
    <div style="width:90%;border:1px solid black" v-for="todo in getDone">
      <strong> {{ todo.descr}} </strong><br/>
      {{todo.user}}<br/>
      {{todo.poin}}<br/>
      {{todo.status}}<br/>
      <a @click="deleteTodo(todo.id)">Delete</a><br/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Done',
    computed: {
      ...mapGetters([
        'getDone'
      ])
    },
    methods : {
      deleteTodo: function(id) {
        console.log('ceritanya dia emit')
        this.$emit('remove',id);
      }
    }
  }
</script>
<template>
  <div>
    <div>
      <input type="text" placeholder="descr" id="txtDescr" v-model="form_todo.descr"/>
      <input type="number" placeholder="poin" id="txtPoin" v-model="form_todo.poin"/>
      <input type="text" placeholder="user" id="txtUser"  v-model="form_todo.user"/>
      <input type="submit" @click.prevent="saveTodo" :value="createedit" />
      <input type="reset" @click.prevent="reset" />
      <br/>
    </div>
    <div style="width:100%;display:inline-block">
      <backlog
        @todo="todo"
        @edit="editTodo"
        @remove="removeTodo"
        style="width:20%;"
      ></backlog>
      <todo
        @backlog="backlog"
        @doing="doing"
        @edit="editTodo"
        @remove="removeTodo"
        style="width:20%;"
      ></todo>
      <doing
        style="width:20%;"
        @done="done"
        @todo="todo"
        @edit="editTodo"
        @remove="removeTodo"
      ></doing>
      <done style="width:20%;"
        @remove="removeTodo"
      ></done>
    </div>
  </div>

</template>

<script>

  import Backlog from '@/components/todo/Backlog'
  import Todo from '@/components/todo/Todo'
  import Doing from '@/components/todo/Doing'
  import Done from '@/components/todo/Done'

  const initial_todo = {
    descr: '',
    id: null,
    user: '',
    poin: 0,
    status: 'backlog',
  }

  export default {
    components: {
      Backlog,
      Todo,
      Doing,
      Done
    },
    data() {
      return {
        form_todo : {},
        createedit: 'CREATE'
      }
    },
    created: function() {
      this.form_todo = initial_todo
      this.$store.dispatch('getTodo');
      console.log('yey');
    },
    methods: {
      reset() {
        $('#txtDescr, #txtPoin, #txtUser').val('');
        console.log('mau reset')
        this.createedit = 'CREATE';
        this.form_todo = {
          descr: '',
          id: null,
          user: '',
          poin: 0,
          status: 'backlog',
        };
        console.log(this.form_todo)
      },
      saveTodo() {
        if (this.form_todo.id !== null)
          this.$store.dispatch('updateTodo',this.form_todo);
        else
          this.$store.dispatch('createTodo',this.form_todo);

        this.reset();

        // this.$store.dispatch('getTodo', this.form_todo);

      },
      editTodo(todo) {
        this.createedit = 'EDIT';
        this.form_todo = {
          id : todo.id,
          user: todo.user,
          poin: todo.poin,
          descr: todo.descr,
          status: todo.status
        }
      },
      removeTodo(id) {
        let cfm = confirm('Are you sure to remove');
        if (cfm) this.$store.dispatch('removeTodo',id);

        this.reset();

      },
      todo(todo) {
        this.$store.dispatch('markTodo',todo)
      },
      backlog(todo){
        this.$store.dispatch('markBacklog',todo)
      },
      doing(todo){
        this.$store.dispatch('markDoing',todo)
      },
      done(todo){
        this.$store.dispatch('markDone',todo)
      }
    },

  }
</script>
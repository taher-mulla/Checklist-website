


<template>
  <div class='container' >
    <h2 class="text-center mt-5">My view todo app</h2>

<!-- INPUTS -->
  <div class="d-flex">
    <input v-model="task" type="text" placeholder="Enter Task" class="form-control">
    <button @click="submitTask" class="btn btn-warning rounded-0">Submmit</button>
    <div class="dropdown show">
      <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        All
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="dropdown-item" @click="allFunc()" href="#">All</a>
        <a class="dropdown-item" @click="completedFunc()">Completed</a>
        <a class="dropdown-item" @click="todoFunc()" href="#">In-progress</a>
      </div>
    </div>
  </div>

  <!-- todo items -->

  <table class="table table-bordered table-hover mt-5 fixed">
  <thead>
    <tr>
      <th scope="col" style="text-align:center">Tasks to-do</th>
      <th scope="col" style="text-align:center">Status</th>
      <th scope="col" class="text-centre">#</th>
      <th scope="col" class="text-centre">#</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(task, index) in tasks" :key="index">
      <td>
        <span :class="{'finished': task.status==='completed'}">
          {{task.name}}
        </span>
      </td>
      <td style="width: 10%" class="pointer" @click="changeStatusFunc(index)">{{task.status}}</td>
      <td style="width: 5%">
        <div class="text-centre pointer" @click="editTaskFunc(index)">
          <span class="fa fa-pen"></span>
        </div>
      </td>
      <td style="width: 5%">
        <div class="text-centre pointer" @click="deleteTaskFunc(index)" >
          <span class="fa fa-trash"></span>
        </div>
      </td>
    </tr>
  </tbody>
</table>



  </div>
</template>


<script>
export default {
  name:"HelloWorld",
  props: {
    msg: String,
    
  },

  data(){
    return{
      task:'',
      all: [],
      completed:[],
      todo:[],
      editTask: null,
      tasks:[
        {
          name: 'Steal banana',
          status: 'to-do'
        },
        {
          name:'eat choco',
          status: 'to-do'
        }
      ]
    }
  },

  methods:{
    submitTask(){
      console.log('submitt button pressed')
      console.log(this.task)

      if(this.task.length===0){
        this.editTask=null; 
        return ;
      }

      if(this.editTask!=null){
        this.tasks[this.editTask].name = this.task
        this.editTask=null
      }else{
        this.tasks.push({
        name: this.task,
        status: 'to-do'
        });
      }

      

      this.task=''

    },
    deleteTaskFunc(index){
      this.tasks.splice(index, 1)
    },
    editTaskFunc(index){
    this.task = this.tasks[index].name
    this.editTask=index
    },
    changeStatusFunc(index){
      if(this.tasks[index].status === 'completed' )
        this.tasks[index].status = 'to-do'
      else
        this.tasks[index].status = 'completed'
    },
    completedFunc(){
      if(this.all.length>0)
        this.tasks=this.all

      this.completed=[]
      this.tasks.forEach(element => {
        if(element.status==='completed'){
          this.completed.push({
            name: element.name,
            status: element.status
          });
        }
        
      });

      this.all=this.tasks
      this.tasks=this.completed
      console.log(this.all)
      console.log(this.tasks)
      
    },
    todoFunc(){
      if(this.all.length>0)
        this.tasks=this.all

      // console.log(this.all.length)
      // console.log(this.tasks.length)
      this.completed=[]
      this.tasks.forEach(element => {
        if(element.status==='to-do'){
          this.todo.push({
            name: element.name,
            status: element.status
          });
        }
        
      });

      this.all=this.tasks
      this.tasks=this.todo

      // console.log(this.all)
    },
    allFunc(){
      if(this.all.length>0)
        this.tasks=this.all
    }



  }
  

};
</script>


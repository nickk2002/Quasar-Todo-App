<template>
  <div class="row" style="flex-grow: 1">
    <q-page style="padding-left: 40px; padding-top: 20px; width: 100%">
      <div class="col">
        <div class="heading">Tasks & Issues</div>
        <div class="day" style="font-size:20px; padding-left: 2px; color: #ACAEAF">{{ getFormattedDate() }}</div>
      </div>
      <!--Boards-->
      <div class="row">
        <div class="board">
          <div class="image-container" style="background-color:#5B533E ">
            <q-icon name="img:/icons/rocket.svg" size="20px"
                    style="filter: invert(83%) sepia(62%) saturate(1179%) hue-rotate(318deg) brightness(99%) contrast(99%);">
            </q-icon>
          </div>
          <div class="col" style="margin-left:10px; font-size: 15px;">
            <div>Total Tasks</div>
            <div>49</div>
          </div>
        </div>
        <div class="board">
          <div class="image-container" style="background-color:#3A5B47 ">
            <q-icon name="img:/icons/done.svg" size="20px"
                    style="filter: invert(44%) sepia(82%) saturate(1073%) hue-rotate(94deg) brightness(102%) contrast(102%);">
            </q-icon>
          </div>
          <div class="col" style="margin-left:10px; font-size: 15px;">
            <div>Done Tasks</div>
            <div>
              {{ tasksDone }}<span style="color:#AAAAAA; padding-left: 2px">/{{ tasksToday }}</span>
            </div>
          </div>
        </div>
        <div class="board">
          <div class="image-container" style="background-color:#3C506F ">
            <q-icon name="img:/icons/eye.svg" size="20px"
                    style="filter: invert(12%) sepia(15%) saturate(5811%) hue-rotate(236deg) brightness(88%) contrast(102%);">
            </q-icon>
          </div>
          <div class="col" style="margin-left:10px; font-size: 15px;">
            <div>Complete rate</div>
            <div>80%</div>
          </div>
        </div>
      </div>
      <div class="tasks-today">Tasks Today</div>
      <q-btn dense flat icon="add" round @click="dialog=true; putNowDate()"/>
      <q-dialog v-model="dialog">
        <q-card class="dialog" style="max-width: 1500px;width:1000px;height:600px">
          <q-list style="padding-left: 40px; padding-top: 40px">
            <q-item style="padding-bottom: 0 !important;">
              <div class="row">
                <q-input v-model="taskTitle" :input-style="{ color: '#E3E5E5A1' }" autofocus borderless
                         class="new-task-name "
                         placeholder="Task Name"
                />
              </div>
            </q-item>
            <q-item style="height: 20px; padding-top: 0 !important;">
              <q-input borderless v-model="taskDate" :input-style="{ color: '#E3E5E5A1' }">
                <template v-slot:before>
                  <div class="event-icon">
                    <q-icon name="event" size="15px"  clickable style="margin-right: 5px;">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <div class="row">
                          <q-date color="indigo-10" v-model="taskDate" dark mask="D MMMM YYYY - HH:mm">
                          </q-date>
                          <q-time v-model="taskDate" mask="D MMMM YYYY - HH:mm" format24h>
                          </q-time>
                        </div>

                      </q-popup-proxy>
                    </q-icon>
                  </div>
                  <span style="font-size:15px; color: #78909C; ">Due date:</span>
                </template>
              </q-input>
            </q-item>

            <q-item style="padding-top: 20px;">
              <div style="font-size:20px; color: #78909C; ">Task type: <span style="color:#E3E5E5A1"> {{ taskType }} </span></div>
            </q-item>
            <q-item>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap:20px; grid-row-gap: 10px">
                <TaskType color="#78909C" text="Study" @click="taskType='Study'"></TaskType>
                <TaskType color="#9C7890" text="Music" @click="taskType='Music'"></TaskType>
                <TaskType color="#8A9C78" text="Hobby" @click="taskType='Hobby'" ></TaskType>
                <TaskType color="#3B557D" text="Swim" @click="taskType='Swim'" ></TaskType>
                <TaskType color="#5B533E" text="Cook" @click="taskType='Cook'" ></TaskType>

                <TaskType color="#B4B4B4" text="Other" @click="taskType='Other'"></TaskType>
                <div  style="width:25px; height: 25px;
                        background-color: rgba(227, 229, 229, 0.63); border-radius: 5px; display: flex; justify-content: center; align-items: center">
                  <q-icon name  ="img:/icons/add.svg" size="15px"></q-icon>
                </div>
              </div>
            </q-item>
            <q-item style="padding-top: 20px;">
              <q-input  autogrow v-model="taskDescription" :input-style="{color: '#E3E5E5A1' }" autofocus borderless
                        class="description"
                       placeholder="Description..."
              />
            </q-item>
            <q-item>
              <q-btn text-color="secondary" v-ripple v-close-popup @click="addTask">Create Task</q-btn>

            </q-item>

          </q-list>

        </q-card>
      </q-dialog>
      <q-list style="max-width: 500px;">
        <TodoTask
          :key="todo.id"
          v-for:="todo in todos"
          :todo="todo"
          @delete="completeTask"
          @duplicate="duplicateToDo">
        </TodoTask>
      </q-list>

    </q-page>
  </div>
</template>
<style lang="scss" scoped>
.heading {
  font-style: normal;
  font-weight: 400;
  color: #F7D067;
  font-size: 30px;
}

.board {
  margin-top: 30px;
  background: #303030;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
  height: 80px;
  width: 170px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 40px;
}

.board .col div:first-child {
  color: #78909C;
}

.board .col div:nth-child(2) {
  color: white;
  font-weight: 600;
}

.image-container {
  margin-left: 15px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tasks-today {
  margin-top: 40px;
  color: $secondary;
  font-size: 20px;
}

.dialog {

  background-color: #303030;
}

.new-task-name {
  font-weight: 400;
  font-size: 30px;
}
.event-icon{
  margin-bottom: 3px;
  color:#78909C;
}
.event-icon:hover{
  color: #8ea6af;
}
.description{
  font-size: 20px;
}

</style>
<script>
import {date, useQuasar} from "quasar";
import TodoTask from "../components/Task.vue"
import TaskType from "../components/TaskType"

export default ({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Todo",
  components: {
    TodoTask,
    TaskType,
  },
  beforeCreate() {
    this.id = 0;
  },
  data() {
    return {
      q: useQuasar(),
      dialog: false,
      todos: [
        {
          id: ++this.id,
          name: "Learn vue components",
          description: "Understand how they work",
          time: "16:30",
          icon: "study",
          weight: 1,
        },
        {
          id: ++this.id,
          name: "Go to the swimming pool",
          description: "Understand how they work",
          time: "16:30",
          icon: "swim",
          weight: 1,
        },
        {
          id: ++this.id,
          name: "Cook something",
          description: "Understand how they work",
          time: "16:30",
          icon: "cook",
          weight: 1,
        },
      ],
      tasksToday: 3,
      tasksDone: 0,
      taskTitle: "",
      taskType: "",
      taskDescription: "",
      taskDate: date.formatDate(Date.now(), "D MMMM YYYY - HH:mm"),
      taskWeight: 1,
    };
  },
  methods: {
    showConfirmTaskAdded() {
      this.q.notify({
        progress: true,
        message: "Added task",
        color: "white",
        textColor: "green",
        timeout: 1500,
      });
    },
    showConfirmTaskCompleted() {
      this.q.notify({
        progress: true,
        message: "Completed task!",
        color: "white",
        textColor: "green-5",
        timeout: 1500,
      });
    },
    completeTask(task) {
      const before = this.todos.length;
      this.todos = this.todos.filter(todo => todo.id !== task.id);
      if (this.todos.length < before) {
        this.tasksDone++;
      }
    },
    duplicateToDo(task) {
      let newTask = JSON.parse(JSON.stringify(task));
      newTask.name = newTask.name + " #2"
      newTask.id = ++this.id;
      this.todos.unshift(newTask);
      this.tasksToday++;
    },
    addTask() {
      this.showConfirmTaskAdded();
      this.tasksToday++;
      this.todos.push({
        id: ++this.id,
        name: this.taskTitle,
        description: this.description,
        icon: this.taskType,
        time: this.taskDate,
      });
    },
    putNowDate() {
      console.log("Putting date" + date.formatDate(Date.now(), "D/M/YYYY"));
      // this.date = date.formatDate(Date.now(),"YYYY/D/M");
    },
    getFormattedDate() {
      return date.formatDate(Date.now(), "D MMMM YYYY");
    },
  },
});
</script>

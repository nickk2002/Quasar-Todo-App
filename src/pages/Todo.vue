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
              2<span style="color:#AAAAAA; padding-left: 2px">/5</span>
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
        <q-card class="dialog">
          <q-list>
            <q-item>
              <q-input v-model="taskTitle" label="Task" outlined/>
            </q-item>
            <q-item>
              <q-input v-model="taskDescription" label="Description" outlined/>
            </q-item>
            <q-item>
              <q-input v-model="date" label="Due Date" mask="date" outlined>
                <template v-slot:append>
                  <q-icon class="cursor-pointer" name="event">
                    <q-popup-proxy cover transition-hide="scale" transition-show="scale">
                      <q-date v-model="taskDate">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup color="primary" flat label="Close"/>
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

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
    <q-page class="col"/>
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
.dialog {
  height: 600px;
  width: 800px;
}
.tasks-today{
  margin-top: 40px;
  color: $secondary;
  font-size: 20px;
}

</style>
<script>
import {date, useQuasar} from "quasar";
import TodoTask from "../components/Task.vue"

export default ({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Todo",
  components: {
    TodoTask,
  },
  beforeCreate() {
    this.id = 0;
  },
  data() {
    return {
      q: useQuasar(),
      dialog: false,
      date: date.formatDate(Date.now(), "YYYY/D/M"),
      todos: [
        {
          id: ++this.id,
          name: "Learn vue components",
          description: "Understand how they work",
          time: "16:30",
          icon: "school",
          weight: 1,
        },
        {
          id: ++this.id,
          name: "Go to the swimming pool",
          description: "Understand how they work",
          time: "16:30",
          icon: "school",
          weight: 1,
        },
        {
          id: ++this.id,
          name: "Cook something",
          description: "Understand how they work",
          time: "16:30",
          icon: "school",
          weight: 1,
        },
      ],
      taskTitle: "",
      taskDescription: "",
      taskDate: "",
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
      this.todos = this.todos.filter(todo => todo.id !== task.id);
    },
    duplicateToDo(task) {
      let newTask = JSON.parse(JSON.stringify(task));
      newTask.name = newTask.name + " #2"
      this.todos.unshift(newTask);
    },
    addTask() {
      if (this.newTaskText.length === 0) {
        return;
      }
      this.showConfirmTaskAdded();
      this.todos.push({
        id: this.id + 1,
        name: this.newTaskText,
        done: false,
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

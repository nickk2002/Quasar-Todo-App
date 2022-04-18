<template>
  <div class="row" style="flex-grow: 1">
    <q-page style="padding-left: 40px; padding-top: 20px; width: 100%">
      <div class="row">
        <div class="col-7">
          <div class="heading">Tasks & Issues</div>
          <div class="day" style="font-size:20px; padding-left: 2px; padding-top: 10px; color: #ACAEAF">
            {{ getFormattedDate() }}
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
                <div style="height: 20px">Total Tasks</div>
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
                <div style="height: 20px">Done Tasks</div>
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
                <div style="height: 20px">Complete rate</div>
                <div>80%</div>
              </div>
            </div>
          </div>
          <div class="tasks-today">Tasks Today</div>
          <q-btn dense flat icon="add" round @click="dialog=true;"/>
          <q-dialog v-model="dialog">
            <TaskDialog @addTask="addTask"/>
          </q-dialog>
          <q-dialog v-model="dialogEdit">
            <TaskDialog :task="taskToEdit" edit @editTask="editTask"/>
          </q-dialog>
          <q-list style="max-width: 500px;">
            <TodoTask
              :key="todo.id"
              v-for:="todo in sortedArray"
              :todo="todo"
              @complete="completeTask"
              @delete="deleteTask"
              @duplicate="duplicateToDo"
              @edit="putTaskToEditInVar"
              @click.self="putTaskToEditInVar(todo)"/>
          </q-list>
        </div>
        <div class="col-4" v-if="this.todos.length > 0">
          <div class="heading" style="margin-bottom: 50px;">Tasks Calendar</div>
          <div :key="calendarTodo" v-for:="calendarTodo in dayArray">
            <div class="tasks-today q-mb-md" style="margin-top: 40px">{{ calendarTodo.day }}</div>
            <q-list>
              <CalendarEntry
                :key="todo.id"
                v-for:="todo in calendarTodo.array"
                :todo="todo"/>
            </q-list>
          </div>
        </div>
      </div>
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


</style>
<script>
import {date, useQuasar} from "quasar";
import TodoTask from "../components/Task.vue"
import TaskDialog from "components/TaskDialog"
import CalendarEntry from "components/CalendarEntry"


export default ({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Todo",
  components: {
    TodoTask,
    TaskDialog,
    CalendarEntry
  },
  beforeCreate() {
    this.id = 0;
  },
  data() {
    return {
      q: useQuasar(),
      dialog: false,
      dialogEdit: false,
      todos: [
        {
          id: ++this.id,
          name: "Learn vue components",
          description: "Understand how they work",
          time: "30 May 2022 - 16:30",
          icon: "study",
          weight: 1,
        },
        {
          id: ++this.id,
          name: "Go to the swimming pool",
          description: "Understand how they work",
          time: "30 April 2022 - 18:30",
          icon: "swim",
          weight: 1,
        },
        {
          id: ++this.id,
          name: "Cook something",
          description: "Understand how they work",
          time: "30 April 2022 - 20:30",
          icon: "cook",
          weight: 1,
        },
      ],
      tasksToday: 3,
      tasksDone: 0,
    };
  },
  methods: {
    showConfirmTaskAdded(name) {
      this.q.notify({
        message: `Added task ${name}`,
        color: "green-8",
        textColor: "white-3",
        timeout: 1000,
      });
    },
    showConfirmTaskDeleted(name) {
      this.q.notify({
        message: `Deleted task: ${name}`,
        color: "red-8",
        textColor: "white-3",
        timeout: 1000,
      });
    },
    showConfirmTaskCompleted(name) {
      this.q.notify({
        message: `Completed task: ${name}`,
        color: "green-8",
        textColor: "white-3",
        timeout: 1000,
      });
    },
    showConfirmTaskUpdated(name) {
      this.q.notify({
        message: `Updated task: ${name}!`,
        color: "green-8",
        textColor: "white-3",
        timeout: 1000,
      });
    },
    completeTask(task) {
      const before = this.todos.length;
      this.todos = this.todos.filter(todo => todo.id !== task.id);
      if (this.todos.length < before) {
        this.tasksDone++;
        this.showConfirmTaskCompleted(task.name);
      }
    },
    deleteTask(task) {
      const before = this.todos.length;
      this.todos = this.todos.filter(todo => todo.id !== task.id);
      if (this.todos.length < before) {
        this.tasksToday--;
        this.showConfirmTaskDeleted(task.name);
      }
    },
    duplicateToDo(task) {
      let newTask = JSON.parse(JSON.stringify(task));
      const myRegex = /#(\d+)$/;
      const matches = myRegex.exec(task.name);
      if (matches != null) {
        console.log("duplicate: " + matches[1]);
        newTask.name = newTask.name.replace(myRegex, "#" + (parseInt(matches[1]) + 1));
      } else {
        newTask.name = newTask.name + " #2";
      }
      newTask.id = ++this.id;
      this.todos.unshift(newTask);
      this.tasksToday++;
    },
    putTaskToEditInVar(todo) {
      this.dialogEdit = true;
      this.taskToEdit = todo;
      console.log("Putting todo : ", this.taskToEdit);
    },
    addTask(task) {
      this.showConfirmTaskAdded(task.name);
      this.tasksToday++;
      task.id = ++this.id;
      this.todos.push(task);
    },
    editTask(oldTask, newTask) {
      this.showConfirmTaskUpdated(newTask.name);
    },
    getFormattedDate() {
      return date.formatDate(Date.now(), "D MMMM YYYY");
    },
  },
  computed: {
    sortedArray() {
      return [...this.todos].sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
      });
    },
    dayArray() {
      const sorted = [...this.todos].sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
      });
      const arrays = [];
      let currentArray = [sorted[0]];
      let prevDate;
      let nowDate;
      for (let i = 1; i < sorted.length; i++) {
        prevDate = date.formatDate(sorted[i - 1].time, "D MMMM YYYY");
        nowDate = date.formatDate(sorted[i].time, "D MMMM YYYY");
        if (prevDate !== nowDate) {
          arrays.push({
            day: prevDate,
            array: currentArray
          });
          currentArray = []
        }
        currentArray.push(sorted[i]);
      }
      if (currentArray.length > 0) {
        arrays.push({
          day: nowDate,
          array: currentArray
        });
      }
      console.log(arrays);
      return arrays;
    }
  }
});
</script>

<script>
import {date} from "quasar"


export default ({
  name: "Todo-Task",
  props: ["todo"],
  data() {
    return {
      animate: false,
      edit:false,
    };
  },
  methods: {
    animateDone(task) {
      console.log("Marking as done task " + task.name);
      this.animate = true;
      setTimeout(function () {
        this.$emit("delete", task);
      }.bind(this), 1000);
    },
    duplicateTask() {
      this.$emit("duplicate", this.todo);
    },
    sendEditRequest(){
      this.$emit("edit",this.todo);
    }
  },
  computed:{
    convertDateToTime(){
      const dateToFormat = this.todo.time;
      if(dateToFormat.length <= 5) {
        return dateToFormat;
      }
      return date.formatDate(dateToFormat, "HH:mm");
    },
  }
});
</script>


<template>
  <q-item
    :class="{ 'animate-task': animate === true}"
    class="no-padding task"
    clickable
    style="margin-bottom: 30px"
  >
    <q-item-section class="task-icon" side>
      <q-icon :name="'img:/icons/' + todo.icon + '.svg'" size="30px"/>
    </q-item-section>
    <q-item-section class="col" style="margin-left:10px">
      <q-item-section class="task-name"> {{ todo.name }}</q-item-section>
      <q-item-section class="todo-description row">
        <div class="row task-information">
            <span class="task-time">
              {{ convertDateToTime }}
            </span>
          <div style="background-color: var(--q-accent); width: 1px; height: 15px; margin: 0 15px 0 15px; ">
          </div>
          <span v-if="todo.weight" class="task-weight">
            Weight: {{ todo.weight }}
          </span>
        </div>
      </q-item-section>
    </q-item-section>
    <q-item-section side>
      <q-btn
        class="more_icon" dense flat
        icon="more_vert"
        round>
        <q-menu
          anchor="bottom left"
          auto-close
          dark
          class="option-menu">
          <q-list>
            <q-item clickable>
              <q-item-section avatar style="min-width: 0;" @click="animateDone(todo); ">
                <q-icon name="check"/>
              </q-item-section>
              <q-item-section>Mark done</q-item-section>
            </q-item>
            <q-item class="row" clickable @click="sendEditRequest" >
              <q-item-section avatar style="min-width: 0;">
                <q-icon name="edit"/>

              </q-item-section>
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item clickable @click="duplicateTask()">
              <q-item-section avatar style="min-width: 0;">
                <q-icon name="content_copy"/>
              </q-item-section>
              <q-item-section>Duplicate</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

    </q-item-section>
  </q-item>

</template>
<style lang="scss" scoped>


.task:hover {
  background-color: inherit;
}

.task-icon {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  background-color: #919699;
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

.task{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.task-name {
  color: #E3E5E5;
  font-size: 20px;
}

.todo-description {
  margin:0;
  padding: 0;
}

@keyframes task-done-keyframes {
  from {
  }
  to {
    margin-left: 500px;
    opacity: 0;
    position: relative;
    display: none;
  }
}

.animate-task {
  min-width: 500px;
  max-width: 500px;
  animation: ease-out task-done-keyframes 1s;
}

.task-information{
  margin-top:10px;
}
.task-information > .task-time {
  color: #78909C;
  font-size: 15px;
}

.task-information > .task-weight {
  color: #78909C;
  font-size: 15px;
}

.more_icon {
  color: $secondary;
}

.option-menu .q-icon {
  font-size: 20px;
}

.option-menu .q-item {
  padding-bottom: 0;
  padding-top: 0;
}
</style>



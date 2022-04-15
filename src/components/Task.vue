<script>

export default ({
  name: "Todo-Task",
  props: ["todo", "deleteCallback"],
  data() {
    return {
      animate: false,
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
    }
  },
});
</script>


<template>
  <q-item
    :class="{ 'animate-task': animate === true}"
    class="no-padding task"
    clickable
    style="margin-bottom: 40px"
  >
    <q-item-section class="task-icon" side>
      <q-icon :name="todo.icon" size="40px"/>
    </q-item-section>
    <q-item-section>
      <q-item-section class="q-pl-md task-name no-pointer-events"> {{ todo.name }}</q-item-section>
      <q-item-section class="q-pl-md todo-description no-pointer-events row">
        <div class="row task-information">
            <span class="task-time">
              {{ todo.time }}
            </span>
          <div style="background-color: var(--q-accent); width: 1px; height: 0; margin-right: 10px;
                margin-top: 5px; padding-bottom: 15px;">
          </div>
          <span v-if="todo.weight" class="task-weight">
            {{ todo.weight }}
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
          class="option-menu">
          <q-list>
            <q-item clickable>
              <q-item-section avatar style="min-width: 0;" @click="animateDone(todo); ">
                <q-icon name="check"/>
              </q-item-section>
              <q-item-section>Mark done</q-item-section>
            </q-item>
            <q-item class="row" clickable>
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
  width: 60px;
  height: 60px;
  border-radius: 10px;
}

.task{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.task-name {
  font-size: 30px;
  padding-top: 2px;
  display: flex;
  justify-content: flex-end;
}

.todo-description {
  margin: 0 !important;
  font-size: 0.8em;
  justify-content: flex-start;
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

.task-name {
  padding-top: 10px;
  color: #E3E5E5;
  font-size: 30px;
  font-weight: 400;
  text-align: left;
}

.task-information > .task-time {
  color: #78909C;
  font-size: 15px;
  padding-right: 10px;
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



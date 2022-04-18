<template>
  <q-item class="no-padding" style="margin-bottom: 20px">
    <span class="time">{{ convertDateToTime }}</span>
    <CaledarEntrySeparator :color="getColor" />

    <div>
      <div style="color: #78909C; font-size:15px; height: 20px">{{ capitalizeIcon }}</div>
      <div style="color: #E3E5E5; font-size:20px">{{  todo.name }}</div>
    </div>
  </q-item>
</template>

<script>
import {date} from "quasar";
import CaledarEntrySeparator from "components/CaledarEntrySeparator";

export default {
  name: "CalendarEntry",
  components: {CaledarEntrySeparator},
  props: ["todo"],
  data(){
    return{
      taskTypes: {
        Study: {
          color: "#78909C"
        },
        Music: {
          color: "#9C7890"
        },
        Hobby: {
          color: "#8A9C78"
        },
        Swim: {
          color: "#3B557D"
        },
        Cook: {
          color: "#5B533E"
        },
        Other: {
          color: "#B4B4B4"
        },
      }
    }
  },
  computed: {
    convertDateToTime() {
      const dateToFormat = this.todo.time;
      if (dateToFormat.length <= 5) {
        return dateToFormat;
      }
      return date.formatDate(dateToFormat, "HH:mm");
    },
    capitalizeIcon() {
      const iconName = this.todo.icon;
      return iconName.charAt(0).toUpperCase() + iconName.slice(1);
    },
    getColor(){
      const iconName = this.todo.icon;
      const bigName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
      console.log("Color:",this.taskTypes[bigName].color);
      return this.taskTypes[bigName].color;
    }
  }
}
</script>

<style scoped>

.time{
  color:#E3E5E5;
  font-size:20px;
  font-weight: 400;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 5px;
  width: 70px;
}


</style>

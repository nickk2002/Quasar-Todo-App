<!--suppress ALL -->
<template>
  <q-btn class="task-type" :style="cssProps" clickable >
    {{ text }}
  </q-btn>
</template>

<script>
export default {
  props:{
    width:{
      default: 60,
    },
    height: {
      default:25
    },
    font_size: {
      default:10
    },
    color: {
      default: "78909C",
    },
    text:{
      default: "Type"
    }
  },
  name: "TaskType",
  computed: {
    cssProps(){
      console.log("Calling the method with" + this.color + " " + this.width + " " + this.height);
      return{
        "--color": this.color,
        "--width": this.width + "px",
        "--height": this.height + "px",
        "--font-size": this.font_size + "px",
      }
    }
  }
}
</script>

<style scoped>
.task-type{
  width: var(--width);
  height: var(--height);
  background-color: var(--color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size);
  border-radius:5px;
}

</style>

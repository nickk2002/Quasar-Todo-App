<!--suppress ALL -->
<template>
  <q-btn class="task-type" :style="cssProps" clickable no-caps >
    {{ capitalized }}
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
      default: "Type",
      type: String,
    }
  },
  name: "TaskType",
  computed: {
    cssProps(){
      return{
        "--color": this.color,
        "--width": this.width + "px",
        "--height": this.height + "px",
        "--font-size": this.font_size + "px",
      }
    },
    capitalized(){
      const other = this.text;
      return other.charAt(0).toUpperCase() + other.slice(1);
    }
  }
}
</script>

<style scoped>

.task-type{
  width: var(--width);
  height: var(--height);
  font-weight: 500;
  background-color: var(--color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size);
  border-radius:5px;
  text-color: black;
}

</style>

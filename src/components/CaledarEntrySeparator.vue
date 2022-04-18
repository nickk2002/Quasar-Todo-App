<template>
  <div :style="cssProps" ></div>

</template>

<script>
export default {
  name: "CaledarEntrySeparator",
  props:{
    color: {
      default: "#9C7890",
    },
  },
  computed: {
    cssProps(){
      return{
        "--sep-color": this.color,
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
div{
  /*noinspection CssUnresolvedCustomProperty*/
  background-color: var(--sep-color);
  width: 4px;
  height: 40px;
  margin-right:20px;
  border-radius: 5px 5px;
}
</style>

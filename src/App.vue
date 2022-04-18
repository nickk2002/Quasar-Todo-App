<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
<style>
/* exo-regular - latin */
@font-face {
  font-family: 'Custom Font';
  font-style: normal;
  font-weight: 400;
  src: url('/css/fonts/exo/exo-v18-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),
  url('/css/fonts/exo/exo-v18-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('/css/fonts/exo/exo-v18-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
  url('/css/fonts/exo/exo-v18-latin-regular.woff') format('woff'), /* Modern Browsers */
  url('/css/fonts/exo/exo-v18-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
  url('/css/fonts/exo/exo-v18-latin-regular.svg#Exo') format('svg'); /* Legacy iOS */
}
@font-face {
  font-family: "Bitstream Vera Serif Bold";
  src: url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf");
}
body{
  font-family: "Custom Font",sans-serif !important;
  line-height: 1   !important;
}


</style>

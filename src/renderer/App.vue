<template>
  <div id="app" :style="backgroundStyle">
    <RouterView />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

// 计算属性，根据当前主题返回不同的背景图
const backgroundStyle = computed(() => {
  return {
    backgroundImage: `url(${require("./assets/image/bg_dark.png")}) `,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat" /* 不重复 */,
  };
});
</script>

<style scoped lang="less">
#app {
  width: 100vw;
  height: 100vh;
}
</style>

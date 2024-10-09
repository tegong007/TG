<template>
  <div class="flex h-[66px] inline-block w-full headerbg justify-between items-center px-[25px]">
    <div class="text-lg font-bold flex justify-between items-center w-[100px]">
      <img src="../assets/image/logo.png" alt="" class="h-[20px]" />
      <span>光墨匠人</span>
    </div>
    <a-button v-if="props.isShowTestBtn" @click="goModalTestPage">测试</a-button>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import router from "../router";

const goModalTestPage = () => {
  router.push({ name: "TestModal" });
};

const props = defineProps({
  isShowTestBtn: Boolean,
});
</script>
<style scoped>
.headerbg {
  background: linear-gradient(353deg, rgba(255, 255, 255, 0.1885) 36%, rgba(255, 255, 255, 0.29) 43%, rgba(0, 142, 255, 0.29) 57%);
  box-sizing: border-box;
  border: 1px solid #3f89dd;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), inset 0px -1px 1px 0px rgba(255, 255, 255, 0.34);
  color: #fff;
}
</style>

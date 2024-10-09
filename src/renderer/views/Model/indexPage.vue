<template>
  <!-- <div class=""></div> -->
  <Header :isShowTestBtn="false"></Header>
  <div class="flex flex-col w-full h-full content text-white">
    <div class="flex m-[20px] border-[#3F89DD] border-[4px] bg-gradient-to-t from-[#ffffff44] flex h-[90%]">
      <div class="flex flex-col h-full w-[10%]">
        <a-radio-group v-model:value="value1" class="w-full" buttonStyle="outline">
          <a-radio-button v-for="(item, index) in options" :value="item.value" :key="index" class="w-full bg-[#0000] border-0 flex justify-center items-center cursor-pointer py-10 font-bold text-lg before:!w-0 text-white">
            {{ item.label }}
          </a-radio-button>
        </a-radio-group>
      </div>
      <div class="flex-1 flex h-full border-[#3F89DD] border-l-[4px] p-[20px]">
        <ModalForm v-if="value1 === 'mode1'"></ModalForm>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <a-button size="large" @click="goHome">返回首页</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "@/renderer/components/TheHeader.vue";

import ModalForm from "../Model/modalForm.vue";
import { ref } from "vue";
import router from "@/renderer/router";
const value1 = ref<string>("mode1");
const options = [
  { label: "模组1", value: "mode1" },
  { label: "模组2", value: "mode2" },
  { label: "模组3", value: "mode3" },
  { label: "模组4", value: "mode4" },
  { label: "模组5", value: "mode5" },
  { label: "模组6", value: "mode6" },
];
const goHome = () => {
  router.push({ name: "Main" });
};
</script>

<style scoped>
.content {
  height: calc(100vh - 66px);
}
.ant-radio-button-wrapper:first-child {
  border-inline-start: 0px solid #d9d9d9;
  border-start-start-radius: 0px;
  border-end-start-radius: 0px;
}
.ant-radio-button-wrapper:last-child {
  border-inline-start: 0px solid #d9d9d9;
  border-start-start-radius: 0px;
  border-end-start-radius: 0px;
}

.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  z-index: 1;
  color: #ffffff;
  background: #ffffff2c;
  /* border-color: #1677ff; */
}
</style>

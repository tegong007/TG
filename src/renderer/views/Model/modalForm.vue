<template>
  <div class="flex flex-col w-full text-white relative">
    <a-typography-title :level="5"><span class="text-white text-lg">入参</span></a-typography-title>
    <a-config-provider
      :theme="{
        token: {
          fontSize: 16,
        },
      }"
    >
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left" class="text-white w-[60%] text-lg">
        <a-form-item label="Activity name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="Activity zone">
          <a-select v-model:value="formState.region" placeholder="please select your zone">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Instant delivery">
          <a-switch v-model:checked="formState.delivery" />
        </a-form-item>
        <a-form-item label="Activity type">
          <a-checkbox-group v-model:value="formState.type">
            <a-checkbox value="1" name="type">Online</a-checkbox>
            <a-checkbox value="2" name="type">Promotion</a-checkbox>
            <a-checkbox value="3" name="type">Offline</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="Resources">
          <a-radio-group v-model:value="formState.resource">
            <a-radio value="1">Sponsor</a-radio>
            <a-radio value="2">Venue</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Activity form">
          <a-input v-model:value="formState.desc" type="textarea" />
        </a-form-item>
        <!-- <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      
        <a-button style="margin-left: 10px">清空</a-button> 
      </a-form-item> -->
      </a-form>
    </a-config-provider>
    <div class="absolute right-[20px]"><a-button type="primary" class="" @click="onSubmit">测试</a-button></div>
  </div>
</template>
<script lang="ts">
// import { Moment } from "moment";
import { defineComponent, reactive, toRaw, UnwrapRef } from "vue";
interface FormState {
  name: string;
  region: string | undefined;
  //   date1: Moment | undefined;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
export default defineComponent({
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      name: "",
      region: undefined,
      //   date1: undefined,
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });
    const onSubmit = () => {
      console.log("submit!", toRaw(formState));
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
    };
  },
});
</script>
<style scoped lang="less">
::v-deep(.ant-form-item) {
  label {
    color: #fff !important;
  }
}
</style>

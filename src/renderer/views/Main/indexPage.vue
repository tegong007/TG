<template>
  <div class="h-full text-white">
    <Header :isShowTestBtn="false"></Header>
    <div class="flex p-[20px] content justify-between">
      <div class="w-[49.5%] border-[#3F89DD] border-[4px] bg-gradient-to-t from-[#ffffff44] flex flex-col">
        <div class="w-full title flex justify-between items-center bg-[#fff]/[0.2] h-[50px] pl-[20px] z-10 relative font-bold"><span class="text-lg">证本预览</span></div>
        <div class="w-full flex justify-center items-center h-full">
          <a-image :width="520" :src="imgStatus[imgIndex]"></a-image>
        </div>
      </div>
      <div class="flex flex-col w-[49.5%] justify-between">
        <div class="h-[78%] border-[#3F89DD] border-[4px] bg-gradient-to-t from-[#ffffff44] flex flex-col">
          <div class="w-full title flex justify-between items-center bg-[#fff]/[0.2] h-[50px] pl-[20px] z-10 relative font-bold"><span class="text-lg">打印信息</span></div>
          <div class="w-full info-box p-[20px] overflow-auto scrollable-box">
            <!-- 排版一
            <div v-for="(item, index) in flowData" :key="index">
              <div>
                <span v-if="item.ocrData"
                  >{{ item.time }} 证本已完成OCR识别，结果：<span class="text-amber-100">{{ item.ocrData }}</span></span
                >
              </div>
              <div>
                <span v-if="item.readerData && isIncludes(item.status)"
                  >{{ item.time }} 证本读写器数据：<span class="text-amber-100">{{ item.readerData }}</span></span
                >
              </div>
              <div v-if="item.imgData && isIncludes(item.status)" class="my-[3px]">
                <a-image :width="100" :src="item.imgData" />
              </div>
              <span>{{ item.time }} 证本已到达【{{ statusTypes[item.status] }}】</span>
            </div> -->

            <div v-for="(item, index) in flowData" :key="index">
              <div>
                <span> {{ item.time }} 证本已到达【{{ statusTypes[item.status] }}】 </span>
                <span>
                  <span v-if="item.ocrData && isIncludes(item.status)"
                    >证本已完成OCR识别，结果：<span class="text-amber-100">{{ item.ocrData }}</span>
                  </span>
                  <span v-if="item.readerData && isIncludes(item.status)"
                    >证本已完成芯片读取，数据：<span class="text-amber-100">{{ item.readerData }}</span>
                  </span>
                </span>
              </div>
              <div v-if="item.imgData && isIncludes(item.status)" class="py-[10px]">
                <a-image :width="100" :src="item.imgData" />
              </div>
            </div>
          </div>
        </div>
        <div class="h-[20%] printBtn flex justify-center items-center relative">
          <span class="text-[50px] font-bold relative">证本打印</span>
          <!-- <div class="bg-[#fff]/[0] absolute hover:bg-[#fff]/[0.3] w-full h-full rounded-lg cursor-pointer active:bg-[#000]/[0.4]" @click="startInterval"></div> -->
          <div :class="`${canClick ? 'bg-[#fff]/[0]  cursor-pointer hover:bg-[#fff]/[0.3]  active:bg-[#000]/[0.4]' : 'bg-[#000]/[0.4] pointer-events-none'}` + ' absolute w-full h-full rounded-lg '" @click="startInterval"></div>
        </div>
        <!-- <a-button @click="stopInterval">stop</a-button> -->
      </div>
    </div>
    <context-holder />
  </div>
</template>
<script setup lang="ts">
import Header from "@/renderer/components/TheHeader.vue";
import { message } from "ant-design-vue";
import { ref } from "vue";
import { getDocStatus, startOrStopPrintTask } from "@/renderer/apis/webApi";
import { throttle } from "@/main/throttle.js";
const [messageApi, contextHolder] = message.useMessage();
const imgStatus = [require("../../assets/image/default.png"), require("../../assets/image/laser1.png"), require("../../assets/image/laser2.png"), require("../../assets/image/lnkjet.png")];
const statusTypes = {
  "M1-Ready": "模组一发证位",
  "M1-Camera": "模组一摄像位",
  "M2-Reader-1": "模组二读写位1",
  "M2-Reader-2": "模组二读写位2",
  "M2-Reader-3": "模组二读写位3",
  "M2-Obsolete": "模组二废本槽",
  "M2-Laser-1": "模组二激光位1",
  "M2-Laser-2": "模组二激光位2",
  "M2-Laser-3": "模组二激光位3",
  "M2-Camera": "模组二摄像位", //第一次
  "M3-Reader-1": "模组三读写位1",
  "M3-Reader-2": "模组三读写位2",
  "M3-Reader-3": "模组三读写位3",
  "M3-Laser-1": "模组三激光位1",
  "M3-Laser-2": "模组三激光位2",
  "M3-Laser-3": "模组三激光位3",
  "M3-UV": "模组三喷墨位", //第二次
  "M3-Camera": "模组三摄像位", //第三次
  "M4-Turn": "模组四翻页器",
  "M5-Reader-1": "模组五读写位1",
  "M5-Reader-2": "模组五读写位2",
  "M5-Reader-3": "模组五读写位3",
  "M5-UV": "模组五喷墨位",
  "M5-Camera": "模组五摄像位",
  "M6-Product": "模组六成品槽", //结束
  "M6-Obsolete": "模组六废品槽",
};
interface T {
  time?: string;
  description?: string;
  ocrData?: string;
  readerData?: string;
  status: string;
  imgData?: string;
}

//数据流
const flowData = ref<T[]>([]);

const currentObj = ref<T>(); //当前对象
const canClick = ref<Boolean>(true); //是否可以点击打印
const intervalRef = ref<number | null>(null); //定时器

const imgIndex = ref(0); //当前图片所处于的位置
const getStatus = async () => {
  try {
    const data = await getDocStatus();
    const formatData: T = {
      status: data?.status + "",
      ocrData: data?.ocrData,
      imgData: data?.imgData,
      readerData: data?.readerData,
    };
    if (JSON.stringify(currentObj.value) !== JSON.stringify(formatData)) {
      currentObj.value = formatData;
      switch (formatData.status) {
        case "M2-Camera":
          imgIndex.value = 1;
          break;
        case "M3-UV":
          imgIndex.value = 2;
          break;
        case "M3-Camera":
          imgIndex.value = 3;
          break;
      }
      const newData: T = {
        time: formatDateTime(),
        status: formatData.status,
        ocrData: formatData.ocrData,
        imgData: formatData.imgData,
        readerData: formatData.readerData,
      };
      flowData.value.unshift(newData);
      if (formatData.status === "M6-Product" || formatData.status === "M6-Obsolete") {
        stopInterval();
      }
    }
  } catch (error) {
    stopInterval();
    message.error("出错了，请联系管理员");
  }
};
//判断状态
const isIncludes = (status: string) => {
  return status.includes("Reader") || status.includes("Camera");
};

//开始任务
const startTask = async () => {
  try {
    imgIndex.value = 0;
    const data = await startOrStopPrintTask({ operate: 1 });
  } catch (error) {
    stopInterval();
    message.error("打印任务开始失败");
  }
};

const startInterval = () => {
  canClick.value = false;
  startTask();
  intervalRef.value = setInterval(throttle(getStatus, 1000), 1000);
};
// 清除定时器时
const stopInterval = () => {
  if (intervalRef.value !== null) {
    canClick.value = true;
    clearInterval(intervalRef.value);
    intervalRef.value = null;
  }
};

function formatDateTime() {
  const now = new Date();
  const year = now.getFullYear(); // 获取年份
  const month = now.getMonth() + 1; // 获取月份，月份从0开始，所以需要+1
  const day = now.getDate(); // 获取日
  const hours = now.getHours(); // 获取小时
  const minutes = now.getMinutes(); // 获取分钟
  const seconds = now.getSeconds(); // 获取分钟

  // 使用padStart方法确保月份和日期始终是两位数
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // 拼接成指定格式
  const formattedDateTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return formattedDateTime;
}
</script>

<style scoped>
.content {
  height: calc(100vh - 66px);
}
.printBtn {
  background-image: url("../../assets/image/printBtn.png");
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 不重复 */
}
.info-box {
  height: calc(100% - 50px);
}
/* 自定义滚动条样式 */
.scrollable-box::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.scrollable-box::-webkit-scrollbar-thumb {
  background-color: #ffffff38;
  border-radius: 6px;
}

.scrollable-box::-webkit-scrollbar-track {
  /* background-color: #f1f1f1; */
  background-image: linear-gradient(to bottom, rgba(0, 140, 255, 0.329) 0%, rgba(255, 255, 255, 0.205) 100%);
  /* border-radius: 6px; */
}

.scrollable-box::-webkit-scrollbar-button {
  display: none;
}
</style>

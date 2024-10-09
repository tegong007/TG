<template>
  <Header></Header>
  <div class="notes">
    <div>
      <span aria-hidden="true">【如需打印实体胶片，请先到放射科登记处申请，申请后扫码取片】</span>
      <span>【如需打印实体胶片，请先到放射科登记处申请，申请后扫码取片】</span>
    </div>
  </div>
  <div class="main">
    <RouterView :state="lock" />
  </div>
  <div class="tip">
    <div>胶片打印机状态<br />{{ status.dragon.desc || "--" }}</div>
    <div>
      胶片余量<br />
      <template v-for="item in status.tray" :key="item.boxType">
        <span v-if="item.filmSize >= 0">{{ item.filmSizeType }}: {{ item.remaining || 0 }}张</span>
        <span v-else>--</span>
      </template>
      <span v-if="status.tray.length <= 0">--</span>
    </div>
    <div v-if="reportConect">报告打印机状态<br />{{ status.report.desc || "--" }}</div>
    <div v-else>服务器状态<br />{{ serverConect }}</div>
  </div>
  <Modal v-model:cover="cover"></Modal>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { queryPrinterStatus } from "@/renderer/apis/webApi";
import { PrintingLib, ReportLib } from "@/renderer/plugins/electron";
import { getDict } from "@/renderer/plugins/utils";
import store from "@/renderer/store/index";
import Header from "@/renderer/components/TheHeader.vue";
import Modal from "@/renderer/components/TheModal.vue";

const route = useRoute();
const cover: any = ref({});
const status: any = ref({ dragon: {}, tray: [], report: {} });
const lock = ref(false);
const reportConect = ref(false);
const serverConect = ref("");
let timeoutD = 0;
let timeoutR = 0;
let timeoutS = 0;

// 获取胶片机状态
const GetDragonStatus = async (init = false) => {
  let result: any;
  try {
    if (init) {
      await PrintingLib("Init", "", true); // 库初始化
      if (!store.state.configInfo.Report_Name) GetServerStatus(); // 服务器状态
    }
    init = false;
    if (store.state.configInfo.Film_IP) {
      result = await queryPrinterStatus(); // 查询打印机状态
      if (result.printerStatus) {
        if (result.printerStatus.errorCode && result.printerStatus.errorCode != 1157627904) {
          status.value.dragon = { type: "error", code: result.printerStatus.errorCode, desc: "" };
          status.value.dragon.desc = await getDict("errorCode", result.printerStatus.errorCode);
        } else {
          status.value.dragon = { type: "system", code: result.printerStatus.systemCode, desc: "" };
          status.value.dragon.desc = await getDict("systemCode", result.printerStatus.systemCode);
        }
        if (route.name == "PrinterScan") {
          if (status.value.dragon.code == 1291846145) {
            lock.value = false;
            if (cover.value.type == "wait") {
              setTimeout(() => {
                cover.value = {};
              }, 1000);
            }
          } else {
            lock.value = true;
            if (status.value.dragon.type == "error") cover.value = { show: true, type: "error", info: "胶片机提示【" + (status.value.dragon.desc || status.value.dragon.code) + "】错误，请联系维护人员处理" };
            else cover.value = { show: true, type: "wait", info: "胶片机处于【" + (status.value.dragon.desc || status.value.dragon.code) + "】工作中，请稍候" };
          }
        }
      }
      status.value.tray = result.filmBoxes || [];
      for (const element of status.value.tray) {
        if (element.filmSize >= 0) element.filmSizeType = await getDict("filmSizeDid", element.filmSize);
      }
    }
  } catch (err) {
    lock.value = false;
    cover.value = {};
    status.value.dragon = {};
    status.value.tray = [];
  }
  timeoutD = setTimeout(() => {
    GetDragonStatus(init);
  }, 5000);
};

// 获取报告机状态
const GetReportStatus = async () => {
  try {
    const result: any = await ReportLib("CheckStatus", JSON.stringify({ printerName: store.state.configInfo.Report_Name }), true, true); // 查询打印机状态
    const temp = JSON.parse(result.data);
    status.value.report = { code: result.statusCode, desc: getDict("reportCode", temp.statusCode) };
  } catch (err) {
    status.value.report = {};
  }
  timeoutR = setTimeout(() => {
    GetReportStatus();
  }, 10000);
};

// 获取服务器状态
const GetServerStatus = async () => {
  try {
    await PrintingLib("CheckSeverDatabaseConntect"); // 检查服务器数据库连接
    serverConect.value = await getDict("server", 1);
  } catch {
    serverConect.value = await getDict("server", 0);
  }
  timeoutS = setTimeout(() => {
    GetServerStatus();
  }, 30000);
};

onMounted(async () => {
  if (route.name == "PrinterScan") cover.value = { show: true, type: "wait", info: "初始化中，请稍候…" };
  const configInfo: any = await window.electronAPI.handleSystem({ key: "config" });
  store.commit("setState", { configInfo });
  if (!store.state.configInfo.Printer_Name) cover.value = { show: true, type: "warn", info: "当前未选择胶片打印配置，请先到后台进行设置", delay: 60 };
  GetDragonStatus(true); // 胶片机状态
  if (store.state.configInfo.Report_Name) {
    reportConect.value = true;
    GetReportStatus(); // 报告机状态
  }
});

onUnmounted(() => {
  clearTimeout(timeoutD);
  clearTimeout(timeoutR);
  clearTimeout(timeoutS);
});
</script>

<style scoped lang="less">
.main {
  width: 93vw;
  height: calc(95vh - 10.5vw - 8px);
  border: 4px solid #33bac0;
  margin: 3vw auto 0 auto;
  background: #ffffff96;
  box-shadow: 0px 4px 4px 0px #00000040;
}
.notes {
  position: absolute;
  top: 11.2vh;
  width: 70.5vw;
  margin: 0 auto;
  left: 0;
  right: 0;
  color: #f52f2f;
  font-weight: bold;
  font-size: 2.4vw;
  div {
    --gap: 1rem;
    position: relative;
    display: flex;
    overflow: hidden;
    user-select: none;
    gap: var(--gap);
    max-width: fit-content;
    span {
      flex-shrink: 0;
      display: flex;
      justify-content: space-around;
      gap: var(--gap);
      min-width: 115%;
      animation: marquee 12s linear infinite running;
      &:last-child {
        position: absolute;
        top: 0;
        left: 0;
        animation-name: marquee2;
      }
    }
  }
  @keyframes marquee {
    to {
      translate: calc(-100% - var(--gap)) 0;
    }
  }
  @keyframes marquee2 {
    from {
      translate: calc(100% + var(--gap));
    }
    to {
      translate: 0;
    }
  }
}
.tip {
  width: 93vw;
  margin: 1vh auto 0 auto;
  font-weight: bold;
  div {
    display: inline-block;
    text-align: center;
    width: calc(100% / 3 - 1.5px);
    color: #7b8baf;
    font-size: 1.2vw;
    line-height: 3.2vh;
    border-right: 2px solid #7b8baf;
    span {
      width: 50%;
      display: inline-block;
      letter-spacing: 2px;
    }
    &:last-of-type {
      border-right: 0;
    }
  }
}
</style>

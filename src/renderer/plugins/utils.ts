// 获取当前日期时间
export function getDateTime(type: string, date = new Date()) {
  const dict: string[] = ["日", "一", "二", "三", "四", "五", "六"];
  const time: any = { yyyy: date.getFullYear(), MM: date.getMonth() + 1, dd: date.getDate(), hh: date.getHours(), mm: date.getMinutes(), ss: date.getSeconds(), w: dict[date.getDay()] };
  let format = "";
  if (type === "time") format = "yyyy年MM月dd日 星期w hh:mm:ss";
  for (const temp in time) {
    format = format.replace(temp, (Array(temp.length).join("0") + time[temp]).slice(-temp.length));
  }
  return format;
}

// 获取字典值
export async function getDict(type: string, key: number | string, change = false) {
  const dict: any = {
    boxType: { 0: "下片盒", 1: "上片盒", 2: "外置" },
    filmSizeDid: { 0: "8x10 INCH", 1: "10x12 INCH", 2: "10x14 INCH", 3: "11x14 INCH", 4: "14x14 INCH", 5: "14x17 INCH" },
    systemCode: {
      1291845889: "设备初始化",
      1291846145: "设备就位",
      1291846657: "入片",
      1291846913: "预打印",
      1291847169: "打印",
      1291847937: "排片",
      1308623105: "就位中",
      1308623361: "入片",
      1308623617: "到达预抓入片位置，等待",
      1308623873: "开始入片到抓片位",
      1577058305: "加热中",
      1577058306: "数据处理中",
      1577058307: "系统初始化",
      1577058308: "任务暂停",
    },
    errorCode: {
      1157627904: "无错误",
      1694498817: "上盖打开",
      1694498818: "维修口打开",
      1694498822: "上片盒空",
      1694498823: "下片盒空",
      1694498826: "无可用尺寸的胶片",
      1694498827: "抓片失败",
      1694498828: "内部通讯失败",
      1694498829: "上片盒胶片放反，请调整胶片放置方式。",
      1694498830: "下片盒胶片放反，请调整胶片放置方式。",
      1694498831: "排片失败",
      1694498832: "打印失败",
      1694498833: "任务解析失败",
      1694498837: "未找到胶片发热参数",
      1694498834: "错误印头信息",
      1694498838: "两个片盒初始化失败",
      1694498839: "机器报错",
      1694498840: "请检查片盒状态",
      1157632769: "胶片堵塞变更为（送片通道卡片）",
      1157632770: "胶片堵塞变更为（送片通道卡片）",
      1157632771: "胶片堵塞变更为（送片通道卡片）",
      1157632772: "胶片堵塞变更为（送片通道卡片）",
      1157632773: "胶片堵塞变更为（送片通道卡片）",
      1157632774: "排片失败",
      1157632775: "打印失败",
      1157632776: "胶片堵塞变更为（抓片失败）",
      1157632777: "抓片失败",
      1157632778: "抓片失败",
      1157632779: "抓片失败",
      1157632780: "抓片失败",
      1157632781: "抓片失败",
      1157632782: "抓片失败",
      1157632257: "打印头抬升模块异常",
      1157632258: "打印头下压异常",
      1157632259: "打印头抬升异常",
      1157632513: "打印头压力模块异常",
      1157632514: "打印头压力模块下压异常",
      1157632515: "打印头压力模块释放异常",
      1157633025: "纠偏模块异常",
      1157633026: "纠偏模块异常",
      1157633027: "纠偏模块异常",
      1157633028: "纠偏模块异常",
      1157633029: "纠偏模块异常",
      1157633030: "纠偏模块异常",
      1157633281: "胶片夹紧模块异常",
      1157633282: "胶片夹紧模块异常",
      1157633283: "胶片夹紧模块异常",
      1157633284: "胶片夹紧模块异常",
      1157633285: "胶片夹紧模块异常",
      1157633286: "胶片夹紧模块异常",
      1157633287: "胶片夹紧模块异常",
      1157633288: "胶片夹紧模块异常",
      1157633289: "胶片夹紧模块异常",
      1157633290: "胶片夹紧模块异常",
      1157633291: "胶片夹紧模块异常",
      1157633537: "两个片盒初始化失败",
      1157633538: "抓片失败",
      1157633539: "抓片失败",
      1157633540: "抓片失败",
      1157633541: "抓片失败",
      1157633542: "两个片盒初始化失败",
      1157633793: "上盖打开/维修口打开",
      1157634049: "固件更新失败",
      1157634305: "打印头信息错误",
      1157634561: "打印头信息错误",
      1157634817: "打印头信息错误",
      1157635073: "打印失败",
      1157635329: "已没有该项报错了",
      1157635585: "已没有该项报错了",
      1694498841: "读最大ADC值失败，请确保密度计已连接、已校准",
      1694498848: "密度计故障",
      1694498849: "密度计检查无片，请检查是否卡片",
    },
    reportCode: { "0": "状态正常", "1": "缺纸", "2": "忙碌状态", "3": "过热", "-1": "卡纸", "-2": "其他错误" },
    statusCode: { 0: "状态正常", 1: "卡纸出错", 2: "缺纸出错", 3: "切刀出错", 4: "设备忙", 5: "缓存非空", 6: "碳带出错", 7: "打印头抬头", 8: "打印头过热" },
    server: { 0: "未连接", 1: "正常" },
    filmSizeJid: { "8INX10IN": 0, "10INX12IN": 1, "10INX14IN": 2, "11INX14IN": 3, "14INX14IN": 4, "14INX17IN": 5 },
  };
  if (change) {
    for (const item in dict[type]) {
      if (dict[type][item] == key) return item || key;
    }
  } else {
    return dict[type][key] || key;
  }
  /*let sql = "";
  switch (type) {
    case "systemCode":
      sql = "select * from code where type = 1 and code = '" + key + "' limit 0, 1";
      break;
    case "errorCode":
      sql = "select * from code where type = 2 and code = '" + key + "' limit 0, 1";
      break;
    case "reportCode":
      sql = "select * from code where type = 3 and code = '" + key + "' limit 0, 1";
      break;
    default:
      if (change) sql = "select * from desc where type = '" + type + "' and value = '" + key + "' limit 0, 1";
      else sql = "select * from desc where type = '" + type + "' and key = '" + key + "' limit 0, 1";
      break;
  }
  const result: any = await window.electronAPI.handleDatebase({ db: "dict", sql, change });
  if (result.length > 0) return result[0].desc || result[0].value;
  else return key;*/
}

// 生成姓名保密
export function formatName(name: string) {
  let newStr;
  if (name.length == 2) newStr = "*" + name.substr(1, 1);
  else if (name.length == 3) newStr = name.substr(0, 1) + "*" + name.substr(2, 1);
  else if (name.length == 4) newStr = name.substr(0, 2) + "*" + name.substr(3, 1);
  else if (name.length >= 5) newStr = "***" + name.substr(3, name.length - 3);
  else newStr = name;
  return newStr;
}

// 时间字符对比
export function compareTime(now: string, compare: string) {
  const date1: any = new Date(compare.replace(" ", "T"));
  const date2: any = new Date(now.replace(" ", "T"));
  const timeDifference = Math.abs(date2 - date1);
  const differenceInMinutes = timeDifference / (1000 * 60);
  return differenceInMinutes > 3 || date2 > date1;
}

declare global {
  interface Window {
    api: {
      quitApp: () => void // 定义你希望从 preload 脚本暴露给渲染进程的方法
    }
  }
}

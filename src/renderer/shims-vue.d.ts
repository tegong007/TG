/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface IElectronApi {
  handleSystem: (object) => Promise<object | boolean>;
  handleLibrary: (Object) => Promise<Object>;
  handleDatebase: (object) => Promise<object | boolean>;
  handleVoice: (Object) => Promise<Object>;
}

interface Window {
  electronAPI: IElectronApi;
}

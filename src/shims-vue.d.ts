// src/shims-vue.d.ts
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  
declare module 'js-cookie' {
  const Cookies: {
    get(name: string): string | undefined;
    set(name: string, value: string, options?: { expires?: number | Date; path?: string }): void;
    remove(name: string): void;
  };
  export default Cookies;
}
  
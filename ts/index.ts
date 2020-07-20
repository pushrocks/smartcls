import * as plugins from './smartcls.plugins';

export class SmartCls {
  private asyncLocalStorage = new plugins.AsyncLocalStorage();
  public run(runFunc: () => any) {
    this.asyncLocalStorage.run({}, runFunc);
  }

  public set(keyArg: string, valueArg: any) {
    const store: any = this.asyncLocalStorage.getStore();
    store[keyArg] = valueArg;
  }

  public get(keyArg: string) {
    const store: any = this.asyncLocalStorage.getStore();
    if (store) {
      return store[keyArg];
    } else {
      return undefined;
    }
  }
}

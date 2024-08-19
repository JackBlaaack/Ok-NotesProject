

export interface IWaitUntilOptions {
  timeout?: number;
  timeoutMsg?: string;
  interval?: number;
}

export type ElementState = "attached" | "detached" | "visible" | "hidden";
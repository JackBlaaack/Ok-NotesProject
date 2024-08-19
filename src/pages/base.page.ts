import { Locator, Page } from "playwright/test";
import { isLocator } from "../data/types/selector";
import { ElementState } from "../data/types/actions.type";
import { DEFAULT_TIMEOUT, TIMEOUT_10_SEC, TIMEOUT_20_SEC} from "../data/timeouts";

export class BasePage {
constructor(protected page: Page) {}

findElement(selectorOrElement: string | Locator, parentElement?: Locator) {
    if (isLocator(selectorOrElement)) return selectorOrElement;
    return parentElement ? parentElement.locator(selectorOrElement) : this.page.locator(selectorOrElement);
  }

  async waitForElement(selector: string | Locator, state: ElementState, timeout = TIMEOUT_20_SEC) {
    const element = this.findElement(selector);
    await element.waitFor({ state, timeout });
    return element;
  }

  async waitForElementAndScroll(selector: string | Locator, timeout = TIMEOUT_20_SEC) {
    const element = await this.waitForElement(selector, "visible");
    try {
      await element.scrollIntoViewIfNeeded({ timeout });
      return element;
    } catch (error) {
      throw error;
    }
  }

  async getText(selector: string | Locator, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    const text = await element.innerText({ timeout });
    return text;
  }

  async openPage(url: string) {
    try {
      await this.page.goto(url, { waitUntil: "domcontentloaded" });
    } catch (error) {
      throw new Error(`Failed to open page at ${url}. reason: \n ${(error as Error).message}`);
    }
  }

  async awaitForPage(url: string) {
    try {
      await this.page.waitForURL(url);
    }catch(error) {
      throw new Error(`Didn't load page at ${url}. reason: \n ${(error as Error).message}`);
    }
  
  }

  async fillCountInput(selector: string, count: string) {
    const countInput = await this.findElement(selector);
    await countInput.click({ clickCount: 2 });
    await countInput.fill(count);
  }

}
import { Page } from 'playwright/test';
import { BasePage } from './base.page';
import { DEFAULT_TIMEOUT } from '../data/timeouts';
import { BASE_URL } from '../data/authData/env';
import { CartPage } from './cart.page';

export class HomePage extends BasePage {
  protected cartPage: CartPage;
  constructor(protected page: Page) {
    super(page);
    this.cartPage = new CartPage(page, this);
  }

  readonly nonPromotionalCountInput = '(//div[@class="input-group mt-3"]/input)[2]';
  readonly promotionalCountInput = '(//div[@class="input-group mt-3"]/input)[3]';
  readonly shoppingCart = '#basketContainer';
  readonly nonPromotionalBuyButton = '(//button[contains(text(), "Купить")])[2]';
  readonly PromotionalBuyButton = '(//button[contains(text(), "Купить")])[3]';
  readonly cartCounter = 'span.basket-count-items';

  readonly profile = 'div.text-uppercase';
  readonly logoutButton = 'button.logout';

  async clickToShoppingCart() {
    await this.findElement(this.shoppingCart).click();
  }

  async isCartVisible() {
    return await this.findElement(this.cartPage.windowOfCart).isVisible();
  }

  async clickNonPromBuyButton() {
    await this.findElement(this.nonPromotionalBuyButton).click();
  }

  async clickPromBuyButton() {
    await this.findElement(this.PromotionalBuyButton).click();
  }

  async clickToProfile() {
    await this.findElement(this.profile).click();
   
  }

  async clickToSignOut() {
    await this.findElement(this.logoutButton).click();
  }

  async getCartCounter() {
    return await this.page.$(this.cartCounter);
  }

  async getCartCountValue(): Promise<number> {
    const cartCountElement = await this.getCartCounter();
    if (cartCountElement) {
      const countText = await cartCountElement.innerText();
      return parseInt(countText || '0', 10);
    }
    return 0;
  }

  async fillNonPromCountInput(count: string) {
    await this.fillCountInput(this.nonPromotionalCountInput, count);
  }
  
  async fillPromCountInput(count: string) {
    await this.fillCountInput(this.promotionalCountInput, count);
  }
}

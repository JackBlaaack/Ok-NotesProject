import { Page } from 'playwright/test';
import { BasePage } from './base.page';
import { DEFAULT_TIMEOUT, TIMEOUT_10_SEC } from '../data/timeouts';
import { BASE_URL } from '../data/authData/env';
import { CartPage } from './cart.page';

export class HomePage extends BasePage {
  protected cartPage: CartPage;
  constructor(protected page: Page) {
    super(page);
    this.cartPage = new CartPage(page, this);
  }


  readonly promotionalCountInput1 = '(//div[@class="input-group mt-3"]/input)[1]';
  readonly nonPromotionalCountInput2 = '(//div[@class="input-group mt-3"]/input)[2]';
  readonly promotionalCountInput3 = '(//div[@class="input-group mt-3"]/input)[3]';
  readonly shoppingCart = '#dropdownBasket';
  readonly PromotionalBuyButton1 = '(//button[contains(text(), "Купить")])[1]';
  readonly nonPromotionalBuyButton2 = '(//button[contains(text(), "Купить")])[2]';
  readonly PromotionalBuyButton3 = '(//button[contains(text(), "Купить")])[3]';
  readonly nonPromotionalBuyButton4 = '(//button[contains(text(), "Купить")])[4]';
  readonly nonPromotionalBuyButton5 = '(//button[contains(text(), "Купить")])[5]';
  readonly PromotionalBuyButton6 = '(//button[contains(text(), "Купить")])[6]';
  readonly nonPromotionalBuyButton7 = '(//button[contains(text(), "Купить")])[7]';
  readonly nonPromotionalBuyButton8 = '(//button[contains(text(), "Купить")])[8]';
  readonly PromotionalBuyButton9 = '(//button[contains(text(), "Купить")])[9]';
  readonly nonPromotionalBuyButton10 = '(//button[contains(text(), "Купить")])[10]';
  readonly paginationButton = 'a[data-page-number="2"]'
  readonly cartCounter = 'span.basket-count-items';
  readonly profile = 'div.text-uppercase';
  readonly logoutButton = 'button.logout';



  async isCartVisible() {
    return await this.findElement(this.cartPage.windowOfCart).isVisible();
  }

  async clickToShoppingCart() {
    await this.findElement(this.shoppingCart).click();
  }

  async clickPromBuyButton1() {
    await this.findElement(this.PromotionalBuyButton1).click();
  }

  async clickNonPromBuyButton2() {
    await this.findElement(this.nonPromotionalBuyButton2).click();
  }

  async clickNonPromBuyButton3() {
    await this.findElement(this.PromotionalBuyButton3).click();
  }

  async clickNonPromBuyButton4() {
    await this.findElement(this.nonPromotionalBuyButton4).click();
  }

  async clickNonPromBuyButton5() {
    await this.findElement(this.nonPromotionalBuyButton5).click();
  }

  async clickNonPromBuyButton6() {
    await this.findElement(this.PromotionalBuyButton6).click();
  }

  async clickNonPromBuyButton7() {
    await this.findElement(this.nonPromotionalBuyButton7).click();
  }

  async clickNonPromBuyButton8() {
    await this.findElement(this.nonPromotionalBuyButton8).click();
  }

  async clickNonPromBuyButton9() {
    await this.findElement(this.PromotionalBuyButton9).click();
  }

  async clickNonPromBuyButton10() {
    await this.findElement(this.nonPromotionalBuyButton10).click();
  }

  

async clickPaginationButton2() {
  await this.findElement(this.paginationButton).click();
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
    await this.fillCountInput(this.nonPromotionalCountInput2, count);
  }
  
  async fillPromCountInput(count: string) {
    await this.fillCountInput(this.promotionalCountInput1, count);
  }
}

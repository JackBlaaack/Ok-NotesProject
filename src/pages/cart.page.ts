import { Page } from 'playwright/test';
import { BasePage } from './base.page';
import { HomePage } from './home.page';
import { BASE_URL, CART_ENDPOINT } from 'data/authData/env';

export class CartPage extends BasePage {
  constructor(protected page: Page, protected homePage: HomePage) {
    super(page);

  }

  readonly windowOfCart = 'div[aria-labelledby="dropdownBasket"]';
  readonly switchingToCart = 'a[href="/basket"]';
  readonly cartItemName = 'span.basket-item-title';
  readonly cartItemPrice = 'span.basket-item-price';
  readonly cartTotalPrice = 'span.basket_price';
  readonly cartListOfItems = 'ul.list-group';
  readonly clearButton = 'a.btn-danger';
  readonly listofProducts = 'ul.list-group';
  readonly deleteNonPromProdButton = 'li[data-product="2"]>i.actionDeleteProduct'

  async clickClearButton() {
   
      await this.findElement(this.clearButton).click();
   
    }

  async switchToCart() {
    await this.findElement(this.switchingToCart).click();
  }

  async clickDeleteNonPromProdButton() {
await this.findElement(this.deleteNonPromProdButton).click();
  }
}

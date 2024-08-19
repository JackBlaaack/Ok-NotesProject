import { BASE_URL, CART_ENDPOINT } from "data/authData/env";
import { itemNames } from "data/homeData/enviroment";
import { TIMEOUT_10_SEC, TIMEOUT_20_SEC } from "data/timeouts";
import { CartPage } from "pages/cart.page";
import { HomePage } from "pages/home.page";
import { expect, Page } from "playwright/test";
import { logStep } from "utils/reporter";

export class CartPageService {
    protected homePage: HomePage;
    protected cartPage: CartPage
    constructor(protected page: Page) {
      this.homePage = new HomePage(this.page);
      this.cartPage = new CartPage(page, this.homePage);
    }


    @logStep('Switching to Cart Page')
    async switchtoCartPage() {
      await this.cartPage.switchToCart();
      await this.homePage.awaitForPage(`${BASE_URL}${CART_ENDPOINT}`);
    }

    @logStep('Check product name in cart ')
    async checkProductName(name: string) {
      const actualItemName = await this.cartPage.getText(this.cartPage.cartItemName)
      expect(actualItemName).toBe(name);
    }
    @logStep('Check product price in cart')
    async checkProductPrice(price: number) {
      const actualItemPriceText = await this.cartPage.getText(this.cartPage.cartItemPrice)
      const match = actualItemPriceText.match(/(\d+)/);
      const actualItemPrice = match ? parseInt(match[1], 10) : 0;
      expect(actualItemPrice).toEqual(price);
    }
    @logStep('Check total product price in cart')
    async checkTotalPriceOfCart(price: number) {
      const priceOfItemsText = await this.cartPage.getText(this.cartPage.cartListOfItems)
      const priceRegex = /(\d+)\s*р\./g;
      let totalSum = 0;
      let match;
      while ((match = priceRegex.exec(priceOfItemsText)) !== null) {
        const price = parseInt(match[1], 10);
        totalSum += price;
      }
      expect(totalSum).toEqual(price);
    }
    @logStep('Delete product from cart')
    async deleteProductOfCart() {
        const countText = await this.homePage.getText(this.homePage.cartCounter)
        const count = parseInt(countText, 10);
        if (count > 0) {
          console.log(`current count: ${count}`);
          await this.homePage.clickToShoppingCart();
          await this.homePage.waitForElementAndScroll(this.cartPage.windowOfCart, TIMEOUT_10_SEC)
          await this.cartPage.clickClearButton();
          await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
        } else {
          console.log('The cart is an empty');
        }   
}

@logStep('Check Product Names in Cart')
async CheckProductsName() {
  const cartProducts = await this.homePage.findElement(this.cartPage.listofProducts).allInnerTexts();
  console.log(`cartProducts: ${cartProducts}`);

  const combinedProductsString = cartProducts.join('\n');

  const productLines = combinedProductsString.split('\n');

  // Извлекаем только названия продуктов
  const actualCartProducts = productLines
    .map(item => item.split(' - ')[0].trim()) // Извлекаем только название до первого ' - '
    .filter(name => name); // Убираем пустые строки, если они есть

  console.log(`actualCartProducts: ${actualCartProducts}`);

  const expectedProductNames = Array.isArray(itemNames) ? itemNames : Object.values(itemNames);
  console.log(`expectedProductNames: ${expectedProductNames}`);
  
  expectedProductNames.forEach(expectedName => {
    expect(actualCartProducts).toContain(expectedName);
  });

}

async deleteNonPromButton() {
  await this.cartPage.clickDeleteNonPromProdButton();
  await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_10_SEC);
}
}
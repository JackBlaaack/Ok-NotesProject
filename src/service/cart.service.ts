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
      try {
        const countText = await this.homePage.getText(this.homePage.cartCounter)
        const count = parseInt(countText, 10);
        if (count > 0) {
          console.log(`current count: ${count}`);
          console.log('Clicking cart button...');
          await this.homePage.clickToShoppingCart();
          await this.homePage.waitForElementAndScroll(this.cartPage.windowOfCart, TIMEOUT_20_SEC);
          console.log('Clicking clear button...');
          await this.cartPage.clickClearButton();
          await this.homePage.waitForElement(this.cartPage.clearButton, "hidden");
  

          const updatedCountText = await this.homePage.getText(this.homePage.cartCounter);
            const updatedCount = parseInt(updatedCountText, 10);
            if (updatedCount === 0) {
                console.log('The cart has been cleared successfully.');
            } else {
                console.log('Failed to clear the cart. Current count:', updatedCount);
            }
        } else {
          console.log('The cart is an empty');
        }   
      }catch(error) {
        throw new Error(`Failed to delete products. reason: \n ${(error as Error).message}`)
      }
        
}

@logStep('Check Product Names in Cart')
async checkProductsName() {
  const cartProductElements = await this.homePage.findElement(this.cartPage.listofProducts).all();

  // Извлекаем текст из каждого элемента
  const cartProducts = await Promise.all(cartProductElements.map(async (element) => {
    return await element.innerText(); // Или используйте другой метод для получения текста
  }));

  console.log(`cartProducts: ${cartProducts}`);

  const actualCartProductsElement = cartProducts.join('\n');

  const expectedProductNames = Array.isArray(itemNames) ? itemNames : Object.values(itemNames);
  console.log(`expectedProductNames: ${expectedProductNames}`);
  
  expectedProductNames.forEach(expectedProduct => {
    expect(actualCartProductsElement).toContain(expectedProduct);
  });

}

async deleteNonPromButton() {
  await this.cartPage.clickDeleteNonPromProdButton();
  await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_10_SEC);
}
}
import { expect, Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { DEFAULT_TIMEOUT, TIMEOUT_10_SEC, TIMEOUT_20_SEC } from '../data/timeouts';
import { BASE_URL, CART_ENDPOINT } from '../data/authData/env';
import { logStep } from '../utils/reporter.js';
import { CartPage } from 'pages/cart.page';
import { countOfProducts } from 'data/homeData/enviroment';

export class HomePageService {
  protected homePage: HomePage;
  protected cartPage: CartPage;
  constructor(protected page: Page) {
    this.homePage = new HomePage(this.page);
    this.cartPage = new CartPage(this.page, this.homePage);
  }
  @logStep('Click to Cart')
  async clickCart() {
    try {
      await this.homePage.clickToShoppingCart();
      await this.homePage.waitForElementAndScroll(this.cartPage.windowOfCart, TIMEOUT_10_SEC);
    } catch (error) {
      throw new Error(
        `Failed to open window of cart (${this.cartPage.windowOfCart}). reason: \n ${(error as Error).message}`
      );
    }
  }

  @logStep('Add non-promotional product to a cart')
  async addNonPromProductToCart(count: string) {
    try {
      await this.homePage.fillNonPromCountInput(count);
      await this.homePage.clickNonPromBuyButton2();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
    } catch (error) {
      throw new Error(`Didn't add non-promotional product. reason: \n ${(error as Error).message}`);
    }
  }

  @logStep('Add promotional product to a cart')
  async addPromProductToCart(count: string) {
    try {
      await this.homePage.fillPromCountInput(count);
      await this.homePage.clickPromBuyButton1();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
    } catch (error) {
      throw new Error(`Didn't add promotional product. reason: \n ${(error as Error).message}`);
    }
  }

  @logStep('Add 9 different Products')
  async addNineDifferentProduct() {
    try {
      await this.homePage.clickPromBuyButton1();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton2();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton3();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton4();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton5();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton6();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton7();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton8();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickPaginationButton2();
      await this.homePage.waitForElementAndScroll(this.homePage.paginationButton, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton9();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
    } catch (error) {
      throw new Error(`Didn't add product. reason: \n ${(error as Error).message}`);
    }
  }

  @logStep('Add 10 different Products')
  async addTenDifferentProduct() {
    try {
      await this.homePage.clickPromBuyButton1();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton2();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton3();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton4();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton5();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton6();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton7();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton8();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickPaginationButton2();
      await this.homePage.waitForElementAndScroll(this.homePage.paginationButton, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton9();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
      await this.homePage.clickNonPromBuyButton10();
      await this.homePage.waitForElementAndScroll(this.homePage.cartCounter, TIMEOUT_20_SEC);
    } catch (error) {
      throw new Error(`Didn't add product. reason: \n ${(error as Error).message}`);
    }
  }

  @logStep('Check avalaible cart')
  async checkAvailableCart() {
    const isVisible = await this.homePage.isCartVisible();
    expect(isVisible).toBe(true);
  }
  @logStep('Check switching to cart')
  async checkSwitchingToCartPage() {
    expect(this.page.url()).toBe(`${BASE_URL}${CART_ENDPOINT}`);
  }
  @logStep('Check count of product in cart')
  async checkCountOfCart(count: string) {
    const carCountElement = await this.homePage.findElement(this.homePage.cartCounter);
    await expect(carCountElement).toHaveText(count);
  }

  @logStep('Sign out')
  async signOutUI() {
    try {
      await this.homePage.clickToProfile();
      await this.homePage.clickToSignOut();

      await this.homePage.awaitForPage(BASE_URL);
    } catch (error) {
      throw new Error(`Didn't sign out. reason: \n ${(error as Error).message} `);
    }
  }
}

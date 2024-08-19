import { test, expect } from '@playwright/test';
import { AuthPageService } from '../service/auth.service';
import { HomePageService } from '../service/home.service';
import { countOfProducts, itemNames, itemPrices } from '../data/homeData/enviroment';
import { CartPageService } from 'service/cart.service';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    const authService = new AuthPageService(page);
    const homeService = new HomePageService(page);
    const cartService = new CartPageService(page);
    await authService.openWebSite();
    await authService.loginAsAdmin();
    // await homeService.clickCart();
    await cartService.deleteProductOfCart();
  });

  test.afterEach(async ({ page }) => {
    // const authService = new AuthPageService(page);
    // authService.signOut();
      const homeService = new HomePageService(page);
      await homeService.signOutUI();
  });

  test('Test Case 1: Switching to an empty cart', async ({ page }) => {
    const cartService = new CartPageService(page);
    const homeService = new HomePageService(page);
    await homeService.clickCart();

    await homeService.checkAvailableCart();

    await cartService.switchtoCartPage();

    await homeService.checkSwitchingToCartPage();
  });

  test('Test Case 2: Switching to to cart with 1 non-promotional item', async ({ page }) => {
    const cartService = new CartPageService(page);
    const homeService = new HomePageService(page);

    await homeService.addNonPromProductToCart(countOfProducts.oneCount);

    await homeService.checkCountOfCart('1');

    await homeService.clickCart();

    await cartService.checkProductName(itemNames.nonPromItemName);
    await cartService.checkProductPrice(itemPrices.nonPromItemPrice);
    await cartService.checkTotalPriceOfCart(itemPrices.nonPromItemPrice);
  });

  test('Test Case 3: Switching to to cart with 1 promotional item', async ({ page }) => {
    const cartService = new CartPageService(page);
    const homeService = new HomePageService(page);

    await homeService.addPromProductToCart(countOfProducts.oneCount);
    await homeService.checkCountOfCart('1');
    await homeService.clickCart();

    await cartService.checkProductName(itemNames.promItemName);
    await cartService.checkProductPrice(itemPrices.promItemPrice);
    await cartService.checkTotalPriceOfCart(itemPrices.promItemPrice);
  });

  test('Test Case 4: Switching to to cart with 9 different items', async ({ page }) => {
    const homeService = new HomePageService(page);
    const cartService = new CartPageService(page);
    await homeService.addPromProductToCart(countOfProducts.oneCount)
    await homeService.addNonPromProductToCart(countOfProducts.fourCounts);
    await homeService.addPromProductToCart(countOfProducts.fourCounts);
    await homeService.checkCountOfCart('9');
    await homeService.clickCart();
    await cartService.CheckProductsName();
    await cartService.checkTotalPriceOfCart(itemPrices.nonPromItemPrice);

  });

  test('Test Case 5: Switching to to cart with 9 promotional items of the same title', async ({ page }) => {
    const homeService = new HomePageService(page);
    const cartService = new CartPageService(page);
    await homeService.addPromProductToCart(countOfProducts.nineCounts);
    await homeService.checkCountOfCart('9');
    await cartService.CheckProductsName();


   
  });

  test('Test Case 6: Switching to to cart with 10 nonpromotional items of the same title', async ({ page }) => {
    const homeService = new HomePageService(page);
    const cartService = new CartPageService(page);
    await homeService.addNonPromProductToCart(countOfProducts.tenCounts);
    await homeService.checkCountOfCart('10');
    await cartService.CheckProductsName();
    await cartService.checkTotalPriceOfCart(itemPrices.nonPromItemPrice);
   
  });

  test('Test Case 7: Switching to to cart with 10 different items', async ({ page }) => {
    const homeService = new HomePageService(page);
    const cartService = new CartPageService(page);
    await homeService.addNonPromProductToCart(countOfProducts.nineCounts);
    await homeService.addPromProductToCart(countOfProducts.oneCount);
    await cartService.CheckProductsName();
    await homeService.checkCountOfCart('10');

  });

  test('Test Case 8: Deleting Partial Products', async ({ page }) => {
    const homeService = new HomePageService(page);
    const cartService = new CartPageService(page);
    await homeService.addNonPromProductToCart(countOfProducts.fourCounts);
    await homeService.addPromProductToCart(countOfProducts.fourCounts);
    await homeService.clickCart();
    await cartService.deleteNonPromButton()

    await homeService.checkCountOfCart('4');

  });

});

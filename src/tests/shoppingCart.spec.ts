
import {test} from '../fixtures/services.fixture.js'
import { countOfProducts, itemNames, itemPrices } from '../data/homeData/enviroment.js';


test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ authPageService, cartPageService }) => {
    await authPageService.openWebSite();
    await authPageService.loginAsAdmin();
    await cartPageService.deleteProductOfCart();
  });

  test.afterEach(async ({ homePageService }) => {
      await homePageService.signOutUI();
  });

  test('Test Case 1: Switching to an empty cart', async ({cartPageService,homePageService}) => {
  ;
    await homePageService.clickCart();

    await homePageService.checkAvailableCart();

    await cartPageService.switchtoCartPage();

    await homePageService.checkSwitchingToCartPage();
  });

  test('Test Case 2: Switching to to cart with 1 non-promotional item', async ({ cartPageService,homePageService }) => {

    await homePageService.addNonPromProductToCart(countOfProducts.oneCount);

    await homePageService.checkCountOfCart('1');

    await homePageService.clickCart();

    await cartPageService.checkProductName(itemNames.nonPromProdName2);
    await cartPageService.checkProductPrice(itemPrices.nonPromProdPrice2);
    await cartPageService.checkTotalPriceOfCart(itemPrices.nonPromProdPrice2);
  });

  test('Test Case 3: Switching to to cart with 1 promotional item', async ({ cartPageService,homePageService }) => {

    await homePageService.addPromProductToCart(countOfProducts.oneCount);
    await homePageService.checkCountOfCart('1');
    await homePageService.clickCart();

    await cartPageService.checkProductName(itemNames.promProdName1);
    await cartPageService.checkProductPrice(itemPrices.nonPromProdPrice2);
    await cartPageService.checkTotalPriceOfCart(itemPrices.nonPromProdPrice2);
  });

  test('Test Case 4: Switching to to cart with 9 different items', async ({ cartPageService,homePageService }) => {
    await homePageService.addNineDifferentProduct();
    await homePageService.checkCountOfCart('9');
    await homePageService.clickCart();
    await cartPageService.checkProductsName();
    await cartPageService.checkTotalPriceOfCart(itemPrices.ninediffPrice);

  });

  test('Test Case 5: Switching to to cart with 9 promotional items of the same title', async ({ cartPageService,homePageService }) => {
    await homePageService.addPromProductToCart(countOfProducts.nineCounts);
    await homePageService.checkCountOfCart('9');
    await cartPageService.checkProductsName();


   
  });

  test('Test Case 6: Switching to to cart with 10 nonpromotional items of the same title', async ({ cartPageService,homePageService }) => {
    await homePageService.addNonPromProductToCart(countOfProducts.tenCounts);
    await homePageService.checkCountOfCart('10');
    await cartPageService.checkProductsName();
    await cartPageService.checkTotalPriceOfCart(itemPrices.nonPromProdPrice2 * 10);
   
  });

  test('Test Case 7: Switching to to cart with 10 different items', async ({ cartPageService,homePageService }) => {
    await homePageService.addTenDifferentProduct();
    await homePageService.checkCountOfCart('10');
    await cartPageService.checkProductsName();
  

  });

  test('Test Case 8: Deleting Partial Products', async ({ cartPageService,homePageService }) => {
    await homePageService.addNonPromProductToCart(countOfProducts.fourCounts);
    await homePageService.addPromProductToCart(countOfProducts.fourCounts);
    await homePageService.clickCart();
    await cartPageService.deleteNonPromButton()

    await homePageService.checkCountOfCart('4');

  });

});

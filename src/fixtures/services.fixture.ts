
import { test as base } from "@playwright/test";
import { AuthPageService } from "service/auth.service";
import { CartPageService } from "service/cart.service";
import { HomePageService } from "service/home.service";

interface ServicesFixture {
  authPageService: AuthPageService;
  homePageService: HomePageService;
  cartPageService: CartPageService;
}

export const test = base.extend<ServicesFixture>({
  authPageService: async ({ page }, use) => {
    await use(new AuthPageService(page));
  },
  homePageService: async ({ page }, use) => {
    await use(new HomePageService(page));
  },
  cartPageService: async ({ page }, use) => {
    await use(new CartPageService(page));
  }
});

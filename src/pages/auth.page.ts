import { Page } from '@playwright/test';
import { IUserCredentials } from '../data/types/user.types.js';
import { BasePage } from './base.page.js';

export class AuthPage extends BasePage  {
  constructor(protected page: Page) {
    super(page);
  }

  protected readonly LoginInput = '#loginform-username';
  protected readonly PasswordInput = '#loginform-password';
  protected readonly LoginButton = '//*[@id="login-form"]//button';

  async fillCredInputs(credentials: IUserCredentials) {
    await this.findElement(this.LoginInput).fill(credentials.login);
    await this.page.keyboard.press('Enter');
    await this.findElement(this.PasswordInput).fill(credentials.password);
    await this.page.keyboard.press('Enter');
  }

  async clickLoginButton() {
    await this.findElement(this.LoginButton).click();
  }

  async deleteTokens() {
    await this.page.context().addCookies([
      {
        name: 'PHPSESSID',
        value: '',
        expires: 0
      }
    ]);
  }
}
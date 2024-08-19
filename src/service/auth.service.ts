import { Page } from '@playwright/test';
import { AuthPage } from '../pages/auth.page.js';
import type { IUserCredentials } from '../data/types/user.types.js';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../config/enviroment.js';
import { logStep } from '../utils/reporter.js';
import { AUTH_ENDPOINT, BASE_URL } from '../data/authData/env.js';

export class AuthPageService {
  protected authPage: AuthPage;
  constructor(protected page: Page) {
    this.authPage = new AuthPage(this.page); 
  }

  @logStep('Open OkNotes Site')
  async openWebSite() {
    try {
      await this.authPage.openPage(`${BASE_URL}${AUTH_ENDPOINT}`);
    }catch(error) {
      throw new Error(`Didn't load page ${BASE_URL}${AUTH_ENDPOINT}. reason : \n ${(error as Error).message}`)
    }
   
  }

  @logStep('Login')
  async login(credentials: IUserCredentials) {
    await this.authPage.fillCredInputs(credentials);
    await this.authPage.clickLoginButton();
  }

  @logStep('Login as Admin')
  async loginAsAdmin() {
    try {
      await this.login({ login: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    } catch (error) {
      throw new Error(`Failed to login as Admin. reason : \n ${(error as Error).message}`);
    }
  }

  @logStep('Sign Out')
  async signOut() {
    try {
      await this.authPage.deleteTokens();
      await this.page.reload({waitUntil: "domcontentloaded"});
    }catch(error) {
      throw new Error(`Didn't sign out. reason : \n ${(error as Error).message} `)
    }
    
  }
}

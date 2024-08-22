import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/user.json';

setup("authentication", async ({page}) => {
    //Navigate to the URL
    await page.goto(`/`);

    //Locators
    const focusedNavigationLink = page.locator('ul.focus');
    const loginButton = page.locator(`.submit`);
    const loginLink = page.getByText(`登录`);
    const userName = page.getByPlaceholder(`用户名`);
    const userPassword = page.getByPlaceholder(`密码`);

    //Actions
    await loginLink.click();
    await userName.fill('test');
    await userPassword.fill('000000');
    await loginButton.click();

    //Assertion
    await expect(focusedNavigationLink).toContainText('控制台');

    // End of authentication steps.
    await page.context().storageState({ path: authFile });
});
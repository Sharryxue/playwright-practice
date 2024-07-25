import { test, expect } from '@playwright/test';

test("Fail to login the site with unexist account", async ({page}) => {
    //Navigate to the URL
    await page.goto(`http://alanzh.com/`);

    //Locators
    const loginButton = page.locator(`.submit`);
    const loginLink = page.getByText(`登录`);
    const userName = page.getByPlaceholder(`用户名`);
    const userPassword = page.getByPlaceholder(`密码`);

    //Actions
    await loginLink.click();
    await userName.fill('unexist_username');
    await userPassword.fill('fake_password');
    await loginButton.click();

    //Assertion
    await expect(page.locator('.error')).toHaveText('用户名或密码无效');
});
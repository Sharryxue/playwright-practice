import { test, expect } from '@playwright/test';

async function login(page) {
    //Setup Action
    // See if this can make the login test reuseble
    //await login.loginTest();

    //Navigate to the URL
    await page.goto(`http://alanzh.com/`);

    //Locators
    const loginButton = page.locator(`.submit`);
    const loginLink = page.getByText(`登录`);
    const userName = page.getByPlaceholder(`用户名`);
    const userPassword = page.getByPlaceholder(`密码`);

    //Actions
    await loginLink.click();
    await userName.fill('test');
    await userPassword.fill('000000');
    await loginButton.click();
}

async function Teardown(page) {
    //Locators
    const successMessage = page.locator(`.success`);
    const removeOption = page.locator(`(//div[contains(@class,'row')]//div[@class='operate']//a)[1]`);
    const oprateDropdown = page.locator(`(//div[contains(@class,'row')]//div[@class='operate']//button)[1]`);
    const tableCheckbox = page.locator(`//tr[contains(.,'内部测试')]//input[(@type='checkbox')]`);

    //Teardown Action
    await tableCheckbox.check();
    await oprateDropdown.click();
    page.on('dialog', dialog => dialog.accept ());
    await removeOption.click();
    await expect(successMessage).toContainText('已经被删除');
    expect(tableCheckbox).not.toBeVisible();
}

test("Can post page", async ({page}) => {
    await login(page);

    //Locators
    /*  find the way to make the locator be reuseble, as the only difference for buttons in navigator is the text.
    see if there is a way to make the text be a variable. */
    const oprateDropdown = page.getByText(`选中项`);
    const pageSummary = page.getByPlaceholder(`标题`);
    const pageContent = page.locator(`textarea#text`);
    const pagePostButton = page.getByText(`发布页面`);
    const postLink = page.locator("nav .parent a[href*='write']");
    const postPageLink = page.getByText('创建页面')
    const successMessage = page.locator(`.success`);
    const removeOption = page.getByText(`删除`);
    const tableCheckbox = page.locator(`//tr[contains(.,'内部测试')]//input[(@type='checkbox')]`);

    //Actions
    await postLink.hover();
    await postPageLink.click();
    await pageSummary.fill('内部测试');
    await pageContent.fill('这是一个内部测试页面, 测试结束时所有数据均将被删除, 请谨慎使用.');
    await pagePostButton.click();

    //Assertion
    await expect(successMessage).toHaveText('页面 "内部测试" 已经发布');
    expect(tableCheckbox).toBeVisible();

    await Teardown(page)
});

test("Can post article", async ({page}) => {
    await login(page);

    //Locators
    /*  find the way to make the locator be reuseble, as the only difference for buttons in navigator is the text.
    see if there is a way to make the text be a variable. */
    const articleSummary = page.getByPlaceholder(`标题`);
    const articleContent = page.locator(`textarea#text`);
    const articlePostButton = page.getByText(`发布文章`);
   // This is due to issue found in https://sharry-shi.atlassian.net/browse/SCRUM-27?focusedCommentId=10010
    const oprateDropdown = page.locator(`(//div[contains(@class,'row')]//div[@class='operate']//button)[1]`);
    const postArticleLink = page.getByText('撰写文章');
    const postLink = page.locator("nav .parent a[href*='write']");
    const removeOption = page.locator(`(//div[contains(@class,'row')]//div[@class='operate']//a)[1]`);
    const successMessage = page.locator(`.success`);
    const tableCheckbox = page.locator(`//tr[contains(.,'内部测试')]//input[(@type='checkbox')]`);

    //Actions
    await postLink.hover();
    await postArticleLink.click();
    await articleSummary.fill('内部测试');
    await articleContent.fill('这是一个测试文章, 测试结束时将被删除, 请谨慎使用.');
    await articlePostButton.click();

    //Assertion
    await expect(successMessage).toHaveText('文章 "内部测试" 已经发布');
    expect(tableCheckbox).toBeVisible();

    await Teardown(page)
});

test.afterEach(async ({ page }) => {
    console.log(`Finished ${test.info().title} with status ${test.info().status}`);
  
    if (test.info().status !== test.info().expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
  });
import { test, expect } from '@playwright/test';

test("Can post page", async ({page}) => {
    await page.goto(`/admin`);
    //Locators
    /*  find the way to make the locator be reuseble, as the only difference for buttons in navigator is the text.
    see if there is a way to make the text be a variable. */
    const pageSummary = page.getByPlaceholder(`标题`);
    const pageContent = page.locator(`textarea#text`);
    const pagePostButton = page.getByText(`发布页面`);
    const postLink = page.locator("nav .parent a[href*='write']");
    const postPageLink = page.getByText('创建页面');
    const successMessage = page.locator(`.success`);
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
});

test("Can post article", async ({page}) => {
    await page.goto(`/admin`);
    //Locators
    /*  find the way to make the locator be reuseble, as the only difference for buttons in navigator is the text.
    see if there is a way to make the text be a variable. */
    const articleSummary = page.getByPlaceholder(`标题`);
    const articleContent = page.locator(`textarea#text`);
    const articlePostButton = page.getByText(`发布文章`);
   // This is due to issue found in https://sharry-shi.atlassian.net/browse/SCRUM-27?focusedCommentId=10010
    const postArticleLink = page.getByText('撰写文章');
    const postLink = page.locator("nav .parent a[href*='write']");
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
});

test.afterEach(async ({ page }) => {
    console.log(`Finished ${test.info().title} with status ${test.info().status}`);
  
    if (test.info().status !== test.info().expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
});
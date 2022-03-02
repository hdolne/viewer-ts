import { test, expect } from '@playwright/test';

test.describe('viewer-ts', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('http://localhost:5555/');
    const title = page.locator('body h1');
    await expect(title).toHaveText('Enterprise Viewer');
  });
  // test name -> complete with correct requierement
  test('one viewport', async ({ page }) => {
    // add comments 
    const img = page.$$('img[class="background"]');
    await expect((await img).length).toEqual(1);
  });
  
  // test name -> complete with correct requierement
  test('image', async ({ page }) => {
    // add comments
    const img = page.locator('img[class="background"]');
    const imgBondingBox = await img.boundingBox();
    await expect(imgBondingBox.width).toEqual(512);
    await expect(imgBondingBox.height).toEqual(512);
  });

  // test name -> complete with correct requierement
  test('image list', async ({ page }) => {
    // list of images url when using previous button
    // list of images url when using next button
    // compare the 2 list to find issues

    // locate first image
    const firstImg = await page.locator('img[class="background"]').getAttribute('src');
    // click on previous button
    await page.locator('img[id="previous"]').click();
    // initialize comparison list
    const prevList = [firstImg];
    const nxtList = [firstImg];
    // locate previous image
    let previousImg = await page.locator('img[class="background"]').getAttribute('src');
    while (previousImg !== firstImg) {
      prevList.push(previousImg)
      await page.locator('img[id="previous"]').click();
      previousImg = await page.locator('img[class="background"]').getAttribute('src');
    }
    await page.locator('img[id="next"]').click();
    // locate next image
    let nextImg = await page.locator('img[class="background"]').getAttribute('src');
    while (nextImg !== firstImg) {
      nxtList.push(nextImg)
      await page.locator('img[id="next"]').click();
      nextImg = await page.locator('img[class="background"]').getAttribute('src');
    }
    prevList.sort()
    nxtList.sort()
    await expect(prevList).toEqual(nxtList);
  });

  // add more test -> with correct requierement and comments

  // help:
  // const distanceTool = page.locator('img[id="distance-tools"]');
  // const previous = page.locator('img[id="previous"]');
  // const next = page.locator('img[id="next"]');
  // https://playwright.dev/docs/selectors
  // https://www.w3schools.com/cssref/css_selectors.asp

  });

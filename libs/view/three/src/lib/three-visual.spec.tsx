import { test, expect } from '@playwright/test';

test("rendering three sphere", async ({page}) => {
  await page.goto('http://localhost:36169/iframe.html?id=view-three-sphere--normal')
  await page.waitForTimeout(3000)
  await expect(page).toHaveScreenshot("view-three-sphere--normal.png")
})

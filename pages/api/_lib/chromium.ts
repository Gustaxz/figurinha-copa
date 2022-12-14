import puppeteer, { Page } from 'puppeteer-core'
import { getOptions } from './chromeOptions'

let _page: Page | null

async function getPage(isDev: boolean): Promise<Page> {
  if (_page) {
    return _page
  }

  const options = await getOptions(isDev)
  const browser = await puppeteer.launch({...options, ignoreDefaultArgs: ['--disable-extensions']})

  _page = await browser.newPage()

  return _page
}

export async function getScreenshot(
  html: string,
  isDev: boolean
): Promise<Buffer> {
  const page = await getPage(isDev)

  await page.setViewport({ width: 360, height: 480 })
  await page.setContent(html)
  await page.evaluateHandle('document.fonts.ready');

  const file = await page.screenshot({ type: 'png' })

  return file as Buffer
}
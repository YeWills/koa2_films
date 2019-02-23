const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/`
const doubanId = '4840388'
const videoBase = `https://movie.douban.com/trailer/219491`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(base + doubanId, {
    waitUntil: 'networkidle2'
  })

  await sleep(1000)

  const result = await page.evaluate(() => {
    // 调试发现，如果在这里使用console.log()是无法在cmd上显示的，其他地方例如上面的console.log是可以显示的
    var $ = window.$
    var it = $('.related-pic-video')

    if (it && it.length > 0) {
      var link = it.attr('href')
      var cover = it.attr('style').replace(/.*url\((.*)\).*/,'$1')
      return {
        link,
        cover
      }
    }

    return {}
  })

  let video

  if (result.link) {
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })
    await sleep(2000)

    video = await page.evaluate(() => {
      var $ = window.$
      var it = $('source')

      if (it && it.length > 0) {
        return it.attr('src')
      }

      return ''
    })
  }

  const data = {
    video,
    doubanId,
    cover: result.cover
  }

  browser.close()

  process.send(data)
  process.exit(0)
})()
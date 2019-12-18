const fs  = require('fs')
const OSS = require('ali-oss')
const { oss, baiduai } = require('./config')
const AipOcrClient = require('baidu-aip-sdk').ocr
const ocr = new AipOcrClient(baiduai.APP_ID, baiduai.API_KEY, baiduai.SECRET_KEY);
const client = new OSS(oss)

module.exports = {
  async put(images) {
    const datas = []
    for (const img of images) {
      const imageContent = fs.readFileSync(img.path).toString('base64')
      await client.put(img.originalFilename, img.path)
      const word = await ocr.accurate(imageContent)
      datas.push(word)
    }
    return datas
  }
}

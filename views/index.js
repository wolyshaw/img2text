const fs  = require('fs')
const path = require('path')

module.exports = (req, res) => {
  try {
    const fileName = path.resolve(path.join(__dirname, './static/', req.url))
    const statInfo = fs.statSync(fileName)
    if (statInfo && statInfo.isFile()) {
      return fs.createReadStream(fileName).pipe(res)
    }
  } catch (error) {}
  return fs.createReadStream(path.resolve(__dirname, './static/index.html')).pipe(res)
}

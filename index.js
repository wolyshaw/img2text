const http = require('http')
const multiparty = require('multiparty')
const file = require('./file')
const views = require('./views')

http.createServer((req, res) => {
  if (req.method === 'GET') {
    return views(req, res)
  }
  if (req.method === 'POST') {
    const form = new multiparty.Form()
    form.parse(req, async (err, fields, files) => {
      try {
        const data = await file.put(files.images)
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(JSON.stringify({
          status: true,
          data
        }))
      } catch (error) {
        res.writeHead(500, {'content-type': 'application/json'})
        res.end(JSON.stringify({
          status: false,
          error
        }))
      }
    })
    return
  }
}).listen(3000)

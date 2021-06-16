const server = require('./api/server')

const port = process.env.PORT || 5500

server.listen(port, () => {
  console.log(`Server live on port ${port}`)
})
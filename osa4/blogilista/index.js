const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

app.listen(config.PORT, () => {
    logger.info(`Server running2 on port ${config.PORT}`)
})
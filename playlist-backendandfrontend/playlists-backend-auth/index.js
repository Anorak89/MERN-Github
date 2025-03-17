const app = require('./app')

const logger = require('./utils/logger')
const config = require('./utils/config')

app.listen(config.port, () => {
    logger.log(`Server running on port ${config.port}`)
})
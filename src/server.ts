import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'
import { Server } from 'http'

//=======uncaught Exception handle=======
process.on('uncaughtException', error => {
  errorlogger.error(error)
  process.exit(1)
})
let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database is connected successfully`)

    server = app.listen(config.port, () => {
      logger.info(`Application Cow Hut app listening on port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error('Field to connect Database', error)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})

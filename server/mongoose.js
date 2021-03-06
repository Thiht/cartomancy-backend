import debug from './debug'
import mongoose from 'mongoose'
import util from 'util'
import config from '../config'

mongoose.Promise = global.Promise

mongoose.connect(config.db, {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
})

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`)
})

if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) =>
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  )
}

export default mongoose

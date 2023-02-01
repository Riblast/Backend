import config from '../config/databaseConfig.js'

import FileContainer from '../services/FileContainer.js'

const MessagesApi = new FileContainer(`${config.fileSystem.path}/messages.json`)

export default MessagesApi
import config from '../config.js'

import FileContainer from '../containers/FileContainer.js'

const MessagesApi = new FileContainer(`${config.fileSystem.path}/messages.json`)

export default MessagesApi
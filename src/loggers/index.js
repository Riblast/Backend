import log4js from 'log4js'

log4js.configure({
    appenders: {
        miLoggerConsole: {type: 'console'},
        miLoggerFileWarn: {type: 'file', filename: './LOGS/warn.log'},
        miLoggerFileError: {type: 'file', filename: './LOGS/error.log'}
    },
    categories: {
        default: { appenders: ['miLoggerConsole'], level: 'trace'},
        info: {appenders: ['miLoggerConsole'], level: 'info'},
        warn: {appenders: ['miLoggerConsole'], level: 'warn'},
        error: {appenders: ['miLoggerConsole'], level: 'error'}
    }
})

export const logger = log4js.getLogger()
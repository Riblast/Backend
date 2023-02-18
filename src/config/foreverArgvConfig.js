import parseArgs from 'minimist'

const argv = parseArgs(process.argv.slice(2), {
    alias: {
        p: 'port',
        m: 'mode'
    },
    default: {
        port: process.argv.PORT || 8080,
        mode: 'fork'
    }
})

export default {
    PORT: argv.port,
    mode: argv.mode
}
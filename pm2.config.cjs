module.exports = {
    apps: [
        {
            name: 'Backend-fork',
            script: 'index.js',
            instances: 1,
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'development',
                PM2_MODE: 'fork',
                PORT: process.argv.PORT || 8080
            },
            env_production: {
                NODE_ENV: 'production',
                PM2_MODE: 'fork',
                PORT: process.argv.PORT || 8080
            },
        },
        {
            name: 'Backend-cluster',
            script: 'index.js',
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                PM2_MODE: 'cluster',
                PORT: process.argv.PORT || 8080
            },
            env_production: {
                NODE_ENV: 'production',
                PM2_MODE: 'cluster',
                PORT: process.argv.PORT || 8080
            },
        },
    ],
}
module.exports = {
    apps: [
        {
            name: 'applicant-upload-task',
            script: 'app/queues/consumers/applicants/uploads/index.js',
            args: '',
            instances: 2,
            autorestart: true,
            exec_mode: 'fork',
            watch: false,
            max_memory_restart: '1G',
            env_development: {
                NODE_ENV: 'development',
                PORT: 5006
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 5006
            },
            env_staging: {
                NODE_ENV: 'staging',
                PORT: 5006
            }
        }
    ],
    deploy: {
        production: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
};

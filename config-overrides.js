const path = require('path');
module.exports = {
    paths: (paths, env) => {
        if (env === 'production') {
            paths.appBuild = path.resolve(paths.appBuild, 'react');
            paths.publicUrlOrPath = './';
        }
        return paths;
    },
    webpack: (config, env) => {
        if (env === 'production') {
            config.devtool = false;
        }
        return config;
    },
    devServer: (configFunction) => {
        return (proxy, allowedHost) => {
            const config = configFunction(proxy, allowedHost);
            config.port = 8082
            return config
        }
    }
};
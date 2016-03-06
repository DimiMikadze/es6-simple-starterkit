const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: __dirname + '/',
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                include: [
                    path.resolve(__dirname, './src/js')
                ],
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

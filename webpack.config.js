const path = require('path');
const { mainModule } = require('process');

module.exports = {
    entry: './src/index.js',
    output:{
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    module:{
        rules:[
            {
                test: /\.css$/i,
                use:['style-loader', 'css-loader'],
            },
        ],
    },
};
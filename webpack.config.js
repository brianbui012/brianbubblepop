//actually a Node Script

//entry point  = app.js in src folder -> output
//this helps us run webpack successfully

//this is a node command to expose things in this case an object to another file
//webpack will grab this file and run it and have access to whatever we put in this object

//webpack.js.org

//__dirname is a variable that holds the path to see the absolute path to the project folder

const path = require('path');
//now we have access to path.join

//minimal set up of webpack
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(mp3|ttf)$/,
            loader: 'file-loader'
        }]
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};

//loader
//transforms an js page to how we want it ex. through babel

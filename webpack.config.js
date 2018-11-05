// need to tell webpack entry point and output 
const path = require('path')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    // define loaders
    module: {
        rules: [{
            loader:'babel-loader',
            // whenever we see a js file that's not in the node_modules folder run through babel
            test: /\.js$/,
            exclude: /node_modules/
        },{
            // allows us to support now both .css and .scss extensions for styling
            test: /\.s?css$/,
            use: ['style-loader' , 'css-loader', 'sass-loader'] // use allows us to use multiple loaders
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        contentBase: path.join(__dirname, 'public')
    }
};
// loader defines how a file transforms when we transform it


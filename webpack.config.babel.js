/* global __dirname */
"use strict";
import webpack from 'webpack';
import path from 'path';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import package_json from './package.json';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export default (env) => {

    const isProduction = env.target === 'production';
    const appVersion = package_json.version;
    const appTitle = package_json.title;

    const PATHS = {
        src: path.join(__dirname, 'src'),
        app_entry: path.join(__dirname, 'src', 'main.js'),
        output_path: path.join(__dirname, (isProduction ? 'release' : 'dev')),
        static: path.join(__dirname, 'static')     // static files to be copied to the bundle
    };

    const EXT_STYLES = [
        "https://fonts.googleapis.com/css?family=Roboto"
    ];

    const extractStyles = new ExtractTextPlugin("atommull_[hash].css", {allChunks: false});

    return {
        entry: ['babel-polyfill', PATHS.app_entry],
        output: {
            path: path.resolve(__dirname, 'release'),
            filename: 'atommull_[hash].js'
        },
        resolve: {
            alias: {
                "content": path.resolve(__dirname, "static/content.json"),
                "hero-img": path.resolve(__dirname, "static/assets/jakob-madsen-187927.jpg")
            }
        },
        plugins: [
            extractStyles,
            new webpack.NoEmitOnErrorsPlugin(),
            new CleanWebpackPlugin([PATHS.output_path], {
                root: path.resolve(path.join(__dirname, '../'))
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.styles\.css$/g,
                cssProcessor: cssnano,
                cssProcessorOptions: {discardComments: {removeAll: true}},
                canPrint: true
            }),
            new CopyWebpackPlugin(
                [{from: PATHS.static}]
            ),
            new HtmlWebpackPlugin({
                inject: 'body',
                version: appVersion,
                filename: 'index.html',
                title: appTitle,
                externalStyles: EXT_STYLES,
                template: path.join(PATHS.src, 'index.twig'),
                minify: {
                    removeComments: isProduction,
                    collapseWhitespace: isProduction,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: isProduction,
                    minifyCSS: isProduction,
                    minifyURLs: isProduction
                }
            }),
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: PATHS.src,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.twig$/,
                    include: PATHS.src,
                    exclude: /node_modules/,
                    loader: "twig-loader"
                },
                {
                    test: /\.scss$/,
                    include: PATHS.src,
                    exclude: /node_modules/,
                    use: extractStyles.extract({
                        use: [

                            {
                                loader: 'css-loader',
                                query: {
                                    context: PATHS.src,
                                    importLoaders: 2,
                                    modules: true,
                                    localIdentName: '[local]', //[name]__[local]--[hash:base64:5]', //'[local]',
                                    minimize: isProduction,
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: (loader) => [
                                        autoprefixer({
                                            browsers: ['last 2 versions']
                                        })
                                    ],
                                    sourceMap: true,
                                    sourceMapContents: isProduction
                                }
                            },
                            {
                                loader: 'sass-loader',
                                query: {
                                    context: PATHS.src,
                                    outputStyle: 'expanded',
                                    sourceMap: true,
                                    sourceMapContents: isProduction
                                }
                            }
                        ]

                    })
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
            compress: isProduction,
            stats: {
                assets: false,
                colors: true,
                modules: false,
                version: false,
                hash: false,
                timings: false,
                chunks: true,
                chunkModules: false
            },
            disableHostCheck: true,
            quiet: false,
            inline: !isProduction,
            hot: false,
            host: '0.0.0.0',
            port: 8080,
            contentBase: path.resolve(__dirname, PATHS.output_path),
            publicPath: '/'
        },
        stats: {
            colors: true
        }
    };
}
module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  output: {
    filename: './mediasoup-client.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader']
        // 1.该 Loader 是把 TypeScript 转换成 JavaScript, 只负责新语法的转换，新增的API不会自动添加polyfill
        //loader: 'awesome-typescript-loader'
      }
    ]
  }
}

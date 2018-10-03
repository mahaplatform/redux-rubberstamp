import devServer from 'webpack-dev-server'
import config from './webpack.config'
import webpack from 'webpack'
import path from 'path'
import fs from 'fs'

console.log(config)

const devserver = new devServer(webpack(config), {
  contentBase: path.resolve('public'),
  hot: true,
  // quiet: true
})

devserver.listen(3000, null, () => {

  console.log('The server is listening...')

})

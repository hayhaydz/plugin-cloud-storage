import type { Configuration as WebpackConfig } from 'webpack'
import path from 'path'

export const extendWebpackConfig = (existingWebpackConfig: WebpackConfig): WebpackConfig => {
  const newConfig: WebpackConfig = {
    ...existingWebpackConfig,
    resolve: {
      ...(existingWebpackConfig.resolve || {}),
      alias: {
        ...(existingWebpackConfig.resolve?.alias ? existingWebpackConfig.resolve.alias : {}),
        'imagekit': path.resolve(__dirname, './mock.js'),
      },
    },
  }

  return newConfig
}

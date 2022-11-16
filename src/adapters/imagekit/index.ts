import ImageKit from "imagekit"
import { ImageKitOptions } from "imagekit/dist/libs/interfaces"
import type { Adapter, GeneratedAdapter } from '../../types'
import { getGenerateURL } from './generateURL'
import { getHandler } from './staticHandler'
import { getHandleDelete } from './handleDelete'
import { getHandleUpload } from './handleUpload'
import { extendWebpackConfig } from './webpack'

export interface Args {
  options: ImageKitOptions
  acl?: 'Private' | 'Public'
}

export const imagekitAdapter =
  ({ options, acl }: Args): Adapter =>
  ({ collection, prefix }): GeneratedAdapter => {
    let storageClient: ImageKit | null = null
    const getStorageClient = () => {
      if (storageClient) return storageClient
      return (storageClient = new ImageKit(options))
    }

    return {
      handleUpload: getHandleUpload({ getStorageClient, prefix }),
      handleDelete: getHandleDelete({ getStorageClient }),
      generateURL: getGenerateURL({ getStorageClient, }),
      staticHandler: getHandler({ getStorageClient, collection }),
      webpack: extendWebpackConfig,
    }
  }

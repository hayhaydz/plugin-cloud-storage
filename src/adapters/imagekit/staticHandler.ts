import path from 'path'
import ImageKit from 'imagekit'
import type { CollectionConfig } from 'payload/types'
import type { StaticHandler } from '../../types'
import { getFilePrefix } from '../../utilities/getFilePrefix'

interface Args {
  getStorageClient: () => ImageKit
  collection: CollectionConfig
}

export const getHandler = ({ getStorageClient, collection }: Args): StaticHandler => {
  return async (req, res, next) => {
    try {
      const prefix = await getFilePrefix({ req, collection })
      const url = await getStorageClient().url({ path: path.posix.join(prefix) })
      console.log(url);

      // res.set({
      //   'Content-Length': metadata.size,
      //   'Content-Type': metadata.contentType,
      //   ETag: metadata.etag,
      // })

      return res.json({ msg: 'Hello world!' })
    } catch (err: unknown) {
      return next()
    }
  }
}

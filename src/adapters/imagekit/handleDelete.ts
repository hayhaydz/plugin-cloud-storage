import path from 'path'
import ImageKit from 'imagekit'
import type { HandleDelete } from '../../types'

interface Args {
  getStorageClient: () => ImageKit
}

export const getHandleDelete = ({ getStorageClient }: Args): HandleDelete => {
  return async ({ filename, doc: { prefix = '' } }) => {
    await getStorageClient().deleteFile(path.posix.join(prefix, filename))
  }
}

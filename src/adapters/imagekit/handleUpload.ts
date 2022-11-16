import path from 'path'
import ImageKit from 'imagekit'
import type { HandleUpload } from '../../types'

interface Args {
  prefix?: string
  getStorageClient: () => ImageKit
}

export const getHandleUpload = ({ getStorageClient, prefix = '' }: Args): HandleUpload => {
  return async ({ data, file }) => {
    const response = await getStorageClient().upload({
      file: file.buffer.toString('base64'),
      fileName: path.posix.join(prefix, file.filename),
    })

    return { ...data, ...response }
  }
}

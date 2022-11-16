import path from 'path'
import ImageKit from 'imagekit'
import type { GenerateURL } from '../../types'

interface Args {
  getStorageClient: () => ImageKit
}

export const getGenerateURL =
  ({ getStorageClient }: Args): GenerateURL =>
  async ({ filename, prefix = '' }) => {
    return decodeURIComponent(
      await getStorageClient().url({ path: path.posix.join(prefix, filename) }),
    )
  }

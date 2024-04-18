import { type NextRequest } from 'next/server'
import { decrypt } from '../utils/crypto'

export async function POST (req: NextRequest) {
  try {
    const body = await req.json()
    const decryptedData: Record<string, string> | Array<Record<string, string>> = {}
    const searchParams = req.nextUrl.searchParams
    const files = searchParams.get('files')?.split(',')
    const ignore = searchParams.get('ignore')?.split(',')
    // console.log({ files, ignore, body })

    const decryptObject = <T extends Record<string, string>> (obj: T) => {
      for (const key in obj) {
        const text = obj[key]

        if (typeof text !== 'string') {
          return Response.json({
            error: `${key} is not of type string`
          })
        }

        const [encrypted, iv] = text.split('-')

        if (encrypted === undefined && iv === undefined) {
          return Response.json({
            error: `The text of the ${key} parameter to be decrypted is invalid`
          })
        }

        const setDecryptedValue = () => {
          obj[key] = decrypt(encrypted, iv) as T[Extract<keyof T, string>]
        }

        if (files !== undefined) {
          if (files.includes(key)) setDecryptedValue()
        } else if (ignore !== undefined) {
          if (!ignore.includes(key)) setDecryptedValue()
        } else {
          setDecryptedValue()
        }
      }

      return obj
    }

    if (Array.isArray(body)) {
      const decryptedList = []

      for (const obj of body) {
        const decryptedObj = decryptObject(obj)

        if (decryptObject instanceof Response) {
          return decryptObject
        }

        decryptedList.push(decryptedObj)
      }

      return Response.json(decryptedList)
    } else {
      const decryptedObj = decryptObject(body)
      for (const key in body) {
        const text = body[key]

        if (typeof text !== 'string') {
          return Response.json({
            error: `${key} is not of type string`
          })
        }

        const [encrypted, iv] = text.split('-')

        if (encrypted === undefined && iv === undefined) {
          return Response.json({
            error: `The text of the ${key} parameter to be decrypted is invalid`
          })
        }

        decryptedData[key] = decrypt(encrypted, iv)
      }

      return Response.json(decryptedObj)
    }
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : 'An error has ocurred'
    }, { status: 400 })
  }
}

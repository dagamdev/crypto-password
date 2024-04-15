import { decrypt } from '../utils/crypto'

export async function POST (req: Request) {
  try {
    const { hash, key } = await req.json()

    if (hash === undefined) {
      return Response.json({
        error: 'hash is undefined'
      })
    }

    if (key === undefined) {
      return Response.json({
        error: 'key is undefined'
      })
    }

    const decrypted = decrypt(hash, key)

    return Response.json(decrypted)
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : 'An error has ocurred'
    }, { status: 400 })
  }
}

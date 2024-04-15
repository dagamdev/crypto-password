import { encrypt } from '../utils/crypto'

export async function POST (req: Request) {
  try {
    const { text } = await req.json()

    if (text === undefined) {
      return Response.json({
        error: 'text is undefined'
      })
    }

    const encrypted = encrypt(text)

    return Response.json(encrypted)
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : 'An error has ocurred'
    }, { status: 400 })
  }
}

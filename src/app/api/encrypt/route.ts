import { encrypt } from '../utils/crypto'

export async function POST (req: Request) {
  try {
    const body = await req.json()
    const encryptedData: Record<string, string> = {}

    for (const key in body) {
      const text = body[key]

      if (typeof text !== 'string') {
        return Response.json({
          error: `${key} is not of type string`
        })
      }

      const { encrypted, iv } = encrypt(text)
      encryptedData[key] = `${encrypted}-${iv}`
    }

    return Response.json(encryptedData)
  } catch (error) {
    console.error(error)
    return Response.json({
      error: error instanceof Error ? error.message : 'An error has ocurred'
    }, { status: 400 })
  }
}

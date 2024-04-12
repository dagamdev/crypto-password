import path from 'node:path'

export async function GET (req: Request) {
  console.log(path.basename('/hola/jaja'))
  console.log(path.basename('/hola/jaja.js'))
  return Response.json({
    message: 'pong'
  })
}

import crypto from 'node:crypto'

const alg = process.env.NEXT_PUBLIC_ALG ?? ''
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY ?? 'hola-hello'

if (alg === '') {
  throw new Error('ALG enviroment variable is undefined')
}

const key = crypto.createHash('sha256')
  .update(secretKey)
  .digest('hex').substring(0, 32)

export function encrypt (text: string) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(alg, key, iv)
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final()
  ])

  return {
    iv: iv.toString('hex'),
    encrypted: encrypted.toString('hex')
  }
}

export function decrypt (encrypted: string, iv: string) {
  const decipher = crypto.createDecipheriv(
    alg,
    key,
    Buffer.from(iv, 'hex')
  )
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'hex')),
    decipher.final()
  ])

  return decrypted.toString('utf8')
}

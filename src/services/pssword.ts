import crypto from 'node:crypto'

const secretKey = 'hol-23-js'
const key = crypto.createHash('sha256')
  .update(secretKey)
  .digest('hex').substring(0, 32)

export function encrypt (text: string) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final()
  ])
  // console.log({ encrypted })

  return {
    iv: iv.toString('hex'),
    encrypted: encrypted.toString('hex')
  }
}

export function decrypt ({ iv, encrypted }: {
  iv: string
  encrypted: string
}) {
  console.log(iv, encrypted)
  console.log(Buffer.from(iv, 'hex'))
  const decipher = crypto.createDecipheriv(
    'aes-256-ocb',
    key,
    Buffer.from(iv, 'hex')
  )
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'hex')),
    decipher.final()
  ])

  return decrypted.toString('utf8')
}

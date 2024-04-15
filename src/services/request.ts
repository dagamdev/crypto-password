import axios from 'axios'

const apiUrl = '/api/'

const api = axios.create({
  baseURL: apiUrl
})

async function encrypt <T=any> (text: string) {
  const res = await api.post<T>('encrypt', { text })
  return res.data
}

async function decrypt <T=any> (hash: string, key: string) {
  const res = await api.post<T>('decrypt', { hash, key })
  return res.data
}

export default {
  encrypt,
  decrypt
}

import axios from 'axios'

const apiUrl = '/api/'

const api = axios.create({
  baseURL: apiUrl
})

async function encrypt <T extends Record<string, string>> (data: T) {
  const res = await api.post<T>('encrypt', data)
  return res.data
}

async function decrypt <T extends Record<string, string>> (data: T) {
  const res = await api.post<T>('decrypt', data)
  return res.data
}

export default {
  encrypt,
  decrypt
}

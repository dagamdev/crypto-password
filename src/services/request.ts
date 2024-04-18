import axios from 'axios'

const apiUrl = '/api/'

const api = axios.create({
  baseURL: apiUrl
})

type BaseData = Record<string, string> | Array<Record<string, string>> | any

async function encrypt <T extends BaseData> (data: T) {
  const res = await api.post<T>('encrypt', data)
  return res.data
}

async function decrypt <T extends BaseData> (data: T, queries?: {
  files?: string
  ignore?: string
}) {
  const queriesStr = queries === undefined ? '' : '?' + new URLSearchParams(queries).toString()
  const res = await api.post<T>(`decrypt${queriesStr}`, data)
  return res.data
}

export default {
  encrypt,
  decrypt
}

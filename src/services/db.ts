import requestService from '@/services/request'

function getLocalPasswords (): Password[] {
  try {
    if (typeof localStorage === 'undefined') return []

    const str = localStorage.getItem('passwords')

    if (str === null) return []

    return JSON.parse(str)
  } catch (error) {
    return []
  }
}

async function getPasswords () {
  try {
    if (typeof localStorage === 'undefined') return []
    const encryptedPasswords = getLocalPasswords()
    const passwords = await requestService.decrypt(encryptedPasswords, {
      files: 'name'
    })

    return passwords
  } catch (error) {
    console.error('Error in getPasswords: ', error)
    return {
      error: error instanceof Error ? error.message : 'An error occurred while obtaining passwords'
    }
  }
}

async function createPassword (initData: Omit<Password, 'id'>) {
  try {
    const passwords = getLocalPasswords()
    const id = crypto.randomUUID()
    const encryptData = await requestService.encrypt(initData)

    localStorage.setItem('passwords', JSON.stringify([...passwords, {
      id,
      ...encryptData
    }]))

    return {
      id,
      name: initData.name,
      hash: encryptData.hash
    }
  } catch (error) {
    console.error('Error in createPassword: ', error)
    return {
      error: error instanceof Error ? error.message : 'An error occurred while creating the password'
    }
  }
}

async function deletePassword (passwordId: string) {
  try {
    const passwords = getLocalPasswords()
    const password = passwords.find(p => p.id === passwordId)

    if (password === undefined) {
      return {
        error: 'The password to be deleted was not found',
        passwordId
      }
    }

    localStorage.setItem('passwords', JSON.stringify(passwords.filter(p => p.id !== passwordId)))

    return password
  } catch (error) {
    console.error('Error in deletePassword: ', error)
    return {
      error: error instanceof Error ? error.message : 'An error occurred while deleting the password'
    }
  }
}

export default {
  getPasswords,
  createPassword,
  deletePassword
}

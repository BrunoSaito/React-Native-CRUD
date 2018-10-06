import Expo from 'expo'

const Store = async (key, value) => {
  let storedValue = ''

  if ('object' == typeof value) {
    Expo.SecureStore.setItemAsync(key, value)
  }
  else {
    storedValue = await Expo.SecureStore.getItemAsync(key)
    return storedValue
  }
}

export default Store
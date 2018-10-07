import Expo from 'expo'
import React, { Component } from 'react'

const Store = async (operation, key, value) => {
  let storedValue = ''

  if (operation.toLowerCase() == "set") {
    Expo.SecureStore.setItemAsync(key, value)
  }
  else if (operation.toLowerCase() == "get") {
    storedValue = await Expo.SecureStore.getItemAsync(key)
    return storedValue
  }
  else if (operation.toLowerCase() == "del") {
    await Expo.SecureStore.deleteItemAsync(key)
  }
}

export default Store

// export class Store extends Component {
//   getValue = async (key) => {
//     const fetchedValue = await Expo.SecureStore.getItemAsync(key)
//     return fetchedValue
//   }

//   setValue = async (key, value) => {
//     await Expo.SecureStore.setItemAsync(key, value)
//   }

//   deleteValue = async (key) => {
//     await Expo.SecureStore.deleteItemAsync(key)
//   }
// }
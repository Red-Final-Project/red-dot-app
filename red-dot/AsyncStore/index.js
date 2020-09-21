import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('USER', jsonValue)
      console.log('success')
    } catch (e) {
      console.log(e)
    }
  }

export  const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }
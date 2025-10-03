import AsyncStorage from '@react-native-async-storage/async-storage';

const SEEN_INTRO_KEY = 'verde_seen_intro';

export async function getSeenIntro() {
  try {
    const value = await AsyncStorage.getItem(SEEN_INTRO_KEY);
    return value === 'true';
  } catch (error) {
    if (__DEV__) {
      console.warn('[storage] Failed to read intro flag', error);
    }
    return false;
  }
}

export async function setSeenIntro(value) {
  try {
    await AsyncStorage.setItem(SEEN_INTRO_KEY, value ? 'true' : 'false');
  } catch (error) {
    if (__DEV__) {
      console.warn('[storage] Failed to write intro flag', error);
    }
  }
}

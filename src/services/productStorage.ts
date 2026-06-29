import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const KEY = "products";

export async function saveProducts(data: string) {
  if (Platform.OS === "web") {
    localStorage.setItem(KEY, data);
    return;
  }

  await SecureStore.setItemAsync(KEY, data);
}

export async function getProducts() {
  if (Platform.OS === "web") {
    return localStorage.getItem(KEY);
  }

  return await SecureStore.getItemAsync(KEY);
}
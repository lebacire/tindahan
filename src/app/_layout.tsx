import { Stack, router } from "expo-router";
import { useEffect } from "react";

import {
  useAuthStore
} from "../store/authStore";


export default function RootLayout() {

  const user = useAuthStore(
    (state) => state.user
  );

  const loadUser = useAuthStore(
    (state) => state.loadUser
  );

  const hydrated = useAuthStore(
    (state)=>state.hydrated
  );

  useEffect(() => {
    loadUser();
  }, []);



  useEffect(() => {

    if(!hydrated) return;

    if (user) {
      router.replace("/tabs/home");
    } else {
      router.replace("/login");
    }

  }, [user, hydrated]);

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
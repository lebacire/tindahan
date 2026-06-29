import { router } from "expo-router";
import {
    StyleSheet,
    View,
} from "react-native";
import { useAuthStore } from "../store/authStore";

import Input from "../components/forms/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Typography from "../components/ui/Typography";


export default function LoginScreen() {
    const login = useAuthStore(
        (state)=>state.login
    );
    return (
        <View style={styles.container}>
            <Card>
                <Typography variant="title">
                    Login
                </Typography>

                <Input
                    placeholder="Email"
                />

                <Input
                    placeholder="Password"
                    secureTextEntry
                />

                <Button
                    title="Login"
                    onPress={async()=>{
                        await login("user@test.com");
                        router.replace("/tabs/home");
                    }}
                />
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    }
});
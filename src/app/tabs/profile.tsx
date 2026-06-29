import {
    StyleSheet,
    View
} from "react-native";
import { useAuthStore } from "../../store/authStore";

import Typography from "../../components/ui/Typography";


export default function Profile() {
    const user = useAuthStore(
    (state)=>state.user
    );
    console.log("User in Profile:", user);
    return (
        <View style={styles.container}>
            <Typography variant="title">
                Profile
            </Typography>
            <Typography>
                {user?.email ?? "Guest"}
            </Typography>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
});
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { RoundedButton } from "../../components/common/Button";
import CustomText from "../../components/common/Text";
import { Colors } from "../../Constants";
import { auth } from "../../firebase/firebase";

export const HomeScreen = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        },
        takeButton: {
            borderWidth: 2,
            borderColor: Colors.foreground,
            marginVertical: 20,


        },
        createButton: {
            backgroundColor: Colors.confirm,
            borderWidth: 2,
            marginVertical: 20,
        }
    })

    return (
        <View style={styles.container} >
            <CustomText h1 navbar>Welcome , {auth.currentUser.displayName}</CustomText>
            <View>
                <RoundedButton
                    large
                    onPress={() => navigation.navigate("Create")}
                    style={styles.createButton}
                >
                    <CustomText p2 white style={{ paddingHorizontal: 10 }}>Create Survey</CustomText>
                </RoundedButton>
                <RoundedButton
                    large
                    onPress={() => navigation.navigate("Take")}
                    style={styles.takeButton}
                >
                    <CustomText p2 white style={{ paddingHorizontal: 10 }}>Take Survey</CustomText>
                </RoundedButton>

            </View>
        </View>
    )
}
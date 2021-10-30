import * as React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Avatar, Badge } from "react-native-elements";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import Home from "../Screens/HomeScreen";
import Contact from "../Screens/ContactScreen";

function CustomDrawerContent(props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.drawerHeader}>
        <View style={styles.position}>
          <View style={styles.userProfile}>
            {/* <Image
              source={require("../Images/dp1.jpg")}
              style={styles.Avatar}
            /> */}

            <Avatar
              rounded
              source={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
              }}
              title="md"
              size="large"
            />
            <Badge
              status="success"
              containerStyle={{
                position: "absolute",
                top: 17,
                right: -2,
              }}
            />
          </View>

          <Text style={styles.drawerHeaderText}>Anshuman Dash</Text>
        </View>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={() => (
            <Icon
              name={Platform.OS === "ios" ? "ios-close" : "md-close"}
              color="black"
              size={22}
            />
          )}
          label="Close Drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
      </DrawerContentScrollView>
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Contact" component={Contact} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#03cafc",
    height: 200,
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  drawerHeaderText: {
    marginTop: 5,
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  userProfile: {
    display: "flex",
    marginTop: 20,
  },
  Avatar: {
    width: 100,
    height: 100,
  },
  position: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

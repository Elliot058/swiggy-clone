import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#03cafc",
      }}
    >
      <Text style={{ fontSize: 20, color: "#ffffff", fontWeight: "800" }}>
        Home Screen
      </Text>
    </View>
  );
}

function Contact({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c203fc",
      }}
    >
      <Text style={{ fontSize: 20, color: "#ffffff", fontWeight: "800" }}>
        Contact Screen
      </Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
function About({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#48d969",
      }}
    >
      <Text style={{ fontSize: 20, color: "#ffffff", fontWeight: "800" }}>
        About Screen
      </Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={Platform.OS === "ios" ? "ios-home" : "md-home"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarLabel: "Contact",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={Platform.OS === "ios" ? "ios-contacts" : "md-call"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={
                Platform.OS === "ios"
                  ? "ios-information-circle"
                  : "md-information-circle"
              }
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function BottomTabNavigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

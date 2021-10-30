import * as React from "react";
import { View, Text } from "react-native";

function OrderDelivery() {
  function renderMap() {
    return (
      <View>
        <Text>Hii</Text>
      </View>
    );
  }
  return <View style={{ flex: 1 }}>{renderMap()}</View>;
}

export default OrderDelivery;

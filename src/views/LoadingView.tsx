import { StyleSheet, Text, View } from "react-native";

export default function LoadingView() {
  return (
    <View style={loadingViewStyle.container}>
      <Text>Loading...</Text>
    </View>
  )
}

const loadingViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

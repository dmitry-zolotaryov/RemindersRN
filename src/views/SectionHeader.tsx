import { PropsWithChildren } from "react";
import { JSX } from "react";
import { StyleSheet, Text } from "react-native";
import { Divider, List } from "react-native-paper"; 

type SectionHeaderProps = {
  children: string
}

export default function SectionHeader({children}: SectionHeaderProps) {
  return (
    <List.Section style={sectionHeaderStyle.container} title={children}>
      <Divider />
    </List.Section>
  )
}

const sectionHeaderStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: 0,
    padding: 0,
  },
  text: {
    margin: 0,
  },
});
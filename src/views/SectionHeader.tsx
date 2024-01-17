import { PropsWithChildren } from "react";
import { JSX } from "react";
import { Text } from "@ui-kitten/components";

type SectionHeaderProps = {
  children: string
}

export default function SectionHeader({children}: SectionHeaderProps) {
  return (
    <Text category="s1">{children}</Text>
  )
}
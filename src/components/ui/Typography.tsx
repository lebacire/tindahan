import React from "react";
import {
    StyleSheet,
    Text,
    TextProps,
} from "react-native";

import { colors } from "../../theme";


type Props = TextProps & {
  children: React.ReactNode;
  variant?: "title" | "body" | "caption";
};


export default function Typography({
  children,
  variant = "body",
  style,
  ...props
}: Props) {

  return (
    <Text
      {...props}
      style={[
        styles.base,
        styles[variant],
        style,
      ]}
    >
      {children}
    </Text>
  );
}


const styles = StyleSheet.create({

  base:{
    color: colors.text,
  },


  title:{
    fontSize:24,
    fontWeight:"700",
  },


  body:{
    fontSize:16,
  },


  caption:{
    fontSize:13,
    color:"#64748B",
  },

});
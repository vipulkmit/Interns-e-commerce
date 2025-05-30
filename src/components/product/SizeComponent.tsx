import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { sizeProps } from '../../models/HomePage.type'
import { Typography } from '../../theme/Colors'
import useAuthStore from '../../stores/useAuthStore'

const SizeComponent = ({
    size,
    onClick,
    selectedSize
}: sizeProps) => {
    const themeMode = useAuthStore((state) => state.theme);
  const theme =
    themeMode === "dark"
      ? {
          background: Typography.Colors.black,
          text: Typography.Colors.white,
        }
      : {
          background: Typography.Colors.white,
          text: Typography.Colors.black,
        };
    return (
        <Pressable 
            style={[
                styles.sizeBox, 
                selectedSize && styles.selectedSize
            ]} 
            onPress={onClick}
        >
            <Text style={styles.sizeText}>{size}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    sizeBox: {
        backgroundColor: Typography.Colors.white,
        height: 42,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        borderWidth: 1,
        borderColor: Typography.Colors.white,
        margin: 5,
        borderRadius: 4,
    },
    selectedSize: {
        borderWidth: 3,
        borderColor: Typography.Colors.darkruby,
    },
    sizeText: {
        color: Typography.Colors.lightblack,
        fontSize: 12,
        fontFamily: Typography.font.regular,
    },
})

export default SizeComponent
// import { View, Text, StyleSheet, Pressable } from 'react-native'
// import React from 'react'
// import { sizeProps } from '../../models/HomePage.type'
// import { Typography } from '../../theme/Colors'

// const SizeComponent = ({
//     size,
//     onClick,
//     selectedSize
// }: sizeProps) => {
//     return (
//         <Pressable style={[styles.sizeBox, {
//             borderWidth: selectedSize ? 3 : 1,
//             borderColor: selectedSize?Typography.Colors.black:Typography.Colors.white,
//         }]} onPress={onClick}>
//             <Text style={styles.sizeText}>{size}</Text>
//         </Pressable>
//     )
// }

// const styles = StyleSheet.create({
//     sizeBox: {
//         backgroundColor: Typography.Colors.white,
//         height: 42,
//         width: 42,
//         // paddingRight:17,
//         alignItems: 'center',
//         justifyContent: 'center',
//         elevation: 2,
//         // shadowOpacity:
//         // flex:1
//         // gap:17
//     },
//     sizeText: {
//         color: Typography.Colors.lightblack,
//         fontSize: 12,
//         fontFamily: Typography.font.regular,
//         // textAlign:'center'
//         // alignSelf:'center'
//         // paddingLeft:8
//         // alignSelf:'center'
//     },
// })

// export default SizeComponent



import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { sizeProps } from '../../models/HomePage.type'
import { Typography } from '../../theme/Colors'

const SizeComponent = ({
    size,
    onClick,
    selectedSize
}: sizeProps) => {
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
        borderWidth: 2,
        borderColor: Typography.Colors.lightgrey,
    },
    sizeText: {
        color: Typography.Colors.lightblack,
        fontSize: 12,
        fontFamily: Typography.font.regular,
    },
})

export default SizeComponent
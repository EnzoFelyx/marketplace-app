import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"


export default function Product() {

    const { id } = useLocalSearchParams<{ id: string }>()

    return (
        <View>
            <Text>Detalhes do produto: {id}</Text>
        </View>
    )
}
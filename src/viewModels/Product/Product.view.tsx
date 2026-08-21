import { FC } from "react"
import { FlatList, Text, View } from "react-native"
import { useProductViewModel } from "./useProduct.viewModel"
import { SafeAreaView } from "react-native-safe-area-context"
import { Header } from "./components/Header"

export const ProductView: FC<ReturnType<typeof useProductViewModel>> = ({
    error,
    isLoading,
    productDetails
}) => {

    if (error) {
        return <Text>Houve um erro ao carregar os detalhes do produto.</Text>
    }

    if (!productDetails) {
        return null
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <FlatList
                data={[]}
                renderItem={() => <></>}
                ListHeaderComponent={<Header productDetails={productDetails} />}
                className="px-6"
            />
        </SafeAreaView>
    )
}
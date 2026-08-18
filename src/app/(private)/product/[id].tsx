import { ProductView } from "@/viewModels/Product/Product.view"
import { useProductViewModel } from "@/viewModels/Product/useProduct.viewModel"
import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"


export default function Product() {

    const { id } = useLocalSearchParams<{ id: string }>()

    const viewModel = useProductViewModel(Number(id))

    return (
        <ProductView {...viewModel} />
    )
}
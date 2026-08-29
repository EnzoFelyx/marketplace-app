import { ProfileView } from "@/viewModels/Profile/Profile.view"
import { useProfileViewModel } from "@/viewModels/Profile/useProfile.viewModel"


export default function Product() {

    const viewModel = useProfileViewModel()

    return (
        <ProfileView {...viewModel} />
    )
}
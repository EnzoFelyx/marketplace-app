import { RegisterView } from "@/viewModels/Register/Register.view";
import { useRegisterViewModal } from "@/viewModels/Register/useRegister.viewModel";

export default function Register() {

    const props = useRegisterViewModal();

    return (
        <RegisterView {...props} />
    )
}
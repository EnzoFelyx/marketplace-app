import { RegisterView } from "../viewModels/Register/Register.viewModal";
import { useRegisterViewModal } from "../viewModels/Register/useRegister.view";

export default function Register() {

    const props = useRegisterViewModal();

    return (
        <RegisterView {...props} />
    )
}
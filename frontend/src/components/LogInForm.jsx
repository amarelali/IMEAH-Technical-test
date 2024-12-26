import { formLogInFields } from "../data";
import { AuthForm } from "./AuthForm";

const LogInForm = () => {
    const initialFormState = { email: "", password: "" }
    return (
        <AuthForm fields={formLogInFields} defaultState={initialFormState} apiEndPoint={"/users/login"} title={"Log In"} />
    );
}

export default LogInForm;
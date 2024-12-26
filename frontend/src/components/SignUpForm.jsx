import { formSignUpFields } from "../data";
import { AuthForm } from "./AuthForm";

const SignUpForm = () => {
    const initialFormState = { name: "", email: "", password: "" }

    return (
        <AuthForm fields={formSignUpFields} defaultState={initialFormState} apiEndPoint={"/users/signup"} title={"Sign Up"} />
    );
}

export default SignUpForm;
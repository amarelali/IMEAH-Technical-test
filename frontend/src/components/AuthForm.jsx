import { Box, TextField } from "@mui/material";
import PropTypes from "prop-types";
import CustomButton from "./ui/CustomButton";
import { useState } from "react";
import axiosInstance from "../config/axios.config";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

export const AuthForm = ({ fields, defaultState, title, apiEndPoint }) => {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        ...defaultState
    });

    const [errors, setErrors] = useState({
        ...defaultState
    });
    const [isLoading, setIsLoading] = useState(false);
    const onChangeInputValue = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        fields.forEach(({ name, required, validation, validationMessage }) => {
            newErrors[name] = "";
            if (required && !formData[name].trim() && !new RegExp(validation).test(formData[name])) {
                newErrors[name] = validationMessage;
                isValid = false;
            }
        });
        setErrors(newErrors);
        return isValid;
    };
    console.log("isLoggedIn", isLoggedIn);
    console.log("user", user);
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            setIsLoading(true);
            const { data, status } = await axiosInstance.post(apiEndPoint, formData);
            if (status == 201) {
                toast.success('User LoggedIn Successfully');
                console.log(`data ${data}`);
                setIsLoading(false);
                setTimeout(() => {
                    location.replace("/dashboard");
                }, 1000);
                setFormData(defaultState);
                dispatch(login(data));
            } else {
                toast.error(`Error: ${data.message || "Something went wrong"}`);
            }
        } catch (err) {
            setIsLoading(false);
            console.log("Error while logging in", err);
        }
    }

    return (
        <>
            <form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {fields.map(({ name, label, variant, type }) => (
                            <TextField
                                key={name}
                                name={name}
                                label={label}
                                variant={variant}
                                type={type}
                                value={formData[name]}
                                error={Boolean(errors[name])}
                                onChange={onChangeInputValue}
                                helperText={errors[name] || ""}
                            />
                        ))}
                    </Box>
                    <CustomButton onClick={onSubmit} isLoading={isLoading}>{title}</CustomButton>
                </Box>
            </form>
        </>
    );
}

AuthForm.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            variant: PropTypes.string,
            type: PropTypes.string.isRequired,
        })
    ).isRequired,
    defaultState: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    apiEndPoint: PropTypes.string.isRequired,
};
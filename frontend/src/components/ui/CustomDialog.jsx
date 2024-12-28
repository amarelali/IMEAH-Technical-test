import { Dialog, DialogTitle, } from "@mui/material";
import PropTypes from 'prop-types';

export const CustomDialog = ({ title, children, isOpened, onClose }) => {

    return (
        <Dialog open={isOpened} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            {children}
        </Dialog>
    )
}

CustomDialog.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};  

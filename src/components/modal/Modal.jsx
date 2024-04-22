import PropTypes from 'prop-types';

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    children: PropTypes.node, // Any valid React nodes
    isOpen: PropTypes.bool.isRequired, // This prop is required and must be a boolean
    onClose: PropTypes.func.isRequired // This prop is required and must be a function
};

export default Modal;

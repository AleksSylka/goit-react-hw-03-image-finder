import { Component } from "react";
import { Overlay, Modal } from "components/Modal/Modal.styled";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

export class ModalWindow extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
            if (e.code === 'Escape') {
                console.log(this.props)
                this.props.onClose();
            }
    }
    
    handleOverlay = e => {
        console.log(e)
        if (e.currentTarget === e.target) {
            this.props.onClose()
        }
    }
    
    render() {
        return createPortal(<Overlay onClick={this.handleOverlay}>
            <Modal>
                {this.props.children}
            </Modal>
        </Overlay>, modalRoot)
    }
}
                
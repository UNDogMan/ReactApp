import React, {createContext, createRef, useContext, useState} from "react";
import {Button, Form, Modal, ModalBody, ModalFooter, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

interface ModalBuilder {
    headerText?: string,
    body?: () => JSX.Element,
    submitButtonText?: string,

    submitAction: (e: React.FormEvent<HTMLFormElement>) => void,

    hidden: boolean,
}

interface ModalConstruct extends ModalBuilder {
    hideModal: () => void,
    showModal: (modal: ModalBuilder) => void,
}

const initialState: ModalConstruct = {
    headerText: undefined,
    body: undefined,
    submitButtonText: undefined,
    submitAction: () => {},
    hidden: true,

    hideModal: () => {},
    showModal: () => {},
};

const GlobalModalContext = createContext(initialState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModal: React.FC<{}> = ({ children }) => {
    const [modal, setModal] = useState(initialState);

    const showModal = (modal: ModalBuilder) => {
        console.log(modal)
        setModal({
            ...modal,
            hideModal,
            showModal
        });
    };

    const hideModal = () => {
        setModal({
            ...initialState
        });
    };

    const renderComponent = () => {
        if(modal.hidden)
            return;

        return(
                <Modal
                    show={!modal.hidden}
                    onHide={hideModal}
                >
                    <Form noValidate validated={true} onSubmit={modal.submitAction}>
                        { modal.headerText ? (
                            <ModalHeader closeButton>
                                <ModalTitle>{modal.headerText}</ModalTitle>
                            </ModalHeader>
                            ) : null }
                        { modal.body ? (
                            <ModalBody>
                                {modal.body()}
                            </ModalBody>
                        ) : null }
                        { modal.submitButtonText ? (
                            <ModalFooter>
                                <Button type={'submit'}>{modal.submitButtonText}</Button>
                            </ModalFooter>
                        ) : null }
                    </Form>
                </Modal>
        );
    };

    return (
        <GlobalModalContext.Provider value={ { ...modal, hideModal, showModal} }>
            {renderComponent()}
            {children}
        </GlobalModalContext.Provider>
    );
}
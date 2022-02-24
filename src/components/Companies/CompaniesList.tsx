import {Button, ButtonGroup, ButtonToolbar, FormControl, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";
import {Company} from "../../data/interfaces";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../data/db";
import {useGlobalModalContext} from "../Modal/GlobalModal";
import {CompanyForm} from "./CompanyForm";
import React, {useState} from "react";

export const CompaniesList = (props:{selected:number, onSelectionChange:(x:number) => void}) => {
    const [ visible, setVisibility] = useState(false);
    const [ searchText, setSearchText] = useState("");

    let stList:Array<Company> = useLiveQuery(() =>
        db.companyList
            .filter((x) => new RegExp(searchText).test(x.name))
            .toArray(), [searchText]) ?? [];

    const { hideModal, showModal } = useGlobalModalContext()
    const OpenCreateModal = () => {
        let data:Company = {name:""};

        showModal({
            headerText: 'Add Company',
            submitButtonText: 'Submit',
            body: () => CompanyForm(data),

            submitAction: (event) => {
                const form = event.currentTarget;

                event.preventDefault();
                event.stopPropagation();

                if (!form.checkValidity()) {
                    return;
                }

                db.companyList.put(data);

                hideModal();
            },

            hidden: false
        });
    }
    const OpenEditModal = (company?: Company) => {
        const data: Company = company ?? {name:""};

        showModal({
            headerText: 'Edit Company ' + data.name,
            submitButtonText: 'Submit',
            body: () => CompanyForm(data),

            submitAction: (event) => {
                const form = event.currentTarget;

                event.preventDefault();
                event.stopPropagation();

                if (!form.checkValidity()) {
                    return;
                }

                db.companyList.put(data);

                hideModal();
            },

            hidden: false
        });
    }
    const OpenDeleteModal = (company?: Company) => {
        const data: Company = company ?? {name:""};

        showModal({
            headerText: 'Delete Company ' + data.name,
            submitButtonText: 'Submit',
            body: () => (
                <p>Are you sure to delete company {data.name}?</p>
            ),

            submitAction: (event) => {
                event.preventDefault();
                event.stopPropagation();

                db.companyList.delete(data.id ?? 0);

                hideModal();
            },

            hidden: false
        });
    }

    return (
        <div>
            <ButtonToolbar className="mb-2">
                <ButtonGroup className="me-2">
                    <Button onClick={() => OpenCreateModal()}>Add</Button>
                </ButtonGroup>
                {!!props.selected ? (
                    <ButtonGroup className="me-2">
                        <Button onClick={() => OpenEditModal(stList.find(x => x.id === props.selected))}>Edit</Button>
                        <Button onClick={() => OpenDeleteModal(stList.find(x => x.id === props.selected))}>Delete</Button>
                    </ButtonGroup>
                ): null }
                <ButtonGroup className="me-2">
                    <Button onClick={() => { setVisibility(!visible); setSearchText("");}}>Search</Button>
                </ButtonGroup>
            </ButtonToolbar>
            <InputGroup className="mb-2" hidden={!visible}>
                <InputGroup.Text>Name</InputGroup.Text>
                <FormControl type={'text'} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
            </InputGroup>
            <ListGroup>
            {stList?.map((val) => (
                <ListGroupItem
                    key={val.id}
                    active={val.id === props.selected}
                    onClick={() => props.onSelectionChange(val.id || 0)}>{
                    val.name}
                </ListGroupItem>
            ))}
        </ListGroup>
        </div>
    )
}

export default CompaniesList;
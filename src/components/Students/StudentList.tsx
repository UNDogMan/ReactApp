import {Button, ButtonGroup, ButtonToolbar, FormControl, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";
import {Company, Spec, Student} from "../../data/interfaces";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../data/db";
import React, {useState} from "react";
import {StudentForm} from "./StudentForm";
import {useGlobalModalContext} from "../Modal/GlobalModal";

export const StudentList = (props:{selected:number, onSelectionChange:(x:number) => void}) => {
    const [ visible, setVisibility] = useState(false);
    const [ searchText, setSearchText] = useState("");

    let students: Student[] = useLiveQuery(() =>
        db.studentList
            .filter(x => new RegExp(searchText).test([x.name, x.group, x.spec, x.year.toString()].join("_")))
            .toArray()
    ,[searchText], []);

    const spec: Spec[] = useLiveQuery(() => db.specList.toArray(), [], []);

    const { hideModal, showModal } = useGlobalModalContext()
    const OpenCreateModal = () => {
        let data = {
            name: "",
            spec: "",
            group: 1,
            year: 2000
        };

        showModal({
            headerText: 'Add Student',
            submitButtonText: 'Submit',
            body: () => StudentForm(data, spec),

            submitAction: (event) => {
                const form = event.currentTarget;

                event.preventDefault();
                event.stopPropagation();

                if (!form.checkValidity()) {
                    return;
                }

                db.studentList.put(data);

                hideModal();
            },

            hidden: false
        });
    }
    const OpenEditModal = (data?: Student) => {
        let student = data ?? {} as Student;

        showModal({
            headerText: 'Edit Student ' + student.name,
            submitButtonText: 'Submit',
            body: () => StudentForm(student, spec),

            submitAction: (event) => {
                const form = event.currentTarget;

                event.preventDefault();
                event.stopPropagation();

                if (!form.checkValidity()) {
                    return;
                }

                db.studentList.put(student);

                hideModal();
            },

            hidden: false
        });
    }
    const OpenDeleteModal = (data?: Student) => {
        const student: Company = data ?? {name:""};

        showModal({
            headerText: 'Delete Student ' + student.name,
            submitButtonText: 'Submit',
            body: () => (
                <p>Are you sure to delete {student.name}?</p>
            ),

            submitAction: (event) => {
                event.preventDefault();
                event.stopPropagation();

                db.studentList.delete(student.id ?? 0);

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
                        <Button onClick={() => OpenEditModal(students.find(x => x.id === props.selected))}>Edit</Button>
                        <Button onClick={() => OpenDeleteModal(students.find(x => x.id === props.selected))}>Delete</Button>
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
                {students?.map((val) => (
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

export default StudentList;
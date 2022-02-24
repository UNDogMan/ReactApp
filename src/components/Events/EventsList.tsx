import {Button, ButtonGroup, ListGroup, ListGroupItem, Stack} from "react-bootstrap";
import {Company, Student, StudentEvent} from "../../data/interfaces";
import {useLiveQuery} from "dexie-react-hooks";
import {db, getEvents} from "../../data/db";
import {Collection} from "dexie";
import React from "react";
import {useGlobalModalContext} from "../Modal/GlobalModal";
import {EventForm} from "./EventForm";

export const EventList = (props:{events: Collection<StudentEvent, number>, showAdd?: boolean, initialAddData?: any}) => {
    const eventsList =
        useLiveQuery(() => getEvents(props.events),
            [props.events]);
    const students = useLiveQuery(() => db.studentList.toArray(), [], [] as Student[]);
    const companies = useLiveQuery(() => db.companyList.toArray(), [], [] as Company[]);


    const { hideModal, showModal } = useGlobalModalContext()
    const OpenCreateModal = () =>  {
        let data: StudentEvent = props.initialAddData || {
            date: "",
            text: "",
            studentId: 1,
            companyId: null,

            company: undefined,
            student: undefined
        };

        showModal({
            headerText: 'Add Event',
            submitButtonText: 'Submit',
            body: () => EventForm(data, students, companies),

            submitAction: (event) => {
                const form = event.currentTarget;

                event.preventDefault();
                event.stopPropagation();

                if (!form.checkValidity()) {
                    return;
                }

                db.eventList.put(data);

                hideModal();
            },

            hidden: false
        });
    }
    const OpenEditModal = (event?: StudentEvent) => {
        let data = event ?? {} as StudentEvent;

        showModal({
            headerText: 'Edit Event',
            submitButtonText: 'Submit',
            body: () => EventForm(data, students, companies),

            submitAction: (event) => {
                const form = event.currentTarget;

                event.preventDefault();
                event.stopPropagation();

                if (!form.checkValidity()) {
                    return;
                }

                db.eventList.put(data);

                hideModal();
            },

            hidden: false
        });
    }
    const OpenDeleteModal = (data?: StudentEvent) => {
        const studentEvent: StudentEvent = data ?? {} as StudentEvent;

        showModal({
            headerText: 'Delete Event ',
            submitButtonText: 'Submit',
            body: () => (
                <p>Are you sure to delete {studentEvent.text} {studentEvent.student?.name} {studentEvent.company?.name}?</p>
            ),

            submitAction: (event) => {
                event.preventDefault();
                event.stopPropagation();

                db.eventList.delete(studentEvent.id ?? 0);

                hideModal();
            },

            hidden: false
        });
    }

    if(!eventsList)
        return null;

    return (
        <>
            {props.showAdd ? (<Button className={'mb-2'} onClick={() => OpenCreateModal()}>Add</Button>) : null}
            <ListGroup>
                {eventsList?.map((val) => (
                    <ListGroupItem
                        key={val.id}>
                        <Stack direction="horizontal" gap={3}>
                            <div>{val.date} - {val.student?.name} - {val.text} - {val.company?.name}</div>
                            <div className={'ms-auto'}>
                                <ButtonGroup>
                                    <Button onClick={() => OpenEditModal(val)} size="sm">Edit</Button>
                                    <Button onClick={() => OpenDeleteModal(val)} size="sm">Delete</Button>
                                </ButtonGroup>
                            </div>
                        </Stack>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </>
    )
}

export default EventList;
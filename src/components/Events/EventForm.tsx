import {Company, Student, StudentEvent} from "../../data/interfaces";
import {Form, FormControl, FormGroup} from "react-bootstrap";
import React from "react";

export const EventForm = (data:StudentEvent, students: Student[], companies: Company[]) => {

    return (
        <div>
            <FormGroup className={'mb-1'}>
                <Form.Label>Event</Form.Label>
                <FormControl type={'text'}
                             defaultValue={data.text}
                             required
                             onChange={(e) => {data.text = e.target.value} }/>
                <FormControl.Feedback type="invalid">
                    Please enter a Event Text.
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup className={'mb-1'}>
                <Form.Label>Date</Form.Label>
                <FormControl type={'date'}
                             defaultValue={data.date}
                             required
                             onChange={(e) => {data.date = e.target.value} }/>
                <FormControl.Feedback type="invalid">
                    Please enter a Date.
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup className={'mb-1'}>
                <Form.Label>Student</Form.Label>
                <Form.Select defaultValue={data.studentId}
                             required
                             onChange={(e) => {data.studentId = Number(e.target.value)} }>
                    {students.map(x =>
                        (<option value={x.id}>{x.name}</option>)
                    )}
                </Form.Select>
                <FormControl.Feedback type="invalid">
                    Please choose a Student.
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup className={'mb-1'}>
                <Form.Label>Company</Form.Label>
                <Form.Select defaultValue={data.companyId ?? 0}
                             required
                             onChange={(e) => {data.companyId = Number(e.target.value)} }>
                    <option value={0}>No Company</option>
                    {companies.map(x =>
                        (<option value={x.id}>{x.name}</option>)
                    )}
                </Form.Select>
                <FormControl.Feedback type="invalid">
                    Please choose a Company.
                </FormControl.Feedback>
            </FormGroup>
        </div>
    );
}


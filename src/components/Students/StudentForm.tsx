import {Spec, Student} from "../../data/interfaces";
import {Form, FormControl, FormGroup} from "react-bootstrap";
import React from "react";

export const StudentForm = (data:Student, spec: Spec[]) => {

    return (
        <div>
            <FormGroup className={'mb-1'}>
                <Form.Label>Name</Form.Label>
                <FormControl type={'text'}
                             defaultValue={data.name}
                             required
                             onChange={(e) => {data.name = e.target.value} }/>
                <FormControl.Feedback type="invalid">
                    Please enter a Name.
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup className={'mb-1'}>
                <Form.Label>Spec</Form.Label>
                <Form.Select defaultValue={data.spec}
                             required
                             onChange={(e) => {data.spec = e.target.value} }>
                    <option value={''}>None</option>
                    {spec.map(x =>
                        (<option>{x.name}</option>)
                    )}
                </Form.Select>
                <FormControl.Feedback type="invalid">
                    Please choose a Spec.
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup className={'mb-1'}>
                <Form.Label>Group</Form.Label>
                <Form.Select defaultValue={data.group}
                             required
                             onChange={(e) => {data.group = Number(e.target.value)} }>
                    {Array.from({length: 10}, (_, i) => i + 1).map(x =>
                        (<option>{x}</option>)
                    )}
                </Form.Select>
                <FormControl.Feedback type="invalid">
                    Please choose a Group.
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup className={'mb-1'}>
                <Form.Label>Year</Form.Label>
                <Form.Select defaultValue={data.year}
                             required
                             onChange={(e) => {data.year = Number(e.target.value)} }>
                    {Array.from({length: 100}, (_, i) => i + 2000).map(x =>
                        (<option>{x}</option>)
                    )}
                </Form.Select>
                <FormControl.Feedback type="invalid">
                    Please choose a Year.
                </FormControl.Feedback>
            </FormGroup>
        </div>
    );
}


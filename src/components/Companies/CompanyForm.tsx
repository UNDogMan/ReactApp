import {Company} from "../../data/interfaces";
import {FormControl, FormGroup, InputGroup} from "react-bootstrap";
import React from "react";

export const CompanyForm = (data:Company) => {
    return (
            <InputGroup hasValidation>
                <InputGroup.Text>Name</InputGroup.Text>
                <FormControl type={'text'}
                             defaultValue={data.name}
                             required
                             onChange={(e) => {data.name = e.target.value} }/>
                <FormControl.Feedback type="invalid">
                    Please enter a Name.
                </FormControl.Feedback>
            </InputGroup>
    );
}


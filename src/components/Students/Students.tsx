import {Container, Row, Col, ButtonGroup, Button, ButtonToolbar} from "react-bootstrap";

import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
import {useState} from "react";


export const Students = () => {
    let [selected, changeSelection] = useState(0);

    return (
        <>
            <Row>
                <Col sm={4}>
                    <StudentList
                        selected={selected}
                        onSelectionChange={changeSelection}/>
                </Col>
                <Col sm={8}>
                    <StudentDetails
                        selected={selected}/>
                </Col>
            </Row>
        </>
    )
}
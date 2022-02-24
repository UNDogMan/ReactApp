import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../data/db";
import {Student} from "../../data/interfaces";
import {Col, Container, Row} from "react-bootstrap";
import EventList from "../Events/EventsList";

export const StudentDetails = (props:{selected:number}) =>{
    let student : Student | undefined =
        useLiveQuery(() => db.studentList.get(props.selected), [props.selected]);

    let detailRow = () => {
        if(student)
            return(
                <Row>
                    <Col>
                        <p>{student?.name} - {student?.spec} - {student?.group} - {student?.year}</p>
                    </Col>
                </Row>
            );
        return null;
    }

    return (
        <Container>
            {detailRow()}
            <Row>
                <Col>
                    <EventList
                        events={db.eventList.where('studentId').equals(props.selected)}
                        showAdd={props.selected > 0}
                        initialAddData={{studentId:props.selected}}/>
                </Col>
            </Row>
        </Container>
    );
}

export default StudentDetails;
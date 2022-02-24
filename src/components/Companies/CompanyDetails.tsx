import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../data/db";
import {Company} from "../../data/interfaces";
import {Col, Container, Row} from "react-bootstrap";
import EventList from "../Events/EventsList";

export const CompanyDetails = (props:{selected:number}) =>{
    let company : Company | undefined =
        useLiveQuery(() => db.companyList.get(props.selected), [props.selected]);

    let detailRow = () => {
        if(company)
            return(
                <Row>
                    <Col>
                        <p>{company?.name}</p>
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
                        events={db.eventList.where('companyId').equals(props.selected)}
                        showAdd={props.selected > 0}
                        initialAddData={{studentId:props.selected}}/>
                </Col>
            </Row>
        </Container>
    );
}

export default CompanyDetails;
import {Col, Row} from "react-bootstrap";
import {useState} from "react";
import CompaniesList from "./CompaniesList";
import CompanyDetails from "./CompanyDetails";

export const Companies = () => {
    let [selected, changeSelection] = useState(0);

    return (
        <>
            <Row>
                <Col sm={4}>
                    <CompaniesList
                        selected={selected}
                        onSelectionChange={changeSelection}/>
                </Col>
                <Col sm={8}>
                    <CompanyDetails
                        selected={selected}/>
                </Col>
            </Row>
        </>
    );
}
import React from 'react';
import {Route, Routes } from 'react-router-dom';
import '../App.css';
import {Students} from "./Students/Students";
import {Companies} from "./Companies/Companies";
import GlobalEventsList from "./Events/GlobalEventsList";
import { Container } from 'react-bootstrap';

function Main() {
    return (
        <Container className={'mt-2'}>
            <Routes>
                <Route path={'/'} element={Students()}/>
                <Route path={'/students'} element={Students()}/>
                <Route path={'/companies'} element={Companies()}/>
                <Route path={'/events'} element={GlobalEventsList()}/>
                <Route
                    path="*"
                    element={
                        <div style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </div>
                    }
                />
            </Routes>
        </Container>
    );
}

export default Main;

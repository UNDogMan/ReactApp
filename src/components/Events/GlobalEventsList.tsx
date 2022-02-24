import EventsList from "./EventsList";
import {db} from "../../data/db";

export const GlobalEventsList = () =>
    (<>
        <EventsList events={db.eventList.toCollection()} showAdd={true}/>
    </>)

export default GlobalEventsList;
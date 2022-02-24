import Dexie, {Collection, Table } from "dexie";
import { Student, StudentEvent, Company, Spec } from "./interfaces";
import { populate } from "./populate";

export class CrmDB extends Dexie{
    studentList!: Table<Student, number>;
    companyList!: Table<Company, number>;
    eventList!: Table<StudentEvent, number>;
    specList!: Table<Spec, string>;

    constructor() {
        super('CrmDB');
        this.version(1).stores({
            studentList: '++id',
            companyList: '++id',
            eventList: '++id, companyId, studentId',
            specList: 'name'
        })
    }
}

export async function getEvents(events: Collection<StudentEvent, number>) {
    const eventsLoaded = await events.toArray();

    await Promise.all (eventsLoaded.map (async event => {
        [event.student, event.company] = await Promise.all([
            db.studentList.get(event.studentId) ,
            db.companyList.get(event.companyId || 0)
        ]);
    }));

    return eventsLoaded;
}

export const db = new CrmDB();

db.on('populate', populate);
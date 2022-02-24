import { db } from "./db";
import { Data_Students } from "./Seed/Data_Students";
import { Data_Companies } from "./Seed/Data_Companies";
import { Data_Events } from "./Seed/Data_Events";
import { Data_Speciality } from "./Seed/Data_Speciality";

export async function populate(){
    await db.studentList.bulkAdd(Data_Students);
    await db.companyList.bulkAdd(Data_Companies);
    await db.eventList.bulkAdd(Data_Events);
    await db.specList.bulkAdd(Data_Speciality);
}
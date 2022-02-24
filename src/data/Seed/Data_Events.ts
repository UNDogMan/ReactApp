import {StudentEvent} from "../interfaces";

export const Data_Events: StudentEvent[] = [
  {id:1, date:'2019-01-07', text:'Собеседование', companyId: 1, studentId: 2} as StudentEvent,
  {id:2, date:'2018-09-12', text:'Стажировка', companyId: 1, studentId: 1} as StudentEvent,
  {id:3, date:'2018-02-07', text:'Принят на работу', companyId: 2, studentId: 2} as StudentEvent,
  {id:4, date:'2018-04-22', text:'Собеседование не прошел, плохой англ',companyId: 2, studentId: 4} as StudentEvent,
  {id:5, date:'2018-07-12', text:'Пошел на лаб',companyId: 3, studentId: 5} as StudentEvent,
  {id:6, date:'2018-06-14', text:'Посещает курсы',companyId: 4, studentId: 2} as StudentEvent,
  {id:7, date:'2018-04-15', text:'Работает полный день',companyId: 4, studentId: 6} as StudentEvent,
  {id:8, date:'2017-02-25', text:'Хакатон 1 место',companyId: null, studentId: 8} as StudentEvent,
  {id:9, date:'2017-11-30', text:'Собеседование',companyId: 5, studentId: 8} as StudentEvent,
  {id:10, date:'2017-11-30', text:'Собеседование',companyId: 2, studentId: 8} as StudentEvent
];

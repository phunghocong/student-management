import axios from 'axios';

const url = 'http://localhost:8080/api/classRecords';

export const findAll = () => axios.get(url);
export const findByStudentId = (studentID) => axios.get(`${url}/student/${studentID}`);
export const getStudentGPA = (studentID) => axios.get(`${url}/student/gpa/${studentID}`);
export const getStudentGPAYear = (studentID, year) => axios.get(`${url}/student/gpa/${studentID}&${year}`);
export const findClass = (classname, year, semeter) => axios.get(`${url}/class/${classname}&${year}&${semeter}`);
//Not working
export const getStudentListFromClass = (classname) => axios.get(`${url}/class/students/${classname}`);
export const deleteAll = () => axios.delete(url);
export const graphGPAPerYear = (from, to) => axios.get(`${url}/graph/graphGPAPerYear/${from}&${to}`);
export const graphGradeCount = (year, semeter) => axios.get(`${url}/graph/graphGradeCount/${year}&${semeter}`);
export const graphGradeCountOfStudent = (studentID) => axios.get(`${url}/graph/graphGradeCountOfStudent/${studentID}`);
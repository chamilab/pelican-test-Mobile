/*eslint-disable*/
const todoServer = 'http://localhost:7075';
// const todoServer = "http://192.169.143.105:6080";

const applicationAPI = {
  //permission
  getToDo: `${todoServer}/todo/getTask/`,
  saveToDo: `${todoServer}/todo/SaveTask/`,

};

export default applicationAPI;


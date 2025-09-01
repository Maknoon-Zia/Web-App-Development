import students from "./studentsNames.js";


function printStudents() {
    let studentlist = document.getElementById('students');
    students.forEach(st => {
        let li = document.createElement("li");
        li.textContent = st;
        studentlist.appendChild(li);
    });
}

export default printStudents;
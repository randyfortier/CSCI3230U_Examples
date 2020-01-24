import { Sphere, Box } from './shapes.js';

const sphere = new Sphere(2.0);
log(sphere.toString());
log(`The area of the sphere is ${sphere.area}`);

const box = new Box(1.0, 2.0, 3.0);
log(box.toString());
log(`The area of the box is ${box.area}`);

function log(message) {
    const output = document.getElementById('output');
    output.innerHTML += `<div>${message}</div>`;
}

class Student {
    // #studentId = '';
    studentId = '';
    firstName;
    lastName;
    grades = [];

    addGrade(newGrade) {
        this.grades.push(newGrade);
    }

    get sid() {
        return this.studentId;
    }

    set sid(value) {
        this.studentId = value;
    }

    get gpa() {
        let sum = 0.0;
        for (let i = 0; i < this.grades.length; i++) {
            sum += this.grades[i];
        }
        return sum / this.grades.length;
    }
}

const jane = new Student();
jane.sid = '100100100';
jane.firstName = 'Jane';
jane.lastName = 'Sinclair';
jane.addGrade(3.0);
jane.addGrade(3.0);
jane.addGrade(4.0);
log(`Jane's GPA is ${jane.gpa}`);
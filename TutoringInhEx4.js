class User {
    constructor({name, surname, email, role}){
        this.courses = [];
        this.messagesPersonal = [];
        this.newUser = {name, surname, email, role};
    };

    set newUser({name, surname, email, role}){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
    };

    get newUser(){
        return {
            name: this.name,
            surname: this.surname,
            email: this.email,
            role: this.role
        };
    };

    addCourse(course, level){
        this.courses.push({course, level});
        return this.courses;
    };

    removeCourse(course){
        for(let i in this.courses){
            if(course === this.courses[i].course){
                delete this.courses[i];
            }; 
        };
    };

    editCourse(course, level){
        for(let i in this.courses){
            if (course === this.courses[i].course){
                this.courses[i].level =  level;
            };
        };
    };

    static sendEmail(from, to, message){
        return {
            from,
            to,
            message
        };
    };

    sendMessage(to, message){
        
        this.messagesPersonal.push(User.sendEmail(this.newUser.email, to.email, message));
    };

    showMessagesHistory(){
        for (let i in this.messagesPersonal){
            console.log(`${this.messagesPersonal[i].from} -> ${this.messagesPersonal[i].to} -> ${this.messagesPersonal[i].message}`);
        };
    };

};


let student1 = new User({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com', role: 'student'});
let student2 = new User({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com', role: 'student'});
let teacher1 = new User({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com', role: 'teacher'});

student1.addCourse("math",2);
student1.addCourse("english", 3);
student1.removeCourse("math");
student1.editCourse("english", 5);
teacher1.sendMessage(student1, '(☞ﾟヮﾟ)☞ (⌐■_■) ☜(ﾟヮﾟ☜)');
teacher1.showMessagesHistory();


class ExtendedUser extends User {
    constructor({name, surname, email, role}){
        super({name, surname, email, role});
        this.fullname = {name, surname};
          
    };

    set fullname({name, surname}){
        this.name = name;
        this.surname = surname;
    };

    get fullname(){
        return this.name + " " + this.surname;
    };

    static match(teacher, student, courseName){
        let arr = [];
        for(let i in teacher.courses){
            for(let j in student.courses){
                if(((teacher.courses[i].course === student.courses[j].course) || 
                    (teacher.courses[i].course === courseName && student.courses[j].course === courseName))
                && teacher.courses[i].level >= student.courses[j].level)
        {
            arr.push(teacher.courses[i]);
       }
    }
}
    return arr;
    };
};


class Teacher extends ExtendedUser{
    constructor({name, surname, email}){
        super({name, surname, email});
        this.role = "Teacher";
    };
};

class Student extends ExtendedUser{
    constructor({name, surname, email}){
        super({name, surname, email});
        this.role = "Student";
    };
};

let student3 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student4 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher2 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student3.addCourse("maths", 2);
teacher2.addCourse("biology", 3);
teacher2.addCourse("chemistry", 4);
console.log(student3.fullname)
console.log(`${student3.fullname}: ${student3.courses.length} courses`);
console.log(`${teacher2.fullname}: ${teacher2.courses.length} courses`);
student1.fullname = 'Rafael Fifer';
console.log(`${student1.fullname}: ${student1.courses.length} courses`);

let student5 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student6 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher3 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student5.addCourse('maths', 2);
student5.addCourse('physics', 4);
teacher3.addCourse('maths', 4);
let match = ExtendedUser.match(teacher3, student5);
console.log(match); 
teacher3.editCourse('maths', 1);
match = ExtendedUser.match(teacher3, student5);
console.log(match); 
teacher3.addCourse('physics', 4);
match = ExtendedUser.match(teacher3, student5, 'physics');
console.log(match);  

class Tutoring {
    constructor(){
        this.teachers = [];
        this.students = [];
    };
    getStudentByName(name, surname){
        for(let i in this.students){
            
            if (this.students[i].name === name && this.students[i].surname === surname){
                return this.students[i];
            };
        };
        return undefined;
    };

    getTeacherByName(name, surname){
        for(let i in this.teachers){
            if (this.teachers[i].name === name && this.teachers[i].surname === surname){
                return this.teachers[i];
            };
        };
        return undefined;
    };
    getStudentsForTeacher(teacher){
        let arr = [];
        for(let i in this.students){
            arr.push(ExtendedUser.match(teacher,this.students[i]));
        };
        let arr2 = [];
        for(let i in this.students){
            try {
            if((arr[i][0].course === this.students[i].courses[0].course) && (arr[i][0].level >= this.students[i].courses[0].level)){
                arr2.push(this.students[i]);
            }
        }
        catch{
            console.log("Out of index");
        }
        };
        return arr2;
      
    };

    getTeacherForStudent(student){
        let arr3 = [];
        for(let i in this.teachers){
            arr3.push(ExtendedUser.match(this.teachers[i],student));
        };
        let arr4 = [];
        for (let i in this.teachers){
            try{
            if(this.teachers[i].courses[0].course === arr3[i][0].course && (arr3[i][0].level <= this.teachers[i].courses[0].level)){
                arr4.push(this.teachers[i]);
            };
        }
        catch {
            console.log("Out of index");
        }
        };
        return arr4;
    };
    
    addStudent(name, surname, email){
        this.students.push(new Student({name, surname, email}));
    };
    
    addTeacher(name, surname, email){
        this.teachers.push(new Teacher({name, surname, email}));
    };
};

let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');

let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);
let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');

teacher.addCourse('maths', 4);
console.log(tutoring.teachers[0].courses[0].course)
let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); 
console.log(teachers[0]); 

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); 
console.log(teachers[0]);


class ExtendedTutoring extends Tutoring{
    sendMessages(from, to, message){
        let user = (from.role === "Teacher") ? (new Teacher({name: from.name, surname: from.surname, email: from.email})) : (new Student({name: from.name, surname: from.surname, email: from.email}));
        user.sendMessage(to, message);
        
    };
};

let tutoring2 = new ExtendedTutoring();
tutoring2.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring2.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring2.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let to = [];
to.push(tutoring2.getStudentByName('Rafael', 'Fife'));
to.push(tutoring2.getStudentByName('Kelly', 'Estes'));
tutoring2.sendMessages(tutoring2.getTeacherByName('Paula', 'Thompkins'), to, 'test message');
for(let user of to) {
    user.showMessagesHistory();
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Grade } from '../admins-app/grades/Grades.model';
import { Student } from '../admins-app/students/Students.model';

@Injectable({ providedIn: 'root' })
export class StudentService {

    token: string = ""
    grades: Grade[] = []
    currentStudent: Student
    updateMood: boolean = false
    popOutMood: boolean = false
    popOutMessage: String = ""

    constructor(private http: HttpClient, private router: Router) {
        this.autoLogin()
    }

    popOutMoodTrigger() {
        this.popOutMood = false
    }

    studentLogin(loginForm: FormGroup) {
        console.log(loginForm)
        this.http.post('https://localhost:7096/api/Students/login', { UserName: loginForm.value.userName, Password: loginForm.value.password, }).subscribe((responseData: any) => {
            sessionStorage.setItem('token', JSON.stringify(responseData.token));
            this.token = responseData.token
            this.router.navigate(["/students/grades"])
            loginForm.reset()
            console.log(responseData)
        }, error => {
            console.log(error)
            this.popOutMood = true
            this.popOutMessage = error.error.message

        })
    }
    logout() {
        sessionStorage.clear()
        this.router.navigate([""])
        this.token = ""
    }
    autoLogin() {
        
        if (!JSON.parse(sessionStorage.getItem('token')!)) {
            return;
        } else {
            this.token = JSON.parse(sessionStorage.getItem('token')!);
        }


    }
    getGrades() {
        this.http.get('https://localhost:7096/api/Grades/student', { headers: new HttpHeaders({ authorization: "bearer " + this.token }) }).subscribe((responseData: any) => {
            this.grades = responseData.result as Grade[]
            console.log(responseData)
        }, error => {
            console.log(error)
        })
    }
    getInfo() {
        this.http.get('https://localhost:7096/api/students/student/info', { headers: new HttpHeaders({ authorization: "bearer " + this.token }) }).subscribe((responseData: any) => {
            console.log(responseData)
            this.currentStudent = responseData.result
        }, error => {
            console.log(error)
        })
    }
    updatePassword(updateStudentPasswordForm: FormGroup) {
        this.http.put('https://localhost:7096/api/students/student', { password: updateStudentPasswordForm.value.password }, { headers: new HttpHeaders({ authorization: "bearer " + this.token }) }).subscribe((responseData: any) => {
            console.log(responseData)
        }, error => {
            console.log(error)
        })
    }

}

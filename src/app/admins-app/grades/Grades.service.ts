import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { AdminService } from "src/app/admins-app/admin.service"
import { StudentsService } from "../students/students.Service"
import { Grade } from "./Grades.model"


@Injectable({ providedIn: 'root' })
export class GradesService {
    currentCourse: any
    currentStudent: any
    currentStudentName: any
    currentStudentId: any
    currentCourseId: any
    currentCourseName: any
    onUpdateStudentName: any
    onUpdateCourseName: any
    onUpdateCourseNumber: any
    onUpdateFirstExam: any
    onUpdateSecondExam: any
    onUpdateFinalExam: any
    onUpdateGrade: any
    onUpdateResult: any
    onUpdateStudentNumber: any
    updateMood: boolean = false
    allGrades: Grade[] = []
    currentGradeId: any
    popOutMood:boolean=false
    popOutMessage :string=""
  
    constructor(private http: HttpClient , public studentsService:StudentsService , private adminsService:AdminService) {
    }
  
    popOutMoodTrigger(){
        this.popOutMood=!this.popOutMood
    }
    gradesEntryForm = new FormGroup({
        studentNumber: new FormControl("",[
            Validators.required]),
        courseNumber: new FormControl("",[
            Validators.required]),
        studentName: new FormControl({ value: "", disabled: true }),
        courseName: new FormControl({ value: "", disabled: true, }),
        firstExam: new FormControl(""),
        secondExam: new FormControl(""),
        finalExam: new FormControl(""),
        grade: new FormControl({ value: "", disabled: true, }),
        result: new FormControl({ value: "", disabled: true, }),

    })
get studentNumber(){
    return this.gradesEntryForm.get('studentNumber')
}
get courseNumber(){
    return this.gradesEntryForm.get('courseNumber')
}
get firstExam(){
    return this.gradesEntryForm.get('firstExam')
}
get secondExam(){
    return this.gradesEntryForm.get('secondExam')
}
get finalExam(){
    return this.gradesEntryForm.get('finalExam')
}

    updateMoodTrigger() {
        this.updateMood = !this.updateMood
    }
    getGrades() {

        this.http.get('https://localhost:7096/api/Grades',{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
            this.allGrades = responseData.result as Grade[]
            console.log(responseData)
         
        },error=>{
            console.log(error.error)
            this.popOutMood=true
            this.popOutMessage=error.error
        })

    }
    updateGrade(gradesEntryForm: FormGroup) {
        console.log({
            courseid: this.currentCourseId, studentid: this.currentStudentId, firstexam: gradesEntryForm.value.firstExam ? gradesEntryForm.value.firstExam : this.onUpdateFirstExam,
            secondexam: gradesEntryForm.value.secondExam ? gradesEntryForm.value.secondExam : this.onUpdateSecondExam,
            finalexam: gradesEntryForm.value.finalExam ? gradesEntryForm.value.finalExam : this.onUpdateFinalExam
        })
        this.http.put(`https://localhost:7096/api/Grades/${this.currentGradeId}`, {
            courseid: this.currentCourseId,
            studentid: this.currentStudentId,
            firstexam: gradesEntryForm.value.firstExam,
            secondexam: gradesEntryForm.value.secondExam,
            finalexam: gradesEntryForm.value.finalExam
        },{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
            console.log(responseData)
            this.getGrades()
            this.gradesEntryForm.reset()
            this.popOutMood=true
            this.popOutMessage=responseData.message
            this.studentsService.getAllStudents()
        },error=>{
            console.log(error.error)
            this.popOutMood=true
            this.popOutMessage=error.error
        })
    }
    addGrade(gradesEntryForm: FormGroup) {
        console.log("post", {
            courseid: this.currentCourseId, studentid: this.currentStudentId, firstexam: gradesEntryForm.value.firstExam,
            secondexam: gradesEntryForm.value.secondExam ? gradesEntryForm.value.secondExam : 0,
            finalexam: gradesEntryForm.value.finalExam ? gradesEntryForm.value.finalExam : 0
        })
        this.http.post('https://localhost:7096/api/Grades', {
            courseid: this.currentCourseId, studentid: this.currentStudentId, firstexam: gradesEntryForm.value.firstExam,
            secondexam: gradesEntryForm.value.secondExam ? gradesEntryForm.value.secondExam : null,
            finalexam: gradesEntryForm.value.finalExam ? gradesEntryForm.value.finalExam : null
        },{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData:any) => {
            console.log(responseData)
            this.getGrades()
            this.gradesEntryForm.reset()
            this.popOutMood=true
            this.popOutMessage=responseData.message
            this.studentsService.getAllStudents()
        },error=>{
            console.log(error.error)
            this.popOutMood=true
            this.popOutMessage=error.error
        })
   

    }
    deleteGrade(id:number){
        this.http.delete(`https://localhost:7096/api/Grades/${id}`,{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData:any) => {
            console.log(responseData)
            this.popOutMood=true
            this.popOutMessage=responseData.message
            this.getGrades()
            this.studentsService.getAllStudents()
        },error=>{
            console.log(error.error)
            this.popOutMood=true
            this.popOutMessage=error.error
        })
    }

    gradeChoose(id: number) {
        var choosed = this.allGrades.filter((grade) => {
            return grade.id == id
        })
        this.updateMood = true
        console.log(choosed)
        this.onUpdateStudentName = choosed[0].studentName
        console.log(this.onUpdateStudentName)
        this.onUpdateCourseName = choosed[0].courseName
        this.onUpdateCourseNumber = choosed[0].courseNumber
        this.onUpdateFirstExam = choosed[0].firstexam
        this.onUpdateSecondExam = choosed[0].secondexam
        this.onUpdateFinalExam = choosed[0].finalexam
        this.onUpdateResult = choosed[0].result
        this.onUpdateGrade = choosed[0].grade
        this.onUpdateStudentNumber = choosed[0].studentNumber
        this.currentGradeId = choosed[0].id
        this.gradesEntryForm.patchValue({
            studentNumber: this.onUpdateStudentNumber,
            studentName: this.onUpdateStudentName,
            courseNumber: this.onUpdateCourseNumber,
            firstExam: this.onUpdateFirstExam,
            courseName: this.onUpdateCourseName,
            secondExam: this.onUpdateSecondExam,
            finalExam: this.onUpdateFinalExam,
            grade: this.onUpdateGrade,
            result: this.onUpdateResult == 1 ? "Pass" : "Fail"
        })

    }
    checkCourse(search: any) {
        this.http.get(`https://localhost:7096/api/Courses/search/${search}`,{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
            if (responseData == null) {
                this.currentCourse = ""
                this.currentCourseName = ""
                this.currentCourseId = ""
            }
            this.currentCourse = responseData.result
            this.currentCourseName = responseData.result.name
            this.gradesEntryForm.patchValue({
                courseName: this.currentCourseName,
            })
            this.currentCourseId = responseData.result.id
            console.log(responseData)
            console.log("id", this.currentCourseId)
            console.log(this.currentCourse)
        },error=>{
            console.log(error.error)
        })
    }
    checkStudent(search: any) {
        this.http.get(`https://localhost:7096/api/Students/search/${search}`,{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
            if (responseData == null) {
                this.currentStudent = ""
                this.currentStudentId = ""
                this.currentStudentName = ""
            }

            this.currentStudent = responseData.result
            this.currentStudentName = responseData.result.name
            this.currentStudentId = responseData.result.id
            this.gradesEntryForm.patchValue({
             studentName: this.currentStudentName,
            })
            console.log(responseData)
            console.log("id", this.currentStudentId)
            console.log(this.currentStudent)
        },error=>{
            console.log(error.error)
        })
    }
}

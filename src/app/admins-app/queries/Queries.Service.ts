import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable, OnInit } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { AdminService } from "src/app/admins-app/admin.service"
import { Grade } from "../grades/Grades.model"
import { Student } from "../students/Students.model"
import { QueryGrade } from "./QueryGrade.model"

@Injectable({ providedIn: 'root' })
export class 
QueriesService {
majors:any
faculties:any
    allQueriesGrades: any[] = [] 
    searchedGrades:any [] = []
    popOutMood:boolean=false
    popOutMessage :string=""

constructor(private http: HttpClient , private adminsService:AdminService){}

popOutMoodTrigger(){
    this.popOutMood=!this.popOutMood
}
getFaculties(){
    this.http.get('https://localhost:7096/faculties').subscribe((responseData)=>{
        this.faculties = responseData 
       
    })
}
getMajors(){
    this.http.get('https://localhost:7096/majors').subscribe((responseData)=>{
        this.majors = responseData 
   
    
    })
}
getQueryGrades(){
 
    this.http.get('https://localhost:7096/api/Grades',{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData:any)=>{
    this.allQueriesGrades=responseData.result as QueryGrade[] 
    console.log(responseData)
})

}
queryCheck(querytEntryForm:FormGroup){
    console.log(querytEntryForm.value.studentName ,Number(querytEntryForm.value.studentNumber),
    querytEntryForm.value.studentFaculty,querytEntryForm.value.courseName,Number(querytEntryForm.value.courseNumber)
    ,querytEntryForm.value.courseFaculty,querytEntryForm.value.major,querytEntryForm.value.result.toString()
    ,querytEntryForm.value.gradeGreater)
    console.log(querytEntryForm)
   this.searchedGrades =  this.allQueriesGrades.filter((elem)=>{
        return (elem.studentName == querytEntryForm.value.studentName
            && elem.studentNumber == Number(querytEntryForm.value.studentNumber)
        && elem.studentFaculty == querytEntryForm.value.studentFaculty 
        && elem.courseName ==querytEntryForm.value.courseName 
        && elem.courseNumber ==Number(querytEntryForm.value.courseNumber)
        && elem.courseFaculty == querytEntryForm.value.courseFaculty 
        && elem.majorSpeciality ==querytEntryForm.value.major 
        && elem.result ==querytEntryForm.value.result.toString() 
        && Number(elem.grade) > querytEntryForm.value.gradeGreater
   )})
   if(this.searchedGrades.length==0){
    this.popOutMood=true
    this.popOutMessage="No Such Information"
   }
   console.log(this.searchedGrades)
}

}
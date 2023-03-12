import { Injectable } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { Student } from "./Students.model"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ValidateBirth } from "./Validators";
import { AdminService } from "src/app/admins-app/admin.service";

@Injectable({ providedIn: 'root' })


export class StudentsService {
    genders: any = []
    degrees: any = []
    majors: any = []
    faculties: any = []
    allStudents: Student[] = []
    onUpdateStudentNumber: any
    onUpdateStudentName: any
    onUpdateBirthDate: any
    onUpdateGender: any
    onUpdateNumber: any
    onUpdateDegree: any
    onUpdateFaculty: any
    onUpdateMajor: any
    onUpdateGrade: any
    onUpdateResult: any
    onUpdateHours: any
    currentStudentId: any
    updateMood: boolean = false
    popOutMood: boolean = false
    popOutMessage: string = ""
    codes: string[] = []


    constructor(private http: HttpClient , private adminsService:AdminService) { }

    popOutMoodTrigger() {
        this.popOutMood = !this.popOutMood
    }
    updateMoodTrigger() {
        this.updateMood = !this.updateMood
        this.studentEntryForm.reset()
    }
    studentEntryForm = new FormGroup({
        studentNumber: new FormControl("", [
            Validators.required]),
        studentName: new FormControl("", [
            Validators.required]),
        birthDate: new FormControl("", [
            Validators.required,ValidateBirth]),
        gender: new FormControl("", [
            Validators.required]),
        number: new FormControl("", [
            Validators.required]),
        degree: new FormControl("", [
            Validators.required]),
        faculty: new FormControl("", [
            Validators.required]),
        major: new FormControl("", [
            Validators.required]),
        gpa: new FormControl({ value: "", disabled: true, }),
        hours: new FormControl({ value: "", disabled: true, }),
    })
    get studentNumber() {
        return this.studentEntryForm.get('studentNumber')
    }
    get studentName() {
        return this.studentEntryForm.get('studentName')
    }
    get birthDate() {
        return this.studentEntryForm.get('birthDate')
    }
    get gender() {
        return this.studentEntryForm.get('gender')
    }
    get number() {
        return this.studentEntryForm.get('number')
    }
    get degree() {
        return this.studentEntryForm.get('degree')
    }
    get faculty() {
        return this.studentEntryForm.get('faculty')
    }
    get major() {
        return this.studentEntryForm.get('major')
    }

    studentChoose(id: number) {

        var choosed = this.allStudents.filter((student) => {
            return student.id == id
        })

        this.currentStudentId = choosed[0].id
        this.updateMood = true
        console.log(choosed)
        this.onUpdateStudentNumber = choosed[0].studentNumber
        this.onUpdateStudentName = choosed[0].name
        this.onUpdateBirthDate = choosed[0].birthDate.substring(0, 10);
        this.onUpdateGender = this.genders.filter((elem: any) => {
            return elem.codeName == choosed[0].gender
        })[0].id
        this.onUpdateDegree = this.degrees.filter((elem: any) => {
            return elem.codeName == choosed[0].academicDegree
        })[0].id
        this.onUpdateFaculty = this.faculties.filter((elem: any) => {
            return elem.codeName == choosed[0].faculty
        })[0].id
        this.onUpdateMajor = this.majors.filter((elem: any) => {
            return elem.codeName == choosed[0].majorSpecialty
        })[0].id
        this.onUpdateNumber = choosed[0].mobileNo
        this.onUpdateGrade = choosed[0].averageGpa
        this.onUpdateHours = choosed[0].totalCreditHours
        this.studentEntryForm.patchValue({
            studentNumber: this.onUpdateStudentNumber,
            studentName: this.onUpdateStudentName,
            birthDate: this.onUpdateBirthDate,
            gender: this.onUpdateGender,
            number: this.onUpdateNumber,
            degree: this.onUpdateDegree,
            faculty: this.onUpdateFaculty,
            major: this.onUpdateMajor,
            gpa: this.onUpdateGrade ,
            hours: this.onUpdateHours,
        })
    }
    getGenders() {
        this.http.get('https://localhost:7096/genders').subscribe((responseData) => {
            this.genders = responseData
            console.log(this.genders)

        })
    }
    getDegrees() {
        this.http.get('https://localhost:7096/degrees').subscribe((responseData) => {
            this.degrees = responseData
            console.log(this.genders)

        })
    }
    getFaculties() {
        this.http.get('https://localhost:7096/faculties').subscribe((responseData) => {
            this.faculties = responseData
            console.log(this.genders)
        })
    }
    getMajors() {
        this.http.get('https://localhost:7096/majors').subscribe((responseData) => {
            this.majors = responseData
            console.log(this.genders)

        })
    }

    addStudent(studentEntryForm: FormGroup) {
        console.log(studentEntryForm)
        this.http.post('https://localhost:7096/api/Students',
            {
                studentNumber: studentEntryForm.value.studentNumber.toString(),
                name: studentEntryForm.value.studentName,
                birthDate: studentEntryForm.value.birthDate,
                gender: Number(studentEntryForm.value.gender),
                mobileNo: studentEntryForm.value.number.toString(),
                academicDegree: Number(studentEntryForm.value.degree),
                faculty: Number(studentEntryForm.value.faculty),
                majorSpecialty: Number(studentEntryForm.value.major),
            },{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
                console.log(responseData)
                this.getAllStudents()
                this.studentEntryForm.reset()
                this.popOutMood = true
                this.popOutMessage = responseData.message
            }, error => {
                console.log(error.error)
                this.popOutMood = true
                this.popOutMessage = error.error
            })
    }
    updateStudent(studentEntryForm: FormGroup) {
        console.log(studentEntryForm)
        this.http.put(`https://localhost:7096/api/Students/${this.currentStudentId}`,
            {
                studentNumber: studentEntryForm.value.studentNumber.toString(),
                name: studentEntryForm.value.studentName,
                birthDate: studentEntryForm.value.birthDate,
                gender: Number(studentEntryForm.value.gender),
                mobileNo: studentEntryForm.value.number.toString(),
                academicDegree: Number(studentEntryForm.value.degree),
                faculty: Number(studentEntryForm.value.faculty),
                majorSpecialty: Number(studentEntryForm.value.major),
            },{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
                console.log(responseData)
                this.getAllStudents()
                this.studentEntryForm.reset()
                this.popOutMood = true
                this.popOutMessage = responseData.message

            }, error => {
                console.log(error.error)
                this.popOutMood = true
                this.popOutMessage = error.error
            })
    }
    deleteStudent(id: number) {
        this.http.delete(`https://localhost:7096/api/Students/${id}`,{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {

            console.log(responseData)
            this.getAllStudents()
            this.popOutMood = true
            this.popOutMessage = responseData.message


        }, error => {
            console.log(error.error)
            this.popOutMood = true
            this.popOutMessage = error.error
        })
    }
    getAllStudents() {
        this.http.get('https://localhost:7096/api/Students',{ headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
            this.allStudents = responseData.result as Student[]
            console.log(responseData)
            console.log(this.allStudents)

        }, error => {
            console.log(error.error)
            this.popOutMood = true
            this.popOutMessage = error.error
        })
    }

}

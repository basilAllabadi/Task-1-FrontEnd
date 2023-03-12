import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { AdminService } from "src/app/admins-app/admin.service"
import { Course } from "./Course.model"
import { ValidateDate } from "./Validators"


@Injectable({ providedIn: 'root' })
export class CoursesService {
    faculties: any = []
    allCourses: Course[] = []
    majors: any = []
    onUpdateCourseName: any
    onUpdateCourseNumber: any
    onUpdateFaculty: any
    onUpdateDescription: any
    onUpdateCategory: any
    onUpdateHours: any
    onUpdateTeacherName: any
    onUpdateStartDate: any
    onUpdateEndDate: any
    currentCourseId: any
    popOutMood: boolean = false
    popOutMessage: string = ""
    updateMood: boolean = false

    courseEntryForm = new FormGroup({
        courseNumber: new FormControl("", [
            Validators.required]),
        courseName: new FormControl("", [
            Validators.required]),
        faculty: new FormControl("", [
            Validators.required]),
        courseDescription: new FormControl("", [
            Validators.required]),
        courseCategory: new FormControl("", [
            Validators.required]),
        courseCreditHours: new FormControl("", [
            Validators.required]),
        teacherName: new FormControl("", [
            Validators.required]),
        courseStartDate: new FormControl("", [
            Validators.required, ValidateDate]),
        courseEndDate: new FormControl("", [
            Validators.required]),
    })
    constructor(private http: HttpClient, private adminsService: AdminService) {}
    
    get courseNumber() {
        return this.courseEntryForm.get('courseNumber')
    }
    get courseName() {
        return this.courseEntryForm.get('courseName')
    }
    get faculty() {
        return this.courseEntryForm.get('faculty')
    }
    get courseDescription() {
        return this.courseEntryForm.get('courseDescription')
    }
    get courseCategory() {
        return this.courseEntryForm.get('courseCategory')
    }
    get courseCreditHours() {
        return this.courseEntryForm.get('courseCreditHours')
    }
    get teacherName() {
        return this.courseEntryForm.get('teacherName')
    }
    get courseStartDate() {
        return this.courseEntryForm.get('courseStartDate')
    }
    get courseEndDate() {
        return this.courseEntryForm.get('courseEndDate')
    }
    popOutMoodTrigger() {
        this.popOutMood = !this.popOutMood
    }
    updateMoodTrigger() {
        this.updateMood = !this.updateMood
    }
    getFaculties() {
        this.http.get('https://localhost:7096/faculties').subscribe((responseData: any) => {
            this.faculties = responseData
            console.log(this.faculties)
        })
    }
    getMajors() {
        this.http.get('https://localhost:7096/majors').subscribe((responseData: any) => {
            this.majors = responseData
            console.log(this.majors)
        })
    }
    courseChoose(id: number) {
        var choosed = this.allCourses.filter((course) => {
            return course.id == id
        })
        this.updateMood = true
        console.log(choosed)

        this.onUpdateCourseName = choosed[0].name
        console.log(this.onUpdateCourseName)
        this.onUpdateCourseNumber = choosed[0].courseNumber
        this.onUpdateFaculty = this.faculties.filter((elem: any) => {
            return elem.codeName == choosed[0].faculty
        })[0].id
        this.onUpdateDescription = choosed[0].courseDescription
        this.onUpdateCategory = this.majors.filter((elem: any) => {
            return elem.codeName == choosed[0].courseCategory
        })[0].id
        this.onUpdateHours = choosed[0].courseCreditHours
        this.onUpdateTeacherName = choosed[0].teacherName
        this.onUpdateStartDate = choosed[0].courseStartDate.substring(0, 10)
        this.onUpdateEndDate = choosed[0].courseEndDate.substring(0, 10)
        this.currentCourseId = choosed[0].id

        this.courseEntryForm.patchValue({
            courseNumber: this.onUpdateCourseNumber,
            courseName: this.onUpdateCourseName,
            faculty: this.onUpdateFaculty,
            courseDescription: this.onUpdateDescription,
            courseCategory: this.onUpdateCategory,
            courseCreditHours: this.onUpdateHours,
            teacherName: this.onUpdateTeacherName,
            courseStartDate: this.onUpdateStartDate,
            courseEndDate: this.onUpdateEndDate
        })
    }
    addCourse(courseEntryForm: FormGroup) {
        console.log(courseEntryForm)
        this.http.post('https://localhost:7096/api/Courses',
            {
                courseNumber: courseEntryForm.value.courseNumber.toString(),
                name: courseEntryForm.value.courseName,
                faculty: Number(courseEntryForm.value.faculty),
                courseDescription: courseEntryForm.value.courseDescription,
                courseCategory: Number(courseEntryForm.value.courseCategory),
                courseCreditHours: courseEntryForm.value.courseCreditHours,
                teacherName: courseEntryForm.value.teacherName,
                courseStartDate: courseEntryForm.value.courseStartDate,
                courseEndDate: courseEntryForm.value.courseEndDate,
            }, { headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
                console.log(responseData)
                this.getAllCourses()
                this.courseEntryForm.reset()
                this.popOutMood = true
                this.popOutMessage = responseData.message
            }, error => {
                console.log(error.error)
                this.popOutMood = true
                this.popOutMessage = error.error
            })
        console.log(this.allCourses)
    }
    updateCourse(courseEntryForm: FormGroup) {
        console.log(courseEntryForm)
        this.http.put(`https://localhost:7096/api/Courses/${this.currentCourseId}`,
            {
                courseNumber: courseEntryForm.value.courseNumber.toString(),
                name: courseEntryForm.value.courseName,
                faculty: Number(courseEntryForm.value.faculty),
                courseDescription: courseEntryForm.value.courseDescription,
                courseCategory: Number(courseEntryForm.value.courseCategory),
                courseCreditHours: courseEntryForm.value.courseCreditHours,
                teacherName: courseEntryForm.value.teacherName,
                courseStartDate: courseEntryForm.value.courseStartDate,
                courseEndDate: courseEntryForm.value.courseEndDate,
            }, { headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
                console.log(responseData)
                this.getAllCourses()
                this.courseEntryForm.reset()
                this.popOutMood = true
                this.popOutMessage = responseData.message
            }, error => {
                console.log(error.error)
                this.popOutMood = true
                this.popOutMessage = error.error
            })
        console.log(this.allCourses)
    }
    deleteCourse(id: number) {
        this.http.delete(`https://localhost:7096/api/Courses/${id}`, { headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
            console.log(responseData)
            this.popOutMood = true
            this.popOutMessage = responseData.message
            this.getAllCourses()

        }, error => {
            console.log(error.error)
            this.popOutMood = true
            this.popOutMessage = error.error
        })
    }
    getAllCourses() {
        this.http.get('https://localhost:7096/api/Courses', { headers: new HttpHeaders({ authorization: "bearer " + this.adminsService.token }) }).subscribe((responseData: any) => {
            this.allCourses = responseData.result as Course[]
            console.log(responseData)
            console.log(this.allCourses)

        }, error => {
            console.log(error.error)
            this.popOutMood = true
            this.popOutMessage = error.error
        })
    }
}
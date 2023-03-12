import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './admins-app/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BriefComponent } from './admins-app/brief/brief.component';
import { AdminsAppComponent } from './admins-app/admins-app.component';
import { CoursesComponent } from './admins-app/courses/courses.component';
import { StudentsComponent } from './admins-app/students/students.component';
import { GradesComponent } from './admins-app/grades/grades.component';
import { QueriesComponent } from './admins-app/queries/queries.component';
import { StudentsEntryComponent } from './admins-app/students/students-entry/students-entry.component';
import { CourseEntryComponent } from './admins-app/courses/course-entry/course-entry.component';
import { StudentsListComponent } from './admins-app/students/students-list/students-list.component';
import { CoursesListComponent } from './admins-app/courses/courses-list/courses-list.component';
import { GradesEntryComponent } from './admins-app/grades/grades-entry/grades-entry.component';
import { GradesListComponent } from './admins-app/grades/grades-list/grades-list.component';
import { QueryEntryComponent } from './admins-app/queries/query-entry/query-entry.component';
import { QueriesListComponent } from './admins-app/queries/queries-list/queries-list.component';
import { LoginComponent } from './login/login.component';
import { StudentsAppComponent } from './students-app/students-app.component';
import { StudentInfoComponent } from './students-app/student-info/student-info.component';
import { GradesStudentComponent } from './students-app/grades/grades.component';
import { StudentHeaderComponent } from './students-app/student-header/student-header.component';

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "admins", component: AdminsAppComponent, children: [
      { path: "students", component: StudentsComponent, },
      { path: "courses", component: CoursesComponent, },
      { path: "grades", component: GradesComponent },
      { path: "queries", component: QueriesComponent },
      { path: "brief", component: BriefComponent }]
  },
  {
    path: "students", component: StudentsAppComponent, children: [
      { path: "grades", component: GradesStudentComponent, },
      { path: "Info", component: StudentInfoComponent }]
  }]

@NgModule({
  declarations: [
    AppComponent,
    StudentsEntryComponent,
    StudentsListComponent,
    CourseEntryComponent,
    CoursesListComponent,
    GradesEntryComponent,
    GradesListComponent,
    QueryEntryComponent,
    QueriesListComponent,
    HeaderComponent,
    StudentsComponent,
    CoursesComponent,
    GradesComponent,
    QueriesComponent,
    BriefComponent,
    AdminsAppComponent,
    LoginComponent,
    StudentsAppComponent,
    StudentInfoComponent,
    StudentHeaderComponent,
    GradesStudentComponent
  ],
  
  imports: [
    BrowserModule, MatIconModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes), HttpClientModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }

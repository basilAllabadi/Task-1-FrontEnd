import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QueriesService } from '../Queries.Service';

@Component({
  selector: 'app-query-entry',
  templateUrl: './query-entry.component.html',
  styleUrls: ['./query-entry.component.css']
})
export class QueryEntryComponent {

  constructor(public queriesService: QueriesService) { }

  queryEntryForm = new FormGroup({
    studentNumber: new FormControl("", [
      Validators.required]),
    studentName: new FormControl("", [
      Validators.required]),
    studentFaculty: new FormControl("", [
      Validators.required]),
    courseNumber: new FormControl("", [
      Validators.required]),
    courseName: new FormControl("", [
      Validators.required]),
    courseFaculty: new FormControl("", [
      Validators.required]),
    major: new FormControl("", [
      Validators.required]),
    result: new FormControl("", [
      Validators.required]),
    gradeGreater: new FormControl("", [
      Validators.required]),
  })

  get studentNumber() {
    return this.queryEntryForm.get("studentNumber")
  }
  get studentName() {
    return this.queryEntryForm.get("studentName")
  }
  get studentFaculty() {
    return this.queryEntryForm.get("studentFaculty")
  }
  get courseNumber() {
    return this.queryEntryForm.get("courseNumber")
  }
  get courseName() {
    return this.queryEntryForm.get("courseName")
  }
  get courseFaculty() {
    return this.queryEntryForm.get("courseFaculty")
  }
  get major() {
    return this.queryEntryForm.get("major")
  }
  get result() {
    return this.queryEntryForm.get("result")
  }
  get gradeGreater() {
    return this.queryEntryForm.get("gradeGreater")
  }
  queryCheck(queryEntryForm: FormGroup) {
    this.queriesService.queryCheck(queryEntryForm)
  }

}

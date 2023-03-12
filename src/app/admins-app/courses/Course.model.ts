export class Course {
    constructor(
        public id: number,
        public courseNumber: number,
        public name: string,
        public faculty: string,
        public courseDescription: string,
        public courseCategory: string,
        public courseCreditHours: number,
        public teacherName: string,
        public courseStartDate: string,
        public courseEndDate: string,
    ) { }
}
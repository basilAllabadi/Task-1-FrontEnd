
export class Grade {
    constructor(
        public id: number,
        public studentNumber: number,
        public studentName: string,
        public courseNumber: number,
        public courseName: string,
        public firstexam: number,
        public secondexam: number,
        public finalexam: number,
        public grade: number,
        public result: number,
    ) { }
}
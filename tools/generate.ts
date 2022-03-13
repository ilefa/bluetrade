import fs from 'fs';
import axios from 'axios';
import subjects from '../subjects.json';
import mappings from '@ilefa/husky/courses.json';

export type TransferableCourse = {
    external: SimpleExternalCourse;
    equiv: Course[];
}

export type SimpleExternalCourse = {
    school: string;
    name: string;
}

type ExternalSubjectMapping = {
    target: string;
    subjects: string[];
}

type ExternalCourse = {
    id: number;
    school: string;
    schoolid: string;
    ext_subject: string;
    ext_number: string;
    int_subject: string;
    int_number: string;
    int_title: string;
    seq_number: string;
}

type Course = {
    name: string;
    catalogName: string;
    catalogNumber: string;
    prerequisites: string;
    attributes: CourseAttributes; 
    credits: number;
    grading: string;
    description: string;
}

type CourseAttributes = {
    lab: boolean;
    writing: boolean;
    quantitative: boolean;
    environmental: boolean;
    contentAreas: ContentArea[];
    graduate: boolean;
}

enum ContentArea {
    CA1 = 'CA1',
    CA2 = 'CA2',
    CA3 = 'CA3',
    CA4 = 'CA4',
    CA4INT = 'CA4INT'
}

const TARGETS = [
    "Albertus Magnus College",
    "Asnuntuck Community College",
    "Capital Community College",
    "Central Connecticut State Univ",
    "Charter Oak State College",
    "Connecticut College",
    "Eastern Connecticut St Univ",
    "Fairfield University",
    "Gateway Community College",
    "Goodwin College",
    "Hartford College Women",
    "Holy Apostles Coll & Seminary",
    "Housatonic Community College",
    "Lincoln Coll of New England",
    "Manchester Community College",
    "Middlesex Community College",
    "Military Training",
    "Mitchell College",
    "Naugatuck Valley Cmty College",
    "Northwestern CT Cmty Coll",
    "Norwalk Community College",
    "Post University",
    "Quinebaug Valley Cmty Coll",
    "Quinnipiac University",
    "Sacred Heart University",
    "Southern Connecticut State University",
    "St Vincents College",
    "Three Rivers Community College",
    "Trinity College Ct",
    "Tunxis Community College",
    "United States Coast Guard Acad",
    "Univ Bridgeport",
    "Univ Hartford",
    "Univ New Haven",
    "University of Saint Joseph",
    "Wesleyan University",
    "Western Connecticut State University",
    "Yale University"
];

const isNLevel = (input: string, subject: string, course: Course) => {
    let [_a, _b, number, _c] = input.split(/^([\w/]{1,10}) (\d{3,4}) Level$/);
    return course.name.split(course.catalogNumber)[0] === subject && course.catalogNumber.substring(0, 1) === number[0];
}

(async () => {
    let SUBJECTS = subjects as ExternalSubjectMapping[];
    let MAPPINGS = mappings as Course[];
    let start = Date.now();
    let matches: TransferableCourse[][] = [];

    for await (let { target, subjects } of SUBJECTS) {
        console.log(target);
        for await (let subject of subjects) {
            let courses = await axios
                .get(`https://admissions.uconn.edu/wp-json/uconn/v1/transfer-credits/subjects/${subject}?school=${target.replace(/\s/g, '%20')}`)
                .then(res => res.data as ExternalCourse[]);

            let targets: TransferableCourse[] = courses.map(course => {
                return {
                    external: {
                        name: course.ext_subject + course.ext_number,
                        title: course.int_title,
                        school: target
                    },
                    equiv: MAPPINGS.filter(mapping =>
                        (mapping.name.split(/\d{3,4}/)[0].toLowerCase() === course.int_subject.toLowerCase() && mapping.catalogNumber === course.int_number)
                        || mapping.catalogName === course.int_title
                        || (/^[\w/]{1,10} \d{3,4} Level$/.test(course.int_title) && isNLevel(course.int_title, course.int_subject, mapping))),
                }
            });

            matches.push(targets.filter(target => target.equiv.length > 0));

            let internalCourses = targets.map(target => target.equiv.length).reduce((a, b) => a + b, 0);
            console.log(` - ${subject} (${targets.length} course${targets.length === 1 ? '' : 's'}) :: ${internalCourses} mapping${internalCourses === 1 ? '' : 's'}`);
        }
    }

    matches = matches.filter(match => match.length > 0);
    console.log(`Finished generating transfer equivalency tree in ${Date.now() - start}ms`);
    fs.writeFileSync('./equiv.json', JSON.stringify(matches, null, 3), { encoding: 'utf8' });
})();
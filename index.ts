import data from './equiv.json';

export type TransferableCourse = {
    course: Course;
    equivalent: SimpleExternalCourse[];
}

export type SimpleExternalCourse = {
    school: string;
    name: string;
}

export type Course = {
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

const DATA = data as TransferableCourse[];

/**
 * Returns all equivalent courses offered by other
 * institutions for the given course.
 * 
 * This may not be 100% accurate since not all
 * courses will be equivalent for "XXXX #### Level"
 * labeled equivalencies.
 * 
 * @param name the name of the course to search
 */
export const getEquiv = (name: string): TransferableCourse => {
    let match = DATA.find(({ course }) => course.name.toLowerCase() === name.toLowerCase());
    if (!match) return null;
    return match;
}

export { DATA as Equivalencies };
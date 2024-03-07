import data from './equiv.json';

export type TransferableCourse = {
    external: SimpleExternalCourse;
    equiv: Course[];
}

export type SimpleExternalCourse = {
    school: string;
    name: string;
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
export const getEquiv = (name: string): TransferableCourse[] => {
    let DATA = (data as TransferableCourse[][]).reduce((acc, cur) => acc.concat(cur), []);
    return DATA.filter(c => c.equiv.some(e => e.name.toLowerCase() === name.toLowerCase()));
}
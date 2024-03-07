# Bluetrade

![version badge](https://img.shields.io/badge/version-1.2.0-blue)

Bluetrade is a TypeScript library that allows you to easily fetch the course transfer equivalencies for any UConn course.

## Installation

Use npm to install Bluetrade.

```bash
npm install @ilefa/bluetrade
```

## Usage

```ts
import { getEquiv } from '@ilefa/bluetrade';

// Fetch all equivalent courses for MATH2710
let equiv = getEquiv("CSE1010");

[
    {
        "course": {
            "name": "CSE1010",
            "catalogName": "Introduction to Computing for Engineers",
            "catalogNumber": "1010",
            "prerequisites": "May not be taken out of sequence after passing CSE 1729 or 2050.",
            "attributes": {
                "lab": false,
                "writing": false,
                "quantitative": false,
                "environmental": false,
                "contentAreas": [],
                "graduate": false
            },
            "credits": 3,
            "grading": "Graded",
            "description": "Introduction to computing logic, algorithmic thinking, computing processes, a programming language and computing environment. Knowledge obtained in this course enables use of the computer as an instrument to solve computing problems. Representative problems from science, mathematics, and engineering will be solved."
        },
        "equivalent": [
            {
                "school": "Central Connecticut State Univ",
                "name": "CS152",
                "title": "Introduction to Computing for Engineers"
            },
            {
                "school": "Eastern Connecticut St Univ",
                "name": "CSC180",
                "title": "Introduction to Computing for Engineers"
            },
            {
                "school": "Endicott College",
                "name": "CSC160",
                "title": "Introduction to Computing for Engineers"
            },
            {
                "school": "Monroe Cmty College",
                "name": "CPT101",
                "title": "Introduction to Computing for Engineers"
            },
            {
                "school": "Southern Connecticut State University",
                "name": "CSC152",
                "title": "Introduction to Computing for Engineers"
            },
            {
                "school": "Springfield Tech Cmty College",
                "name": "CSC100",
                "title": "Introduction to Computing for Engineers"
            },
            {
                "school": "Three Rivers Community College",
                "name": "CSC*108",
                "title": "Introduction to Computing for Engineers"
            },
            {
                "school": "Univ Vermont",
                "name": "CS021",
                "title": "Introduction to Computing for Engineers"
            }
        ]
    }
]
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
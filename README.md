# Bluetrade

![version badge](https://img.shields.io/badge/version-1.0.0-blue)

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
let equiv = getEquiv("MATH2710");

[
    {
        "external": {
            "name": "MAT*287",
            "title": "Transition to Advanced Mathematics",
            "school": "Manchester Community College"
        },
        "equiv": [
            {
                "name": "MATH2710",
                "catalogName": "Transition to Advanced Mathematics",
                "catalogNumber": "2710",
                "prerequisites": "MATH 1132Q or 1152Q. May not be taken for credit after passing MATH 2143. May not be taken out of sequence after passing 3150, 3210, 3230, 3240, 3260, 3270, 3330, or 3370.",
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
                "description": "Basic concepts, principles, and techniques of mathematical proof common to higher mathematics. Logic, set theory, counting principles, mathematical induction, relations, functions. Concepts from abstract algebra and analysis. Students intending to major in mathematics should ordinarily take this course during the third or fourth semester. Students wishing to use MATH 2710 or 2710W as a prerequisite for later MATH courses need to earn a \"C\" or better."
            },
            {
                "name": "MATH2710W",
                "catalogName": "Transition to Advanced Mathematics",
                "catalogNumber": "2710W",
                "prerequisites": "Math 1132 or 1152; ENGL 1007 or 1010 or 1011 or 2011. Open only to Mathematics majors. Not open for credit to students who have passed MATH 2143.",
                "attributes": {
                    "lab": false,
                    "writing": true,
                    "quantitative": false,
                    "environmental": false,
                    "contentAreas": [],
                    "graduate": false
                },
                "credits": 3,
                "grading": "Graded",
                "description": "Basic concepts, principles, and techniques of mathematical proof common to higher mathematics. Logic, set theory, counting principles, mathematical induction, relations, functions. Concepts from abstract algebra and analysis. Students intending to major in Mathematics should ordinarily take this course or Math 2710 during the third or fourth semester. Students wishing to use MATH 2710 or 2710W as a prerequisite for later MATH courses need to earn a \"C\" or better."
            }
        ]
    },
    ...
]
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
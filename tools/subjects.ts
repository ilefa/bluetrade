import axios from 'axios';
import { existsSync, renameSync, writeFileSync } from 'fs';

(async () => {
    let schools = await axios
        .get('https://admissions.uconn.edu/wp-json/uconn/v1/transfer-credits/schools')
        .then(res => res.data)
        .then(schools => schools as string[])
        .catch(_ => []);

    console.log(`Resolved ${schools.length} foreign schools..`);

    let subjects = await Promise.all(schools.map(async school => ({
        school, subjects: await axios
            .get(`https://admissions.uconn.edu/wp-json/uconn/v1/transfer-credits/schools/${school}?get-subjects`)
            .then(res => res.data)
            .then(subjects => subjects.map(subject => subject.ext_subject))
            .catch(_ => [])
    })));

    let path = './subjects.json';
    if (existsSync(path)) {
        let timestamp = Date.now();
        let newPath = path.replace('.json', `-${timestamp}.json`);
        console.log(`Found old subjects outfile, preserving it as: \`${newPath}\``);
        renameSync(path, newPath);
    }

    console.log(`Writing ${subjects.length} subjects to ${path}..`);
    writeFileSync(path, JSON.stringify(subjects, null, 3));
})();
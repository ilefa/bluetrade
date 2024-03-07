import { TransferableCourse } from '..';

import {
    existsSync,
    readdirSync,
    readFileSync,
    renameSync,
    rmSync,
    writeFileSync
} from 'fs';

type OutputFragment = {
    school: string;
    targets: TransferableCourse[];
}

(async () => {
    let fragments = readdirSync('.').filter(file => file.startsWith('equiv-'));
    let targets = fragments
        .map(fragment => JSON.parse(readFileSync(fragment, 'utf-8')) as OutputFragment)
        .map(fragment => fragment.targets)
        .filter(fragment => fragment?.length > 0)
        .reduce((a, b) => a.concat(b), []);

    // preserve old equiv file if exists
    let path = './equiv.json';
    if (existsSync(path)) {
        let timestamp = Date.now();
        let newPath = path.replace('.json', `-${timestamp}.json`);
        console.log(`Found old equiv outfile, preserving it as: \`${newPath}\``);
        renameSync(path, newPath);
    }

    // write outfile
    writeFileSync(path, JSON.stringify(targets, null, 3), { encoding: 'utf8' });
    console.log(`Merged ${fragments.length} fragments into ${path}`);
    
    // clean up fragments
    console.log('Cleaning up fragments..');
    fragments.forEach(fragment => {
        rmSync(fragment);
        console.log(`Removed ${fragment}`);
    });
})();
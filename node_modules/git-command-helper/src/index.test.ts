import { join } from 'path';
import { gitHelper } from '.';

const git = new gitHelper(join(__dirname, '../../'));
//git.info().then(console.log);
git.getbranch().then(console.log);

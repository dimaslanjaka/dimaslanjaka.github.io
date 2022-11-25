import * as gitHelper from '../src';

type helper = gitHelper.git;
declare module 'git-command-helper' {
  export gitHelper.git;
}

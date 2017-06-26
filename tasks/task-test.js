// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';
import fs from 'fs-extra';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import debug from 'gulp-debug';
import eslint from 'gulp-eslint';
import yargs from 'yargs';

const ROOT_DIR = path.join(__dirname, '..');

const ESLINT_IGNORE_PATH = path.join(ROOT_DIR, '.eslintignore');
const ESLINT_IGNORE_CONTENTS = fs.readFileSync(ESLINT_IGNORE_PATH, { encoding: 'utf8' });

gulp.task('eslint', () => {
  if (yargs.argv.unit) {
    return Promise.resolve();
  }
  const glob = [
    `${ROOT_DIR}/**/*.js`,
    ...ESLINT_IGNORE_CONTENTS.trim().split('\n').map(i => `!${i}`),
  ];
  return gulp.src(glob)
    .pipe(debug({ title: `Running eslint${yargs.argv.fix ? ' --fix' : ''}:` }))
    .pipe(eslint({ fix: yargs.argv.fix }))
    .pipe(eslint.format())
    .pipe(gulpif(f => f.eslint != null && f.eslint.fixed, gulp.dest(ROOT_DIR)))
    .pipe(eslint.failAfterError());
});

gulp.task('test', gulp.series(
  'eslint',
));

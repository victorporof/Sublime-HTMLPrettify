// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';
import fs from 'fs-extra';

import gulp from 'gulp';
import debug from 'gulp-debug';
import changed from 'gulp-changed';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import pick from 'lodash/pick';

import Manifest from '../package.json';
import spawn from '../src/js/shared/spawn';

const ROOT_DIR = path.join(__dirname, '..');

const BABELRC_PATH = path.join(ROOT_DIR, '.babelrc');
const BABELRC_CONTENTS = fs.readJsonSync(BABELRC_PATH, { encoding: 'utf8' });

const SRC_DIR = path.join(ROOT_DIR, 'src', 'js');
const BUILD_DIR = path.join(ROOT_DIR, 'build', 'js-transpiled');

gulp.task('build:babel', () =>
  gulp.src(`${SRC_DIR}/**/*.js`)
    .pipe(changed(BUILD_DIR, { extension: '.js' }))
    .pipe(debug({ title: 'Running babel' }))
    .pipe(sourcemaps.init())
    .pipe(babel(BABELRC_CONTENTS))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(BUILD_DIR)));

gulp.task('build:write-manifest', () => {
  const config = pick(Manifest, ['dependencies']);
  return fs.writeJson(path.join(BUILD_DIR, 'package.json'), config);
});

gulp.task('build:npm:install-modules', () => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  return spawn(npm, ['install', '--only=production'], { cwd: BUILD_DIR });
});

gulp.task('build:npm:prune-modules', () => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  return spawn(npm, ['prune', '--production'], { cwd: BUILD_DIR });
});

gulp.task('build', gulp.series(
  'build:babel',
  'build:write-manifest',
  'build:npm:install-modules',
  'build:npm:prune-modules',
));

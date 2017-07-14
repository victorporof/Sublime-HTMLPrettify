// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import gulp from 'gulp';
import del from 'del';

const ROOT_DIR = path.join(__dirname, '..');
const BUILD_DIR = path.join(ROOT_DIR, 'build', 'js-transpiled');
const NODE_MODULES = path.join(ROOT_DIR, 'node_modules');

gulp.task('clean:build', () => del([BUILD_DIR]));
gulp.task('clean:deps', () => del([NODE_MODULES]));

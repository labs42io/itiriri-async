import * as browserify from 'browserify';
import * as del from 'del';
import * as gulp from 'gulp';
import * as mocha from 'gulp-mocha';
import * as replace from 'gulp-replace';
import * as shell from 'gulp-shell';
import * as sourcemaps from 'gulp-sourcemaps';
import { default as tslint } from 'gulp-tslint';
import * as ts from 'gulp-typescript';
import { default as uglify } from 'gulp-uglify-es';
import { Gulpclass, MergedTask, SequenceTask, Task } from 'gulpclass';
import * as buffer from 'vinyl-buffer';
import * as source from 'vinyl-source-stream';

@Gulpclass()
export class Gulpfile {

  /**
   * Cleans build folder.
   */
  @Task()
  clean() {
    return del(['./build/**', './coverage/**']);
  }

  /**
   * Runs typescript files compilation.
   */
  @Task()
  compile() {
    return gulp.src('./package.json', { read: false })
      .pipe(shell(['tsc']));
  }

  /**
   * Runs unit-tests.
   */
  @Task()
  unit() {
    // back compatibility
    // node < v10 requires --harmony_async_iteration for async iterators
    if (getProcessVersion() < 10) {
      return gulp.src('./build/compiled/test/**/*.js')
        .pipe(mocha({ harmony_async_iteration: '', harmony_promise_finally: '' }));
    }
    return gulp.src('./build/compiled/test/**/*.js').pipe(mocha());
  }

  /**
   * Compiles the code and runs tests.
   */
  @SequenceTask()
  test() {
    return ['clean', 'compile', 'unit'];
  }

  /**
   * Runs the tslint.
   */
  @Task()
  tslint() {
    return gulp.src(['./lib/**/*.ts', './test/**/*.ts', './examples/**/*.ts'])
      .pipe(tslint({ formatter: 'stylish' }))
      .pipe(tslint.report({
        emitError: true,
        summarizeFailureOutput: true,
      }));
  }

  /**
   * Copies all sources to the package directory.
   */
  @MergedTask()
  packageCompile() {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult = gulp.src(['lib/**/*.ts'])
      .pipe(sourcemaps.init())
      .pipe(tsProject());

    return [
      tsResult.dts.pipe(gulp.dest('build/package')),
      tsResult.js
        .pipe(sourcemaps.write('.', { sourceRoot: '', includeContent: true }))
        .pipe(gulp.dest('build/package')),
    ];
  }

  /**
   * Moves all compiled files to the final package directory.
   */
  @Task()
  packageMoveCompiledFiles() {
    return gulp.src('./build/package/lib/**/*')
      .pipe(gulp.dest('./build/package'));
  }

  /**
   * Clears the directory with compiled files.
   */
  @Task()
  packageClearCompileDirectory() {
    return del(['build/package/lib/**']);
  }

  /**
   * Change the "private" state of the packaged package.json file to public.
   */
  @Task()
  packagePreparePackageFile() {
    return gulp.src('./package.json')
      .pipe(replace('\"private\": true,', '\"private\": false,'))
      .pipe(gulp.dest('./build/package'));
  }

  /**
   * This task will replace all typescript code blocks in the README
   * (since npm does not support typescript syntax highlighting)
   * and copy this README file into the package folder.
   */
  @Task()
  packageReadmeFile() {
    return gulp.src('./README.md')
      .pipe(replace(/```ts([\s\S]*?)```/g, '```javascript$1```'))
      .pipe(gulp.dest('./build/package'));
  }

  /**
   * Creates a package that can be published to npm.
   */
  @SequenceTask()
  package() {
    return [
      'clean',
      'packageCompile',
      'packageMoveCompiledFiles',
      'packageClearCompileDirectory',
      ['packagePreparePackageFile', 'packageReadmeFile'],
    ];
  }

  /**
   * Publishes a package to npm from ./build/package directory.
   */
  @Task()
  npmPublish() {
    return gulp.src('./package.json', { read: false })
      .pipe(shell(['cd ./build/package && npm publish --access public']));
  }

  /**
   * Creates a package and publishes it to npm.
   */
  @SequenceTask()
  publish() {
    return ['test', 'tslint', 'package', 'npmPublish'];
  }

  @Task()
  bundle() {
    return browserify({
      standalone: 'itiririAsync',
      entries: './build/compiled/lib/index.js',
    }).bundle()
      .on('error', e => console.error(e))
      .pipe(source('itiriri-async.min.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('.'));
  }

  @Task()
  coverage() {
    const flags = getProcessVersion() < 10
      ? '--harmony_async_iteration --harmony-promise-finally' : '';

    return gulp.src('./package.json', { read: false })
      .pipe(shell([
        `node ${flags} node_modules/.bin/istanbul cover ` +
        'node_modules/mocha/bin/_mocha ' +
        './build/compiled/test ./build/compiled/lib -- --recursive']));
  }
}

function getProcessVersion(defaultVersion: number = 10) {
  if (process && process.version) {
    const tokens = process.version.match(/^v(\d+\.\d+)/);
    return tokens ? Number.parseInt(tokens[1], 10) : defaultVersion;
  }

  return defaultVersion;
}

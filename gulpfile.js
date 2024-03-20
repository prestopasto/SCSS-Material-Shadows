'use strict';

import gulp from 'gulp'

import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';

const { src, dest, watch } = gulp
const sass = gulpSass( dartSass );

const processSass = () => src( './src/*.scss' )
  .pipe( sass.sync().on( 'error', sass.logError ) )
  .pipe( dest( './css' ) )

const doWatch = () => {
  watch( './src/*.scss', processSass );
}

export { processSass as sass }
export { doWatch as watch }

export default processSass

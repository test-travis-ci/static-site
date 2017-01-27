// Bootstrap requires `window.jQuery` be present, but ES6 resolves all imports
// before running subsequent code. This leads to it being impossible to declare
// a global `jQuery` variable before the Bootstrap import is resolved. Loading
// jQuery and declaring its global variable in a separate file solves this
// problem.
//
// https://github.com/rollup/rollup/issues/592#issuecomment-205783255

import jQuery from 'jquery'

window.jQuery = jQuery

import { Diff2Html } from 'diff2html';
// const difflib = require('difflib');
import * as difflib from 'diffit';
import * as util from 'util';

/* https://github.com/rtfpessoa/diff2html#configuration */
const defaultOptions = {
  fileName: '',
  inputFormat: 'diff', // diff || json
  outputFormat: 'line-by-line', // line-by-line || side-by-side
  showFiles: false,
  matching: 'none', // lines || words || none
  synchronisedScroll: false,
  matchWordsThreshold: 0.25,
  matchingMaxComparisons: 2500,
};

function renderDiff(beforeString, afterString, options) {
  // eslint-disable-next-line no-underscore-dangle
  const _options = Object.assign({}, defaultOptions, options);

  const beforeArray = beforeString.split(/\r\n|\r|\n/);
  const afterArray = afterString.split(/\r\n|\r|\n/);
  const diffArray = difflib.unifiedDiff(beforeArray, afterArray, {
    fromFile: _options.fileName,
    toFile: _options.fileName,
    // n is not work, see https://github.com/qiao/difflib.js/issues/8
    // use fork version: diffit
    n: 1000,
  });

  const diffString = util.format('diff --git %s %s\n%s',
    _options.fileName,
    _options.fileName,
    diffArray.join('\n'),
  );

  return diffString;
}

function renderHtml(beforeString, afterString, options) {
  const diffString = this.renderDiff(beforeString, afterString, options);
  const html = Diff2Html.getPrettyHtml(diffString, options);
  return html;
}

export {
  renderDiff,
  renderHtml,
};

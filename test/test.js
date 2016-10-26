import {expect} from 'chai'
import {transform} from 'babel-core';
import {minify} from 'uglify-js';

// :: String -> String
// Will remove whitespace, etc, so two code samples with the same structure are
// more easily compared.
const min = code => minify(code, { fromString : true, mangle : false }).code;

const jsxOnlyTransformOptions = {
  plugins: [
    ['transform-react-jsx']
  ],
  filename : 'foo',
  filenameRelative : 'fff'
};

const addNameTransformOptions = {
  plugins: [
    './index',
    ['transform-react-jsx']
  ],
  filename : 'foo',
  filenameRelative : 'fff'
};

describe('babel-plugin-add-name', function() {

  it('will add a "name" attribute to a JSX element using the given filename', function() {

    const actualCode   = '<Blue/>';
    const expectedCode = '<Blue name="foo"/>';

    const compiledActual   = transform(actualCode, addNameTransformOptions).code;
    const compiledExpected = transform(expectedCode, jsxOnlyTransformOptions).code;

    expect(min(compiledExpected)).to.equal(min(compiledActual));

  });

  it('will not add a "name" attribute if one is already present on the target node', function() {

    const actualCode   = '<Blue name="exists"/>';
    const expectedCode = '<Blue name="exists"/>';

    const compiledActual   = transform(actualCode, addNameTransformOptions).code;
    const compiledExpected = transform(expectedCode, jsxOnlyTransformOptions).code;

    expect(min(compiledExpected)).to.equal(min(compiledActual));

  });

  // it only acts on the first lowercase JSXIdentifiers in the return block of
  // the last React.createComponent in a file.

});

jest.dontMock('../Hello.js');

describe('Hello', function() {
  it('contains text', function() {
    var React = require('react/addons');
    var Hello = require('../Hello.js');
    var TestUtils = React.addons.TestUtils;

    // Render a Hello with label in the document
    var Hello = TestUtils.renderIntoDocument(
      <Hello />
    );

    expect(React.findDOMNode(Hello).textContent).toEqual('Hello world');

  });
});

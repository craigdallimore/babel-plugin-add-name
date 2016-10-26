// :: Object attribute -> Boolean
const isNameAttribute = attr => attr.name.name === 'name';

// :: Babel -> visitor
module.exports = function AddNames(babel) {

  var t = babel.types;

  return {
    visitor: {
      JSXOpeningElement: function transform(path, state) {

        if (path.node.hasBeenVisited) {
          return;
        }

        if (path.node.attributes.filter(isNameAttribute).length) {
          return;
        }

        const node = t.jSXOpeningElement(
          path.node.name,
          path.node.attributes.concat([t.jSXAttribute(
            t.jSXIdentifier('name'),
            t.stringLiteral(state.file.opts.basename)
          )]),
          path.node.selfClosing
        );

        node.hasBeenVisited = true;
        path.replaceWith(node);

      }
    }
  };

}

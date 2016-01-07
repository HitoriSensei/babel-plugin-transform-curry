"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

exports.__esModule = true;

exports["default"] = function (_ref2) {
  var t = _ref2.types;

  function hasPlaceholders(nodes) {
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (t.isIdentifier(node) && node.name == "__") {
        return true;
      }
    }
    return false;
  }

  return {
    visitor: {
      CallExpression: function CallExpression(path, state) {
        var node = path.node;

        var args = node.arguments;

        if (!hasPlaceholders(args)) return;

        var placeholders = args.reduce(function(out,node,index){
          if(t.isIdentifier(node) && node.name == "__"){
            out.push({
              index: index,
              name: "__c"+index
            })
          }
          return out;
        },[])

        var replacedArgs = placeholders.reduce(function(out,p){
          out[p.index] = t.identifier(p.name);
          return out;
        },args.slice())

        path.replaceWith(t.arrowFunctionExpression(placeholders.map(function(p){ return t.identifier(p.name); }),t.callExpression(node.callee,replacedArgs)));
      }
    }
  };
};

module.exports = exports["default"];
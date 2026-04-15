---
title: no-console-log
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: no-console-log.js
---

# no-console-log

```js
// no-console-log.js

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "禁止使用 console.log，请使用 logger.log 替代",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    messages: {
      noConsoleLog: "禁止使用 console.log，请使用 logger.log 替代",
    },
  },

  create(context) {
    return {
      "CallExpression:exit"(node) {
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.type === "Identifier" &&
          node.callee.object.name === "console" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "log"
        ) {
          context.report({
            node,
            messageId: "noConsoleLog",
            fix(fixer) {
              return fixer.replaceText(node.callee.object, "logger");
            },
          });
        }
      },
    };
  },
};

```

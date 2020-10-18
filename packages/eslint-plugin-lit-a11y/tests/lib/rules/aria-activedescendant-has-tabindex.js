/**
 * @fileoverview Enforce elements with aria-activedescendant are tabbable.
 * @author open-wc
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/aria-activedescendant-has-tabindex');
const { prependLitHtmlImport } = require('../../../lib/utils/utils.js');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015,
  },
});

ruleTester.run('aria-activedescendant-has-tabindex', rule, {
  valid: [
    {
      code: 'html`<div aria-activedescendant="foo" tabindex="0"></div>`;',
    },
    {
      code: 'html`<div aria-activedescendant=${someID} tabindex=${0}></div>`;',
    },
    {
      code: 'html`<div aria-activedescendant=${someID} tabindex="0"></div>`;',
    },
    {
      code: 'html`<div aria-activedescendant=${someID} tabindex=${1}></div>`;',
    },
    {
      code: 'html`<input aria-activedescendant=${someID} />`;',
    },
    {
      code: 'html`<input aria-activedescendant=${someID} tabindex=${1} />`;',
    },
    {
      code: 'html`<input aria-activedescendant=${someID} tabindex=${0} />`;',
    },
    {
      code: 'html`<input aria-activedescendant=${someID} tabindex=${-1} />`;',
    },
    {
      code: 'html`<div aria-activedescendant=${someID} tabindex=${-1}></div>`;',
    },
    {
      code: 'html`<div aria-activedescendant=${someID} tabindex="-1"></div>`;',
    },
    {
      code: 'html`<input aria-activedescendant=${someID} tabindex=${-1} />`;',
    },
  ].map(prependLitHtmlImport),

  invalid: [
    {
      code: 'html`<div aria-activedescendant=${someID}></div>`;',
      errors: [
        {
          message: 'Elements with aria-activedescendant must be tabbable.',
        },
      ],
    },
  ].map(prependLitHtmlImport),
});
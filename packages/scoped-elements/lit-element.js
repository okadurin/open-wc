import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { adoptStyles } from 'lit';
import { ScopedElementsMixin as BaseScopedElementsMixin } from './html-element.js';
// eslint-disable-next-line no-unused-vars, import/no-unresolved
import { ScopedElementsHost } from './types.js';

/**
 * @typedef {import('./types.js').ScopedElementsMap} ScopedElementsMap
 * @typedef {import('lit').CSSResultOrNative} CSSResultOrNative
 * @typedef {import('lit').LitElement} LitElement
 * @typedef {typeof import('lit').LitElement} TypeofLitElement
 * @typedef {import('@open-wc/dedupe-mixin').Constructor<LitElement>} LitElementConstructor
 * @typedef {import('@open-wc/dedupe-mixin').Constructor<ScopedElementsHost>} ScopedElementsHostConstructor
 */

/**
 * @template {LitElementConstructor} T
 * @param {T} superclass
 * @return {T & ScopedElementsHostConstructor & typeof ScopedElementsHost}
 */
const ScopedElementsMixinImplementation = superclass =>
  class ScopedElementsHostImplementation extends BaseScopedElementsMixin(superclass) {
    createRenderRoot() {
      const { shadowRootOptions, elementStyles } = /** @type {TypeofLitElement} */ (
        this.constructor
      );

      const shadowRoot = this.attachShadow(shadowRootOptions);
      // @ts-ignore
      this.renderOptions.creationScope = shadowRoot;

      adoptStyles(shadowRoot, elementStyles);

      this.renderOptions.renderBefore ??= shadowRoot.firstChild;

      return shadowRoot;
    }
  };

export const ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);

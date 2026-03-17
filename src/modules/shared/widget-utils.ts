import { createRoot } from 'react-dom/client';
import type { ReactElement } from 'react';

export interface WidgetMountOptions {
  containerId: string;
  defaultCss: string;
}

/**
 * Mounts a React widget into a target container div.
 * Follows the SaniGear embed pattern:
 * - Finds container by id
 * - Checks data-no-css to decide if default styles should be injected
 * - Reads data-config for JSON config override
 * - Renders the React component
 */
export function mountWidget(
  options: WidgetMountOptions,
  renderFn: (container: HTMLElement, config: Record<string, unknown>) => ReactElement
) {
  const container = document.getElementById(options.containerId);
  if (!container) {
    console.warn(`[Widget] Container #${options.containerId} not found.`);
    return;
  }

  // Inject default CSS unless data-no-css is set
  const noCss = container.getAttribute('data-no-css') === 'true';
  if (!noCss && options.defaultCss) {
    const style = document.createElement('style');
    style.setAttribute('data-widget', options.containerId);
    style.textContent = options.defaultCss;
    document.head.appendChild(style);
  }

  // Read config from data-config attribute (JSON) or window.__BS_CONFIG__
  let config: Record<string, unknown> = {};
  const configAttr = container.getAttribute('data-config');
  if (configAttr) {
    try {
      config = JSON.parse(configAttr);
    } catch (e) {
      console.warn(`[Widget] Invalid JSON in data-config on #${options.containerId}`);
    }
  } else if (typeof window !== 'undefined' && (window as any).__BS_CONFIG__) {
    config = (window as any).__BS_CONFIG__;
  }

  // Mount React component
  const root = createRoot(container);
  root.render(renderFn(container, config));
}

/**
 * Reads a CSS custom property value from the document or a specific element.
 */
export function getCssVar(name: string, el?: HTMLElement): string {
  const target = el ?? document.documentElement;
  return getComputedStyle(target).getPropertyValue(name).trim();
}

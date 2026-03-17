import { createElement } from 'react';
import { mountWidget } from '../shared/widget-utils';
import ServicesWidget from './ServicesWidget';
import servicesCSS from './services.css?inline';

mountWidget(
  {
    containerId: 'bs-services',
    defaultCss: servicesCSS,
  },
  (_container, config) => {
    return createElement(ServicesWidget, { config: config as any });
  }
);

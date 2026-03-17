import { createElement } from 'react';
import { mountWidget } from '../shared/widget-utils';
import HoursWidget from './HoursWidget';
import hoursCSS from './hours.css?inline';

mountWidget(
  {
    containerId: 'bs-hours',
    defaultCss: hoursCSS,
  },
  (_container, config) => {
    return createElement(HoursWidget, { config: config as any });
  }
);

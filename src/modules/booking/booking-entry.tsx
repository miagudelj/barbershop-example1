import { createElement } from 'react';
import { mountWidget } from '../shared/widget-utils';
import BookingWidget from './BookingWidget';
import bookingCSS from './booking.css?inline';

mountWidget(
  {
    containerId: 'bs-booking',
    defaultCss: bookingCSS,
  },
  (_container, config) => {
    return createElement(BookingWidget, { config: config as any });
  }
);

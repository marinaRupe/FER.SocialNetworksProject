import moment from 'moment';

import {
  DATE_FORMAT_LONG_DOTS,
} from '../constants/dateTimeFormat.constants';

export const formatDate = (date, format = DATE_FORMAT_LONG_DOTS) => moment(date).format(format);

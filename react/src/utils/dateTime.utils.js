import moment from 'moment';

import {
  DATE_FORMAT_LONG_DASHES,
} from '../constants/dateTimeFormat.constants';

export const formatDate = (date, format = DATE_FORMAT_LONG_DASHES) => moment(date).format(format);
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment from 'moment';
import { parsePostReturn } from '../../markdown/transformPosts';

export function date_local(page: parsePostReturn['metadata']) {
  if (page.lang) {
    moment.locale(page.lang);
  } else {
    moment.locale('en');
  }
  return page.lang || 'en';
}

export function date_format(str: string, pattern: 'MMMM Do YYYY, h:mm:ss a') {
  try {
    return moment(str).format(pattern);
  } catch (error) {
    return `${error.message} ${moment().format()}`;
  }
}

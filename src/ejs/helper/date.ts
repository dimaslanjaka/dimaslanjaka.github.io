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
  if (!str) return null;

  if (typeof str == 'string') {
    const time = str.trim();
    if (time.length > 0) {
      try {
        return moment(time).format(pattern);
      } catch (error) {
        console.error(error);
      }
    }
  }
  return null;
}

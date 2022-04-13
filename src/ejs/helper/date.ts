/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment, { isMoment } from 'moment';
import { parsePostReturn } from '../../markdown/transformPosts';
import config from '../../types/_config';

export function date_local(page: parsePostReturn['metadata']) {
  if (page.lang) {
    moment.locale(page.lang);
  } else {
    moment.locale('en');
  }
  return page.lang || 'en';
}

export function date_format(str: string | Date | moment.MomentInput, pattern: 'MMMM Do YYYY, h:mm:ss a') {
  if (!str) return null;

  if (str instanceof Date) str = str.toString();
  if (moment.isMoment(str)) return str.format(pattern);

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

export const isDate = (value) => typeof value === 'object' && value instanceof Date && !isNaN(value.getTime());

export function getMoment(date: any, lang: any, timezone: string) {
  if (date == null) date = moment();
  if (!isMoment(date)) date = moment(isDate(date) ? date : new Date(date));
  lang = toMomentLocale(lang);

  if (lang) date = date.locale(lang);
  if (timezone) date = date.tz(timezone);

  return date;
}

export function toISOString(date) {
  if (date == null) {
    return new Date().toISOString();
  }

  if (date instanceof Date || isMoment(date)) {
    return date.toISOString();
  }

  return new Date(date).toISOString();
}

export function dateHelper(date, format) {
  const moment = getMoment(date, getLanguage(this), config.timezone);
  return moment.format(format || config.date_format);
}

export function timeHelper(date, format) {
  const moment = getMoment(date, getLanguage(this), config.timezone);
  return moment.format(format || config.time_format);
}

export function fullDateHelper(date, format) {
  if (format) {
    const moment = getMoment(date, getLanguage(this), this.config.timezone);
    return moment.format(format);
  }

  return `${this.date(date)} ${this.time(date)}`;
}

export function relativeDateHelper(date) {
  const moment = getMoment(date, getLanguage(this), config.timezone);
  return moment.fromNow();
}

export function timeTagHelper(date, format) {
  return `<time datetime="${toISOString(date)}">${this.date(date, format, getLanguage(this), config.timezone)}</time>`;
}

export function getLanguage(ctx) {
  return ctx.page.lang || ctx.page.language || ctx.config.language;
}

/**
 * Convert Hexo language code to Moment locale code.
 * examples:
 *   default => en
 *   zh-CN => zh-cn
 *
 * Moment defined locales: https://github.com/moment/moment/tree/master/locale
 */
export function toMomentLocale(lang: string) {
  if (lang === undefined) {
    return undefined;
  }

  // moment.locale('') equals moment.locale('en')
  // moment.locale(null) equals moment.locale('en')
  if (!lang || lang === 'en' || lang === 'default') {
    return 'en';
  }
  return lang.toLowerCase().replace('_', '-');
}

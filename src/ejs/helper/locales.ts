import { postMap } from '../../markdown/transformPosts/parsePost';

const localeMap = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
  hu: 'hu_HU',
  id: 'id_ID',
  it: 'it_IT',
  ja: 'ja_JP',
  ko: 'ko_KR',
  nl: 'nl_NL',
  ru: 'ru_RU',
  th: 'th_TH',
  tr: 'tr_TR',
  vi: 'vi_VN',
};

export function get_locale(page: string | postMap['metadata']): string {
  let str = '';
  if (typeof page == 'string') {
    str = page;
  } else {
    str = page.lang || page.language || 'en';
  }
  if (str.length === 2 && localeMap[str]) return localeMap[str];
  if (str.length === 5) {
    let territory = [];
    if (str.includes('-')) {
      territory = str.split('-');
    } else {
      territory = str.split('_');
    }

    if (territory.length === 2) return territory[0].toLowerCase() + '_' + territory[1].toUpperCase();
  }
  return 'en';
}

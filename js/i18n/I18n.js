/**
 * I18n — English / Persian with RTL support
 */

import { TRANSLATIONS } from './translations.js';

export class I18n {
  constructor() {
    this.lang = localStorage.getItem('snake3d_lang') || 'en';
    this.apply();
  }

  setLang(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.lang = lang;
    localStorage.setItem('snake3d_lang', lang);
    this.apply();
  }

  t(key) {
    const table = TRANSLATIONS[this.lang] || TRANSLATIONS.en;
    return table[key] ?? TRANSLATIONS.en[key] ?? key;
  }

  apply() {
    const dir = this.lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = this.lang === 'fa' ? 'fa' : 'en';
    document.documentElement.dir = dir;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });
    document.getElementById('btn-lang-en')?.classList.toggle('active', this.lang === 'en');
    document.getElementById('btn-lang-fa')?.classList.toggle('active', this.lang === 'fa');
  }
}

// i18n IIFE - wrapped in try-catch to prevent loader freeze
try {
(function() {
    'use strict';

    class I18n {
        constructor() {
            this.translations = {};
            this.supportedLanguages = ['ko', 'en', 'ja', 'zh', 'es', 'pt', 'id', 'tr', 'de', 'fr', 'hi', 'ru'];
            this.currentLang = this.detectLanguage();
            this.isLoading = false;
        }

        detectLanguage() {
            try {
                const params = new URLSearchParams(window.location.search || '');
                const urlLang = params.get('lang');
                if (urlLang && this.supportedLanguages.includes(urlLang)) return urlLang;
            } catch (e) {
                // URL language hints are best-effort only.
            }
            const saved = localStorage.getItem('preferredLanguage');
            if (saved && this.supportedLanguages.includes(saved)) return saved;
            const browser = navigator.language.split('-')[0].toLowerCase();
            if (this.supportedLanguages.includes(browser)) return browser;
            return 'en';
        }

        async loadTranslations(lang) {
            if (this.isLoading) return;
            try {
                this.isLoading = true;
                if (this.translations[lang]) {
                    this.isLoading = false;
                    return this.translations[lang];
                }
                const res = await fetch('js/locales/' + lang + '.json');
                if (!res.ok) throw new Error('Failed to load: ' + lang);
                const data = await res.json();
                this.translations[lang] = data;
                this.isLoading = false;
                return data;
            } catch (e) {
                console.warn('i18n load warning:', e);
                this.isLoading = false;
                if (lang !== 'en') return this.loadTranslations('en');
                return null;
            }
        }

        t(key) {
            const keys = key.split('.');
            let val = this.translations[this.currentLang];
            if (!val) return key;
            for (const k of keys) {
                if (val && typeof val === 'object' && k in val) {
                    val = val[k];
                } else {
                    return key;
                }
            }
            return val || key;
        }

        getSeoHref(lang) {
            const links = document.querySelectorAll('link[rel="alternate"][hreflang]');
            const hrefMap = {};
            links.forEach(link => {
                const hreflang = link.getAttribute('hreflang');
                if (hreflang) hrefMap[hreflang] = link.href;
            });
            return hrefMap[lang] || hrefMap['x-default'] || window.location.href;
        }

        syncSeoState(lang, updateHistory = false) {
            const currentUrl = new URL(window.location.href);
            const targetLang = updateHistory || currentUrl.searchParams.has('lang') ? lang : 'x-default';
            const targetHref = this.getSeoHref(targetLang);
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) canonical.href = targetHref;
            const ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.content = targetHref;
            if (updateHistory) {
                const nextUrl = new URL(targetHref);
                nextUrl.hash = currentUrl.hash;
                window.history.replaceState({}, '', nextUrl.pathname + nextUrl.search + nextUrl.hash);
            }
        }

        async setLanguage(lang) {
            if (!this.supportedLanguages.includes(lang)) return;
            this.currentLang = lang;
            localStorage.setItem('preferredLanguage', lang);
            await this.loadTranslations(lang);
            this.updateUI();
            this.updateLangButtons();
            this.syncSeoState(lang, true);
        }

        updateUI() {
            document.documentElement.lang = this.currentLang;
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const text = this.t(key);
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder !== undefined) el.placeholder = text;
                } else if (el.tagName === 'META') {
                    el.setAttribute('content', text);
                } else {
                    el.textContent = text;
                }
            });
        }

        updateLangButtons() {
            document.querySelectorAll('.lang-option').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
            });
        }

        getCurrentLanguage() { return this.currentLang; }

        async init() {
            const loaded = await this.loadTranslations(this.currentLang);
            if (loaded) this.updateUI();
            this.updateLangButtons();
            this.syncSeoState(this.currentLang);
        }
    }

    window.i18n = new I18n();
})();
} catch (e) {
    console.error('i18n IIFE error:', e);
}

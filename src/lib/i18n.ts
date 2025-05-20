import { register, init } from 'svelte-i18n';

register('en', () => import('../locales/en.json'));
register('ru', () => import('../locales/ru.json'));
register('ar', () => import('../locales/ar.json'));

init({
  fallbackLocale: 'en',
  initialLocale: 'en',
});

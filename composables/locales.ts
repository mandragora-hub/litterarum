import type { Ref } from "vue";

export const useLocale = () => {
  const initialLocale =
    useLocaleUserSetting().value || useDefaultLocale().value;

  // const locale = useState<string>("locale", () => initialLocale);
  const { locale, availableLocales } = useI18n();
  locale.value = initialLocale;
  watch(locale, (newLocale) => {
    const localeUserSetting = useLocaleUserSetting();
    localeUserSetting.value = newLocale;
    locale.value = newLocale;
  });

  return { locale, availableLocales };
};

export const useDefaultLocale = (fallback = "en") => {
  const locale = ref(fallback);
  if (process.server) {
    // Learn more about the nuxtApp interface on https://nuxt.com/docs/guide/going-further/internals#the-nuxtapp-interface
    const reqLocale = useRequestHeaders()["accept-language"]?.split(",")[0];
    if (reqLocale) {
      locale.value = reqLocale.substring(0, 2);
    }
  } else if (process.client) {
    const navLang = navigator.language.substring(0, 2);
    if (navLang) {
      locale.value = navLang;
    }
  }
  return locale;
};

export const useLocaleUserSetting = () => {
  const localeUserSetting = useCookie("locale");
  return localeUserSetting;
};
// Using Intl.DateTimeFormat for language-sensitive date and time formatting
// Learn more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
export const useLocaleDate = (
  date: Ref<Date> | Date,
  { locale } = useLocale()
) => {
  return computed(() =>
    new Intl.DateTimeFormat(locale.value, { dateStyle: "full" }).format(
      unref(date)
    )
  );
};

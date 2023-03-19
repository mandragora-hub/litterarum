import { NuxtI18nOptions } from "@nuxtjs/i18n";
import { ModuleOptions as NuxtIconModuleOptions } from "nuxt-icon";
import { VueUseNuxtOptions } from "@vueuse/nuxt";
import { ModuleOptions as NuxtContentModuleOptions } from "@nuxt/content";
import { ModuleOptions as NuxtSitemapModuleOptions } from "nuxt-simple-sitemap";

declare module "@nuxt/schema" {
  interface AppConfigInput {
    name: string;
    author: {
      name: string;
      link: string;
    };
    nuxtIcon: NuxtIconModuleOptions;
  }
}

declare module "nuxt/config" {
  interface NuxtConfig {
    i18n?: NuxtI18nOptions;
    vueuse?: VueUseNuxtOptions;
    content?: Partial<NuxtContentModuleOptions>;
    sitemap: NuxtSitemapModuleOptions
  }
}

export {};

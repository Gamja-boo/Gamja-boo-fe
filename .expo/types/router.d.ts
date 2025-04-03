/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens`; params?: Router.UnknownInputParams; } | { pathname: `/screens/character_screen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/chart_screen`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/screens`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/character_screen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/chart_screen`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/screens${`?${string}` | `#${string}` | ''}` | `/screens/character_screen${`?${string}` | `#${string}` | ''}` | `/screens/chart_screen${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens`; params?: Router.UnknownInputParams; } | { pathname: `/screens/character_screen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/chart_screen`; params?: Router.UnknownInputParams; };
    }
  }
}

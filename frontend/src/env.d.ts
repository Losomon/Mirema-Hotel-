import type { PageMetadata } from "@wix/astro-pages";

/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare const Astro: Readonly<import("astro").AstroGlobal>;

declare global {
  interface SDKTypeMode {
    strict: true;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly BASE_NAME: string;
    readonly VITE_API_BASE_URL?: string;
  }
}

declare module "react-router-dom" {
  // React Router v6+/createBrowserRouter route config uses `RouteObject`.
  // Augment route objects so `routeMetadata` can be specified.
  export interface RouteObject {
    routeMetadata?: PageMetadata;
  }

  export interface IndexRouteObject {
    routeMetadata?: PageMetadata;
  }

  export interface NonIndexRouteObject {
    routeMetadata?: PageMetadata;
  }
}

declare module "react-router" {
  // `RouteObject` is also re-exported from `react-router`.
  export interface RouteObject {
    routeMetadata?: PageMetadata;
  }
}



/**
 * TEMPORARY MOCK SCHEMA — НЕ КОММИТИТЬ КАК ИСТОЧНИК ПРАВДЫ.
 *
 * Этот файл обычно генерируется командой `yarn generate:api`
 * (openapi-typescript -> src/services/schema/api-schema.ts).
 * Здесь — заглушка с минимальным набором типов, чтобы tsc/vite/IDE
 * работали без обращения к OpenAPI-источнику. Покрывает только пути,
 * которые реально используются в src/services/auth/useAuth.ts.
 *
 * Структура повторяет вывод openapi-typescript v7, поэтому openapi-fetch
 * и openapi-react-query корректно выводят типы запросов/ответов.
 *
 * Перед реальной работой с API замените файл генерацией: `yarn generate:api`.
 */

/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface paths {
  "/client/auth/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_login"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/client/auth/logout": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_logout"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/client/auth/me": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["AuthController_me"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/client/auth/me/avatar": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put: operations["AuthController_updateAvatar"];
    post?: never;
    delete: operations["AuthController_deleteAvatar"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    AssetDto: {
      id: string;
      url: string;
      name: string;
      mimeType: string;
      size: number;
    };
    LoginDto: {
      phone: string;
      password: string;
    };
    ProfileDto: {
      id: string;
      phone: string;
      firstName: string;
      lastName: string;
      email: string | null;
      avatar: components["schemas"]["AssetDto"] | null;
      createdAt: string;
      updatedAt: string;
    };
    UpdateAvatarDto: {
      avatar: string;
    };
    MessageResponseDto: {
      message: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export interface operations {
  AuthController_login: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ProfileDto"];
        };
      };
    };
  };
  AuthController_logout: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MessageResponseDto"];
        };
      };
    };
  };
  AuthController_me: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ProfileDto"];
        };
      };
    };
  };
  AuthController_updateAvatar: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateAvatarDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ProfileDto"];
        };
      };
    };
  };
  AuthController_deleteAvatar: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ProfileDto"];
        };
      };
    };
  };
}

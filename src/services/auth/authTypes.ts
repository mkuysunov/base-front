import type { components } from "@/services/schema/api-schema";

type Schemas = components["schemas"];

/** Authenticated client profile — response of GET /client/auth/me */
export type IProfile = Schemas["ProfileDto"];

/** Credentials sent to POST /client/auth/login */
export type ILogin = Schemas["LoginDto"];

/** Payload for PUT /client/auth/me/avatar */
export type IUpdateAvatar = Schemas["UpdateAvatarDto"];

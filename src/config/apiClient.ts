import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import i18n from "@/i18n/config";
import type { paths } from "@/services/schema/api-schema";
import { API_BASE_URL } from "@/utils";

export const fetchClient = createFetchClient<paths>({
  baseUrl: API_BASE_URL,
  fetch: async (request) => {
    const headers = new Headers(request.headers);
    headers.set("Accept-Language", i18n.language);

    return fetch(new Request(request, { headers, credentials: "include" }));
  },
});

export const apiClient = createClient(fetchClient);

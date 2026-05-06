import type { RequestHandler } from "msw";
import { http, HttpResponse } from "msw";
import { PLAUSIBLE_URL } from "~/utils/constants";

const plausibleHandlers: RequestHandler[] = [
  http.post(`${PLAUSIBLE_URL}`, () => {
    return new HttpResponse(null, {
      status: 202,
    });
  }),
];

export default plausibleHandlers;

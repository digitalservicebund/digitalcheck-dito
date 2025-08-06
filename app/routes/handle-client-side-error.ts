import { z } from "zod";
import type { Route } from "./+types/handle-client-side-error";

const ClientSideErrorSchema = z.object({
  message: z.string(),
  stack: z.string().optional(),
});

export type ClientSideError = z.infer<typeof ClientSideErrorSchema>;

/**
 * This method simply logs the received error message and stack from client-side errors to be monitored by Grafana.
 */
const handleClientSideError = async (request: Request): Promise<Response> => {
  try {
    const data: ClientSideError = ClientSideErrorSchema.parse(
      await request.json(),
    );

    console.log(
      `Client-side error: ${String(data.message)}`,
      String(data.stack),
    );

    return new Response(null, { status: 204 }); // No Content
  } catch (error) {
    console.error("Failed to handle client error:", error);
    return new Response("Invalid request", { status: 400 });
  }
};

export const action = async ({ request }: Route.ActionArgs) =>
  handleClientSideError(request);

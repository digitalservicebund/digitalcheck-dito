import { ActionFunction } from "react-router";
import { z } from "zod";

const ClientSideErrorSchema = z.object({
  message: z.string(),
  stack: z.string().optional(),
});

export type ClientSideError = z.infer<typeof ClientSideErrorSchema>;

const handleClientSideError = async (request: Request): Promise<Response> => {
  try {
    const data: ClientSideError = ClientSideErrorSchema.parse(
      await request.json(),
    );

    console.log(`Client-side error: ${JSON.stringify(data.message)}`);
    console.log(JSON.stringify(data.stack));

    return new Response(null, { status: 204 }); // No Content
  } catch (error) {
    console.error("Failed to handle client error:", error);
    return new Response("Invalid request", { status: 400 });
  }
};

export const action: ActionFunction = async ({ request }) =>
  handleClientSideError(request);

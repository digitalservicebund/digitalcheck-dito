import { ActionFunction } from "react-router";

const handleClientSideError = async (request: Request): Promise<Response> => {
  try {
    console.log("Client-side error: ", {
      ...(await request.json()),
    });

    return new Response(null, { status: 204 }); // No Content
  } catch (error) {
    console.error("Failed to handle client error:", error);
    return new Response("Invalid request", { status: 400 });
  }
};

export const action: ActionFunction = async ({ request }) =>
  handleClientSideError(request);

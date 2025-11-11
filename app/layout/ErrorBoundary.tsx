import { isRouteErrorResponse } from "react-router";
import { LinkButton } from "~/components/Button";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { genericError, notFoundError } from "~/resources/content/error";
import trackClientSideError from "~/utils/trackClientSideError";

export type ErrorBoundaryProps = {
  error: unknown;
  backLink: string;
};

export default function ErrorBoundary({
  error,
  backLink,
}: Readonly<ErrorBoundaryProps>) {
  let errorStatus;
  let errorTitle = genericError.title;
  let errorMessage = genericError.message;

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status}`;

    if (error.status === 404) {
      errorTitle = notFoundError.title;
      errorMessage = notFoundError.message;
    }
  } else if (error instanceof Error && typeof window !== "undefined") {
    // The error should be a native JS runtime error, not a route error response from the server
    // window is only defined on client-side making sure the code is running in the browser
    trackClientSideError(error);
  }

  return (
    <main id="error" className="grow bg-blue-100">
      <MetaTitle prefix="Fehler" />
      <Container>
        <div className="ds-stack ds-stack-8 mb-32">
          {errorStatus && (
            <span className="ds-label-01-bold">{errorStatus}</span>
          )}
          <Heading text={errorTitle} className="ds-heading-02-reg" />
          <RichText markdown={errorMessage} className="ds-subhead" />
        </div>
        <LinkButton id="error-back-button" to={backLink}>
          Zurück zur Startseite
        </LinkButton>
      </Container>
    </main>
  );
}

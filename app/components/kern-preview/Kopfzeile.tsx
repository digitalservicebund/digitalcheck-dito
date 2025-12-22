import "./Kopfzeile.css";

/**
 * The "Official Website" banner, extracted from the web component provided by
 * KERN. Using the web component directly wasn't possible with server-side
 * rendering. It would be possible to use the component client-only, but
 * this causes layout shifts.
 *
 * Note that the custom breakpoint implementation is missing here.
 *
 * The `@publicplan/kern-react-kit` library was considered, but not used,
 * to avoid loading extra fonts.
 *
 * z-40 is added to ensure that a menu drawer below does not darken the banner.
 * */
export function Kopfzeile() {
  return (
    <header className="kern-kopfzeile z-40">
      <div className="kern-container-fluid">
        <div className="kern-kopfzeile__content">
          <span className="kern-kopfzeile__flagge" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 16"
              style={{ maxWidth: 24 }}
            >
              <path fill="#000" d="M0 .5h24v5.333H0z"></path>
              <path fill="red" d="M0 5.833h24v5.333H0z"></path>
              <path fill="#FACA2C" d="M0 11.167h24V16.5H0z"></path>
            </svg>
          </span>
          <span className="kern-kopfzeile__label">
            <slot>Offizielle Website – Bundesrepublik Deutschland</slot>
          </span>
        </div>
      </div>
    </header>
  );
}

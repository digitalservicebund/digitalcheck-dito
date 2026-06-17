import{j as e}from"./bundle-mjs.DBvd4n8_.js";import{r as o}from"./index.Ds7yq6at.js";import{B as l,L as c}from"./Button.8rU0Pf01.js";import{B as u}from"./ButtonContainer.tZCOgYL5.js";import{H as d}from"./Heading.CQCqO5v3.js";import{R as h}from"./RichText.B7nGq-0T.js";import{g as m}from"./general.Cq9yc2ta.js";import{u as g,D as b}from"./DocumentationPageShell._aosiIVP.js";const p=`
## Datenspeicherung

Ihre eingegebenen Daten werden **unbegrenzt lange** in der Sitzung gespeichert, bis

a) Sie eine neue Dokumentation starten, oder<br />
b) Ihr SINA-Rechner die Daten löscht (falls das bei Ihnen voreingestellt ist)

**Bitte beachten Sie:** Es ist jeweils nur die Bearbeitung einer Dokumentation möglich. Sie können den Vorgang unterbrechen und später fortsetzen. Der aktuelle Stand bleibt auch nach Schließen des Fensters erhalten.

## Zwischenspeicherung als Word-Dokument

Zur externen Weiterbearbeitung, internen Abstimmung oder für Änderungen können Sie den aktuellen Stand Ihrer Angaben als Word-Dokument exportieren und lokal speichern. Die finale Datei können Sie zu jedem Zeitpunkt per E-Mail an den NKR versenden.
`;function i(){const{nextUrl:n,previousUrl:t}=g(),[r,s]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(d,{text:"Wichtige Hinweise",tagName:"h1",look:"ds-heading-02-reg",className:"mb-16"}),e.jsx(h,{className:"[&>h2]:ds-heading-03-reg [&>h2]:mt-40",markdown:p}),e.jsxs("label",{className:"ds-label-01-reg flex flex-row items-center gap-16",children:[e.jsx("input",{type:"checkbox",className:"ds-checkbox",checked:r,onChange:a=>s(a.target.checked)}),"Ich habe die oberen Hinweise gelesen."]}),e.jsxs(u,{children:[e.jsx(l,{look:"primary",disabled:!r,type:"button",onClick:()=>globalThis.location.href=n,children:"Verstanden und weiter"}),e.jsx(c,{href:t,look:"tertiary",children:m.buttonBack.text})]})]})}function N(){return e.jsx(i,{})}function H({prinzips:n,currentUrl:t}){return e.jsx(b,{prinzips:n,currentUrl:t,children:e.jsx(i,{})})}export{i as DocumentationHinweise,H as HinweisePage,N as default};

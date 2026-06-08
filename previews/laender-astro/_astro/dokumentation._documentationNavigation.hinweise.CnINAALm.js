import{j as e}from"./tailwindMerge.gN6BWK24.js";import{q as o}from"./routes.BeebDdro.js";import{r as l}from"./index.Ds7yq6at.js";import{B as c,L as u}from"./Button.fvDX-KZB.js";import{B as d}from"./ButtonContainer.CUkDFbqX.js";import{M as h,H as m}from"./Meta.BHpGBQkm.js";import{R as g}from"./RichText.BhR-Aseg.js";import{g as p}from"./general.BLhXOskb.js";import{u as x,D as b}from"./DocumentationPageShell.2WWhpV8m.js";const k=`
## Datenspeicherung

Ihre eingegebenen Daten werden **unbegrenzt lange** in der Sitzung gespeichert, bis

a) Sie eine neue Dokumentation starten, oder<br />
b) Ihr SINA-Rechner die Daten löscht (falls das bei Ihnen voreingestellt ist)

**Bitte beachten Sie:** Es ist jeweils nur die Bearbeitung einer Dokumentation möglich. Sie können den Vorgang unterbrechen und später fortsetzen. Der aktuelle Stand bleibt auch nach Schließen des Fensters erhalten.

## Zwischenspeicherung als Word-Dokument

Zur externen Weiterbearbeitung, internen Abstimmung oder für Änderungen können Sie den aktuellen Stand Ihrer Angaben als Word-Dokument exportieren und lokal speichern. Die finale Datei können Sie zu jedem Zeitpunkt per E-Mail an den NKR versenden.
`;function i(){const{nextUrl:n,previousUrl:t}=x(),[r,a]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(h,{prefix:`Dokumentation: ${o.title}`}),e.jsx(m,{text:"Wichtige Hinweise",tagName:"h1",look:"ds-heading-02-reg",className:"mb-16"}),e.jsx(g,{className:"[&>h2]:ds-heading-03-reg [&>h2]:mt-40",markdown:k}),e.jsxs("label",{className:"ds-label-01-reg flex flex-row items-center gap-16",children:[e.jsx("input",{type:"checkbox",className:"ds-checkbox",checked:r,onChange:s=>a(s.target.checked)}),"Ich habe die oberen Hinweise gelesen."]}),e.jsxs(d,{children:[e.jsx(c,{look:"primary",disabled:!r,type:"button",onClick:()=>globalThis.location.href=n,children:"Verstanden und weiter"}),e.jsx(u,{href:t,look:"tertiary",children:p.buttonBack.text})]})]})}function R(){return e.jsx(i,{})}function v({prinzips:n,currentUrl:t}){return e.jsx(b,{prinzips:n,currentUrl:t,children:e.jsx(i,{})})}export{i as DocumentationHinweise,v as HinweisePage,R as default};

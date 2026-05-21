import{j as e}from"./tailwindMerge.BsTZoFyz.js";import{B as l,h as c,k as u}from"./routes.Dxbn3laS.js";import{r as d}from"./index.DuJTi5EO.js";import{B as h,L as m}from"./Button.DCkjtRLr.js";import{B as g}from"./ButtonContainer.CYHD5n3m.js";import{M as x,H as k}from"./Meta.DxQ0q0lK.js";import{R as p}from"./RichText.BRGb8H_4.js";import{u as b,D as f}from"./DocumentationPageShell.BfEadj49.js";const j=`
## Datenspeicherung

Ihre eingegebenen Daten werden **unbegrenzt lange** in der Sitzung gespeichert, bis

a) Sie eine neue Dokumentation starten, oder<br />
b) Ihr SINA-Rechner die Daten löscht (falls das bei Ihnen voreingestellt ist)

**Bitte beachten Sie:** Es ist jeweils nur die Bearbeitung einer Dokumentation möglich. Sie können den Vorgang unterbrechen und später fortsetzen. Der aktuelle Stand bleibt auch nach Schließen des Fensters erhalten.

## Zwischenspeicherung als Word-Dokument

Zur externen Weiterbearbeitung, internen Abstimmung oder für Änderungen können Sie den aktuellen Stand Ihrer Angaben als Word-Dokument exportieren und lokal speichern. Die finale Datei können Sie zu jedem Zeitpunkt per E-Mail an den NKR versenden.
`;function r(){const{nextUrl:n,previousUrl:t}=b(),a=l(),[i,s]=d.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(x,{prefix:`Dokumentation: ${c.title}`}),e.jsx(k,{text:"Wichtige Hinweise",tagName:"h1",look:"ds-heading-02-reg",className:"mb-16"}),e.jsx(p,{className:"[&>h2]:ds-heading-03-reg [&>h2]:mt-40",markdown:j}),e.jsxs("label",{className:"ds-label-01-reg flex flex-row items-center gap-16",children:[e.jsx("input",{type:"checkbox",className:"ds-checkbox",checked:i,onChange:o=>s(o.target.checked)}),"Ich habe die oberen Hinweise gelesen."]}),e.jsxs(g,{children:[e.jsx(h,{look:"primary",disabled:!i,type:"button",onClick:()=>a(n),children:"Verstanden und weiter"}),e.jsx(m,{to:t,look:"tertiary",children:u.buttonBack.text})]})]})}function R(){return e.jsx(r,{})}function y({prinzips:n,currentUrl:t}){return e.jsx(f,{prinzips:n,currentUrl:t,children:e.jsx(r,{})})}export{r as DocumentationHinweise,y as HinweisePage,R as default};

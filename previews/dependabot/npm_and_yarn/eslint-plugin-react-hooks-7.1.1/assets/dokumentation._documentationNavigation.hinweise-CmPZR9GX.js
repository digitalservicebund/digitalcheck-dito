import{w as o,a as l,c,r as m,j as e}from"./chunk-OE4NN4TA-B87l8SeB.js";import{B as d,L as u}from"./Button-BtLr3ekH.js";import{B as h}from"./ButtonContainer-Ct0mUTvK.js";import{H as g}from"./Heading-Db-0SMty.js";import{M as p}from"./Meta-je4PDlaH.js";import{R as b}from"./RichText-BajliK59.js";import{g as k}from"./tailwindMerge-DAhKV3eC.js";import{j as x}from"./staticRoutes-DxOXiJjV.js";import"./fileExtensionUtils-CXRZ7Pzr.js";import"./plausibleUtils-MJGLlQt3.js";import"./utilFunctions-CBG9PTYO.js";import"./OpenInNewIcon-DlPLIjTI.js";import"./index-c8EPsgkm.js";import"./contact-IM88gR3s.js";const f=`
## Datenspeicherung

Ihre eingegebenen Daten werden **unbegrenzt lange** in der Sitzung gespeichert, bis

a) Sie eine neue Dokumentation starten, oder<br />
b) Ihr SINA-Rechner die Daten löscht (falls das bei Ihnen voreingestellt ist)

**Bitte beachten Sie:** Es ist jeweils nur die Bearbeitung einer Dokumentation möglich. Sie können den Vorgang unterbrechen und später fortsetzen. Der aktuelle Stand bleibt auch nach Schließen des Fensters erhalten.

## Zwischenspeicherung als Word-Dokument

Zur externen Weiterbearbeitung, internen Abstimmung oder für Änderungen können Sie den aktuellen Stand Ihrer Angaben als Word-Dokument exportieren und lokal speichern. Die finale Datei können Sie zu jedem Zeitpunkt per E-Mail an den NKR versenden.
`,y=o(function(){const{nextUrl:t,previousUrl:i}=l(),r=c(),[n,a]=m.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{prefix:`Dokumentation: ${x.title}`}),e.jsx(g,{text:"Wichtige Hinweise",tagName:"h1",look:"ds-heading-02-reg",className:"mb-16"}),e.jsx(b,{className:"[&>h2]:ds-heading-03-reg [&>h2]:mt-40",markdown:f}),e.jsxs("label",{className:"ds-label-01-reg flex flex-row items-center gap-16",children:[e.jsx("input",{type:"checkbox",className:"ds-checkbox",checked:n,onChange:s=>a(s.target.checked)}),"Ich habe die oberen Hinweise gelesen."]}),e.jsxs(h,{children:[e.jsx(d,{look:"primary",disabled:!n,type:"button",onClick:()=>r(t),children:"Verstanden und weiter"}),e.jsx(u,{to:i,look:"tertiary",children:k.buttonBack.text})]})]})});export{y as default};

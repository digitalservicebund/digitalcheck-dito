import{N as e,P as t,V as n,W as r,t as i,z as a}from"./jsx-runtime-CWlP0OyB.js";import{t as o}from"./RichText-D7P1cnkP.js";import{u as s}from"./routes-BpXvYPA_.js";import{r as c}from"./tailwindMerge-C7i4L8O4.js";import{t as l}from"./Meta-DYDKLG39.js";import{i as u,t as d}from"./Button-CRp_sPpI.js";import{t as f}from"./Heading-CG4KKcZ9.js";import{t as p}from"./ButtonContainer-iKx9NXAI.js";var m=r(n(),1),h=i(),g=`
## Datenspeicherung

Ihre eingegebenen Daten werden **unbegrenzt lange** in der Sitzung gespeichert, bis

a) Sie eine neue Dokumentation starten, oder<br />
b) Ihr SINA-Rechner die Daten löscht (falls das bei Ihnen voreingestellt ist)

**Bitte beachten Sie:** Es ist jeweils nur die Bearbeitung einer Dokumentation möglich. Sie können den Vorgang unterbrechen und später fortsetzen. Der aktuelle Stand bleibt auch nach Schließen des Fensters erhalten.

## Zwischenspeicherung als Word-Dokument

Zur externen Weiterbearbeitung, internen Abstimmung oder für Änderungen können Sie den aktuellen Stand Ihrer Angaben als Word-Dokument exportieren und lokal speichern. Die finale Datei können Sie zu jedem Zeitpunkt per E-Mail an den NKR versenden.
`,_=a(function(){let{nextUrl:n,previousUrl:r}=t(),i=e(),[a,_]=(0,m.useState)(!1);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l,{prefix:`Dokumentation: ${s.title}`}),(0,h.jsx)(f,{text:`Wichtige Hinweise`,tagName:`h1`,look:`ds-heading-02-reg`,className:`mb-16`}),(0,h.jsx)(o,{className:`[&>h2]:ds-heading-03-reg [&>h2]:mt-40`,markdown:g}),(0,h.jsxs)(`label`,{className:`ds-label-01-reg flex flex-row items-center gap-16`,children:[(0,h.jsx)(`input`,{type:`checkbox`,className:`ds-checkbox`,checked:a,onChange:e=>_(e.target.checked)}),`Ich habe die oberen Hinweise gelesen.`]}),(0,h.jsxs)(p,{children:[(0,h.jsx)(d,{look:`primary`,disabled:!a,type:`button`,onClick:()=>i(n),children:`Verstanden und weiter`}),(0,h.jsx)(u,{to:r,look:`tertiary`,children:c.buttonBack.text})]})]})});export{_ as default};
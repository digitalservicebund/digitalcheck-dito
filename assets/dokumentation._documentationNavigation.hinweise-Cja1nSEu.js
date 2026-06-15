import{N as e,V as t,W as n,t as r,z as i}from"./jsx-runtime-BDid30Hj.js";import{t as a}from"./RichText-D3mkylkV.js";import{d as o}from"./routes-Cj4mu4DZ.js";import{r as s}from"./tailwindMerge-DcUQ_2bF.js";import{t as c}from"./Meta-BhKIhXE7.js";import{i as l,t as u}from"./Button-UImtFq3I.js";import{t as d}from"./Heading-BwGJbXwQ.js";import{t as f}from"./ButtonContainer-DsPVuKob.js";import{n as p}from"./DocumentationNavigationContext-jSU6s59P.js";var m=n(t(),1),h=r(),g=`
## Datenspeicherung

Ihre eingegebenen Daten werden **unbegrenzt lange** in der Sitzung gespeichert, bis

a) Sie eine neue Dokumentation starten, oder<br />
b) Ihr SINA-Rechner die Daten löscht (falls das bei Ihnen voreingestellt ist)

**Bitte beachten Sie:** Es ist jeweils nur die Bearbeitung einer Dokumentation möglich. Sie können den Vorgang unterbrechen und später fortsetzen. Der aktuelle Stand bleibt auch nach Schließen des Fensters erhalten.

## Zwischenspeicherung als Word-Dokument

Zur externen Weiterbearbeitung, internen Abstimmung oder für Änderungen können Sie den aktuellen Stand Ihrer Angaben als Word-Dokument exportieren und lokal speichern. Die finale Datei können Sie zu jedem Zeitpunkt per E-Mail an den NKR versenden.
`;function _(){let{nextUrl:t,previousUrl:n}=p(),r=e(),[i,_]=(0,m.useState)(!1);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c,{prefix:`Dokumentation: ${o.title}`}),(0,h.jsx)(d,{text:`Wichtige Hinweise`,tagName:`h1`,look:`ds-heading-02-reg`,className:`mb-16`}),(0,h.jsx)(a,{className:`[&>h2]:ds-heading-03-reg [&>h2]:mt-40`,markdown:g}),(0,h.jsxs)(`label`,{className:`ds-label-01-reg flex flex-row items-center gap-16`,children:[(0,h.jsx)(`input`,{type:`checkbox`,className:`ds-checkbox`,checked:i,onChange:e=>_(e.target.checked)}),`Ich habe die oberen Hinweise gelesen.`]}),(0,h.jsxs)(f,{children:[(0,h.jsx)(u,{look:`primary`,disabled:!i,type:`button`,onClick:()=>r(t),children:`Verstanden und weiter`}),(0,h.jsx)(l,{to:n,look:`tertiary`,children:s.buttonBack.text})]})]})}var v=i(function(){return(0,h.jsx)(_,{})});export{v as default};
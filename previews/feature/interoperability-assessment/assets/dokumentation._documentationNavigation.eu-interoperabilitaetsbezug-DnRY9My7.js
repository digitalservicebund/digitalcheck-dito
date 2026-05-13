import{P as e,t,z as n}from"./jsx-runtime-TdnDAAmO.js";import{t as r}from"./RichText-DT0SOT3o.js";import{T as i,a}from"./staticRoutes-D6bxjR5I.js";import{t as o}from"./Meta-Br9VxYMg.js";import{t as s}from"./Heading-Csq_GdWd.js";import{n as c,o as l,p as u}from"./DocumentationDataProvider-5LFBmOPk.js";import{n as d,t as f}from"./documentationDataHook-Dvgyaib3.js";import{t as p}from"./DocumentationActions-BI4SZkTj.js";import{t as m}from"./RadioGroup-Z2WZJqmM.js";var h=t(),g={outcomeId:`NOT_REQUIRED_INDICATES_PRECHECK`},_=[{value:`REQUIRED`,label:`Ja, Bezug zu EU-Interoperabilität ist vorhanden.`},{value:`NOT_REQUIRED_INDICATES_PRECHECK`,label:`Nein, es ist kein Bezug vorhanden.`}];function v(){let{documentationData:e,setEuInteroperabilityOutcome:t}=c(),n=f({schema:l,defaultValues:g,storedData:e.euInteroperabilityOutcome,setDataCallback:e=>t(e??void 0)});return(0,h.jsx)(`form`,{...n.getFormProps(),children:(0,h.jsx)(m,{scope:n.scope(`outcomeId`),options:_,"aria-labelledby":`outcome-label`})})}var y=`
**Was bedeutet das?**

Sofern durch Ihre Regelung vorgesehen ist, dass Daten und Informationen zwischen
Verwaltungen von EU-Mitgliedsstaaten ausgetauscht werden, muss nach
${u({article:3,format:`long`})} in der Regel
eine Interoperabilitätsbewertung durchgeführt werden.

Sollte sich nach den Bestimmungen der Verordnung dennoch keine Verpflichtung zu
einer Bewertung ergeben und Sie möchten auch keine frewillige Bewertung durchführen,
wählen Sie die Option "Nein, es ist kein Bezug vorhanden".
          
[Mehr zu EU-Interoperabilität](${i.url})
`,b=n(function(){let{previousUrl:t,nextUrl:n}=e();return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o,{prefix:`Dokumentation: ${a.title}`}),(0,h.jsxs)(`div`,{className:`space-y-40`,children:[(0,h.jsx)(s,{text:`Bezug zu EU-Interoperabilität`,tagName:`h1`,look:`ds-heading-02-reg`,className:`mb-16`}),(0,h.jsxs)(`p`,{children:[`Ergab die Vorprüfung Bezug zu EU-Interoperabilität?`,(0,h.jsx)(d,{sectionId:`bezug-interoperabilität`,title:`Bezug zu EU-Interoperabilität`,children:(0,h.jsx)(r,{markdown:y})})]}),(0,h.jsx)(v,{}),(0,h.jsx)(p,{previousUrl:t,nextUrl:n,showDownloadDraftButton:!0,showSavingTip:!0})]})]})});export{b as default};
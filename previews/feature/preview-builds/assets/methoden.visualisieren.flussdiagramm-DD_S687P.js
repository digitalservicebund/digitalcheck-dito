import{j as e,r as g,w as k,L as w}from"./chunk-UVKPFVEO-D1_djuSg.js";import{S}from"./ArrowCircleRightOutlined-DNjZewo8.js";import{S as j}from"./DriveFileRenameOutline-Bt9Ijk-4.js";import{S as v}from"./LayersOutlined-B1eN_nI4.js";import{B as m}from"./Badge-Cib9PIQm.js";import{B as z}from"./Button-R3L22qy0.js";import{H as h}from"./Heading-BZcaNK8Z.js";import{I as l}from"./ImageBox-D8TORSVB.js";import{I as o}from"./InfoBox-Dzbz0Om3.js";import{N as b}from"./NumberedList-B88J4CiM.js";import{R as i}from"./RichText-Bh4xpFwt.js";import{t as p}from"./tailwindMerge-IXz7yBTV.js";import{C as A}from"./Container-DbCzdLCl.js";import{M as E}from"./Meta-DbldSXgK.js";import{S as F,T as t}from"./SidebarContainer-hTZXVqzJ.js";import{S as c}from"./constants--3oyf-GA.js";import{c as P}from"./contact-u1KNilBO.js";import{E as y,P as N,s as B}from"./staticRoutes-EB1edRq7.js";import{d as n}from"./dedentMultilineStrings-CWXKGsTI.js";import{g as I}from"./plausibleUtils-MJGLlQt3.js";import"./fileExtensionUtils-CXRZ7Pzr.js";import"./Image--T_7DWgE.js";import"./ImageZoomable-0qUl8cC5.js";import"./ZoomInOutlined-D4hWhzJg.js";import"./ButtonContainer-Js-H-5Us.js";import"./DetailsSummary-A54g8wFD.js";import"./utilFunctions-CBG9PTYO.js";import"./OpenInNewIcon-lFZWn6XG.js";import"./index-BUtifBDb.js";const D=r=>e.jsxs("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",height:24,viewBox:"0 0 24 24",width:24,"data-testid":"ArrowDownwardOutlinedIcon",focusable:"false","aria-hidden":"true"},r,{children:[e.jsx("path",{d:"M0 0h24v24H0V0z",fill:"none"}),e.jsx("path",{d:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"})]})),V=r=>e.jsxs("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",height:24,viewBox:"0 0 24 24",width:24,"data-testid":"ArrowUpwardIcon",focusable:"false","aria-hidden":"true"},r,{children:[e.jsx("path",{d:"M0 0h24v24H0V0z",fill:"none"}),e.jsx("path",{d:"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"})]}));function C(){const[r,s]=g.useState(!1),a=()=>{const f=window.innerHeight,x=window.scrollY>f;s(x)},d=()=>{window.scrollTo({top:0,behavior:"smooth"})};return g.useEffect(()=>(window.addEventListener("scroll",a),()=>{window.removeEventListener("scroll",a)}),[]),e.jsxs("button",{onClick:d,className:p("ds-label-03-reg fixed right-16 bottom-16 z-50 flex items-center gap-8 rounded-full bg-blue-800 p-8 pr-16 text-white shadow-md outline-2 outline-blue-500 transition-opacity duration-150 sm:right-24 sm:bottom-24",r?"opacity-100":"pointer-events-none opacity-0"),"aria-hidden":!r,children:[e.jsx(V,{fill:"currentColor"}),"Zurück nach oben"]})}const T=[{iconUrl:"/icons/DiagramStartNode.svg",title:"Start-/Endsymbol",description:n`
        **Start-/Endsymbol**
        
        Der Kreis stellt den Beginn oder das Ende eines Prozesses dar (z.B. Antrag wird gestellt).`},{iconUrl:"/icons/DiagramDecision.svg",title:"Entscheidungssymbol",description:n`
        **Entscheidungssymbol**
        
        Eine Raute steht für eine Abfrage mit mindestens zwei möglichen Ausgängen (z.B. Antrag vollständig? – ja/nein).`},{iconUrl:"/icons/DiagramActor.svg",title:"Akteurin/Akteur",description:n`
      **Akteurin/Akteur**
      
      Ein Rechteck mit Symbol steht für eine beteiligte Person oder Institution im Prozess (z.B. Meldebehörde oder Fahrschülerin).`},{iconUrl:"/icons/DiagramData.svg",title:"Datensymbol (Eingabe/Ausgabe)",description:n`
    **Datensymbol (Eingabe/Ausgabe)**
    
    Dieses Symbol zeigt genutzte oder erzeugte Daten oder Ressourcen (z.B. Melderegister).`},{iconUrl:"/icons/DiagramActivity.svg",title:"Prozess-/Aktivitätssymbol",description:n`
    **Prozess-/Aktivitätssymbol**
    
    Das Rechteck stellt eine Aktivität oder einen Arbeitsschritt dar (z.B. Antrag prüfen).`},{iconUrl:"/icons/DiagramConnector.svg",title:"Verbindungspfeil",description:n`
    **Verbindungspfeil**
    
    Pfeile verbinden die Symbole und machen die zeitliche Reihenfolge der Prozessschritte sichtbar.`}];function L(){const r=g.useRef(null);function s(){r.current?.closest("li")?.nextElementSibling?.scrollIntoView()}return e.jsx("div",{ref:r,className:"flex justify-center",children:e.jsx(z,{onClick:s,size:"small",iconLeft:e.jsx(D,{}),type:"button",children:"Nächster Schritt"})})}function u({mainContent:r,fullwidthContent:s,hideNextButton:a,id:d}){return e.jsx(b.Item,{className:"flex scroll-my-40 flex-col gap-16",after:e.jsxs(e.Fragment,{children:[s,!a&&e.jsx(L,{})]}),id:d,children:r})}const ce=k(function(){const s="px-16 sm:px-56",a={children:"Beispiel: Fahrerlaubnis",look:"hint"};return e.jsxs(e.Fragment,{children:[e.jsx(E,{prefix:y.title}),e.jsx("div",{className:"breakout-grid-toc bg-blue-100 pt-40 pb-48",children:e.jsxs("div",{children:[e.jsx(h,{tagName:"h1",children:"Erstellung von Flussdiagrammen"}),e.jsx("p",{className:"ds-subhead mt-16",children:"Ein Flussdiagramm visualisiert, wie ein Prozess Schritt für Schritt abläuft. Es hilft, die Reihenfolge von z.B. Handlungen, Datenflüssen oder Entscheidungen übersichtlich darzustellen."})]})}),e.jsx("main",{children:e.jsx(F,{sidebar:e.jsx(t,{title:"Inhalt",selector:"section[id], li[id]",children:e.jsxs(t.List,{className:"list-unstyled list-none",children:[e.jsx(t.Item,{href:"#aufbau",title:"Aufbau"}),e.jsx(t.Item,{href:"#anleitung",title:"Anleitung",after:e.jsxs(t.List,{className:"mt-0 list-none",children:[e.jsx(t.Item,{href:"#schritt-1",title:"Format",numbered:!0}),e.jsx(t.Item,{href:"#schritt-2",title:"Akteure",numbered:!0}),e.jsx(t.Item,{numbered:!0,href:"#schritt-3",title:"Ziel & Perspektive der Visualisierung"}),e.jsx(t.Item,{numbered:!0,href:"#schritt-4",title:"Start und Ende definieren"}),e.jsx(t.Item,{numbered:!0,href:"#schritt-5",title:"Prozess abbilden"}),e.jsx(t.Item,{numbered:!0,href:"#schritt-6",title:"Informationen ergänzen"})]})}),e.jsx(t.Item,{href:"#video-anleitung",title:"Video-Anleitung"})]})}),children:e.jsxs("div",{className:"my-40 space-y-40 lg:space-y-80",children:[e.jsxs("section",{className:"scroll-my-40 space-y-32 md:space-y-40",id:"aufbau",children:[e.jsx(h,{tagName:"h2",className:"ds-heading-02-reg",children:"Typischer Aufbau eines Flussdiagramms"}),e.jsx("div",{className:"grid grid-cols-1 gap-y-32 md:grid-cols-2 md:gap-x-48 md:gap-y-40",children:T.map(d=>e.jsxs("div",{className:"flex gap-8",children:[e.jsx("img",{src:d.iconUrl,alt:d.title,className:"size-80"}),e.jsx(i,{className:"ds-label-02-reg",markdown:d.description})]},d.title))}),e.jsx(l,{title:"Beispiel eines Flussdiagramms",image:{url:"/images/methoden/flussdiagramme/flussdiagramm-beispiel.png",caption:"In diesem Beispiel ist der Antragsprozess für einen Führerschein aus Sicht der Fahrschülerin / des Fahrschülers visualisiert.",alternativeText:"Das Bild zeigt am Beispiel des Führerscheinantrags, wie ein Flussdiagramm funktioniert. Es stellt alle Schritte von der Anmeldung bis zur Meldebestätigung in chronologischer Reihenfolge übersichtlich dar. Die grünen Boxen erklären die jeweiligen Vorteile. Ein Flussdiagramm veranschaulicht Prozesse, verdeutlicht Verantwortlichkeiten und hilft, die Orientierung über den gesamten Ablauf zu bewahren."},zoomable:!0,border:!0})]}),e.jsxs("section",{className:"scroll-my-40 space-y-32 md:space-y-40",id:"anleitung",children:[e.jsxs(h,{tagName:"h2",className:"flex gap-32",children:[e.jsx(j,{className:"size-40"}),"Anleitung"]}),e.jsxs(b,{separator:!0,children:[e.jsx(u,{id:"schritt-1",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(m,{children:"Schritt 1"}),e.jsx(i,{markdown:n`
                    ### Entscheiden Sie, in welchem Medium Sie arbeiten möchten
                    
                    Wir empfehlen, den ersten Entwurf auf Papier oder einem Whiteboard zu erstellen.
                    Sie können Fehler jederzeit leicht korrigieren und die Darstellung flexibel anpassen. 
                    Perfektion ist hier nicht entscheidend – wichtig ist, dass Sie anfangen
                    Sie können auch in einem einfachen Whiteboard-Programm oder Powerpoint arbeiten.
                    
                    **Darauf sollten Sie achten:**
                    
                    - Visualisierung ist klar strukturiert und gut lesbar
                    - Beschränkt sich auf die wesentlichen Elemente des Prozesses
                    `})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:s,badge:{Icon:v,children:"Vorlage für Flussdiagramm"},children:e.jsx(i,{markdown:n`
                    Hier können Sie eine **Powerpoint-Vorlage (PPT)** für das Flussdiagramm herunterladen.
                    In der Vorlage ist eine Schritt-für-Schritt-Anleitung enthalten.
                    Sie können diese ausdrucken oder an Ihrem Computer bearbeiten.
                    Sofern in Ihrem Ressort **Conceptboard** genutzt werden kann, können Sie sich auch eine Kopie dieser Conceptboard-Vorlage erstellen.
                    Für letzteres können Sie einen **Gast-Zugang** anlegen.
                    
                    [Conceptboard-Vorlage](https://bmas.de.conceptboard.com/board/qh33-xcny-usde-7nc6-82cy)
                    
                    [Powerpoint-Vorlage](${N.url})
                    
                    Sie wünschen sich ein anderes Medium?
                    Schicken Sie uns eine E-Mail an ${P.email}.
                  `})})}),e.jsx(u,{id:"schritt-2",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(m,{children:"Schritt 2"}),e.jsx(i,{markdown:n`
                      ### Identifizieren Sie relevante Akteure
                      
                      Sie starten mit einer unsortierten Liste der relevanten Akteure.
                      Schreiben Sie alle Akteure auf, die für den Vollzug der Regelung zuständig sind. Vergessen Sie dabei nicht die Normadressaten.
                      Es ist nicht schlimm, wenn Sie dabei einen Akteur vergessen. Dieser kann später hinzugefügt werden.`})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:s,badge:a,visual:{type:"component",Component:e.jsx(l,{image:{url:"/images/methoden/flussdiagramme/2/relevante-akteure.png",alternativeText:"Eine Grafik, welches die Institutionen Meldebehörde, Anerkannte Prüfstelle (Fahrschule), Bundesdruckerei, Bundesamt für Justiz sowie die Rolle Fahrschüler:in ungeordnet darstellt."}})},children:e.jsx(i,{markdown:n`
                    Am Beispiel der Fahrerlaubnis sind die wichtigsten Akteure und Berührungspunkte
                      - Fahrschülerin,
                      - Anerkannte Prüfstelle (Fahrschule)
                      - Meldebehörde
                      - Fahrerlaubnisbehörde
                      - Bundesamt für Justiz
                  `})})}),e.jsx(u,{id:"schritt-3",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(m,{children:"Schritt 3"}),e.jsx(i,{markdown:n`
                      ### Legen Sie fest, was Ziel und Perspektive der Visualisierung sind
                      
                      Das Ziel der Visualisierung dient Ihnen als Orientierungspunkt, auf den Sie während des
                      Visualisierens immer wieder schauen können.
                      Die Perspektive legt fest, welcher Akteur im Fokus steht.
                      Häufig sind das die Normadressaten, es kann aber auch eine bestimmte Behörde sein, deren interne
                      Abläufe verbessert werden sollen.
                      
                      Schreiben Sie beides auf.
              `})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:s,badge:a,visual:{type:"component",Component:e.jsx(l,{image:{url:"/images/methoden/flussdiagramme/3/ziel-perspektive-visualisierung.png",alternativeText:"Schaubild, welches Ziel der Visualisierung und Perspektive abstrakt darstellt. Das Ziel ist: Ich möchte den Prozess für Normenadressaten verbessern. Die Perspektive ist: Normenadressaten."}})},children:e.jsx(i,{markdown:n`
                    Am Beispiel der Fahrerlaubnis:
                      - **Ziel** der Visualisierung: „Ich möchte den Prozess für die Erlangung der Fahrerlaubnis verändern und digital ermöglichen.“
                      - Die **Perspektive**  der Visualisierung ist die der Normadressaten und -adressatinnen. In diesem Fall die einer Fahrschülerin.
                  `})})}),e.jsx(u,{id:"schritt-4",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(m,{children:"Schritt 4"}),e.jsx(i,{markdown:n`
                  ### Legen Sie fest, was Start- und Endpunkt sind
                  
                  Jetzt definieren Sie, womit der Prozess beginnt und womit er endet.
                  Nutzen Sie dafür die Perspektive des in Schritt 2 identifizierten Akteurs.

                  Schreiben Sie beides unter die entsprechenden Symbole auf der Vorlage.<br>
                  Es gibt zwei Symbole, die in Flussdiagrammen Standard sind:
                  - **Start (Kreis mit dünner Linie):** Wann startet der Prozess der Akteurin oder Akteurs?
                  - Ende (Kreis mit dicker Linie): Was soll die Akteurin oder Akteur am Ende erreichen?
                  
                  Es kann für verschiedene Akteure unterschiedliche Start- und Endpunkte geben. Konzentrieren Sie sich auf den wichtigsten.
              `}),e.jsx(l,{image:{url:"/images/methoden/flussdiagramme/4/start-ende.png",caption:"Der Start markiert die erste Aktion eines Akteurs, das Ende die letzte.",alternativeText:"Darstellung von Start- und Endknoten"},zoomable:!1,border:!0})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:s,badge:a,visual:{type:"component",Component:e.jsx(l,{image:{url:"/images/methoden/flussdiagramme/4/beispiel-fahrschule-start-ende.png",alternativeText:"Ausschnitt eines Flussdiagramms: Start des Prozesses durch einen Kreis mit dünner Linie für den Akteur Fahrschüler:in. Zwei dick umrandete Kreise zeigen verschiedene mögliche Endergebnisse."}})},children:e.jsx(i,{markdown:n`
                    Am Beispiel der Fahrerlaubnis:
                      - Der **Startpunkt** für die Fahrschülerin ist der Wunsch, einen Führerschein der Klasse B zu erlangen.
                      - Der **Endpunkt** ist erst erreicht, wenn sie den Führerschein als Plastikkarte erhalten hat.
                  `})})}),e.jsx(u,{id:"schritt-5",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(m,{children:"Schritt 5"}),e.jsx(i,{markdown:n`
                      ### Visualisieren Sie den Prozess
                      Jetzt **übertragen Sie auf das Template** die Akteure sowie Start- und Endpunkt:
                      
                      Jeder Akteur erhält eine sogenannte Schwimmbahn. Alle Aktivitäten des Akteurs finden auf dieser Schwimmbahn statt.
              `}),e.jsx(l,{image:{url:"/images/methoden/flussdiagramme/5/schwimmbahnen.png",alternativeText:"Fragment eines Flussdiagramms mit drei horizontalen, länglichen Kästen, die am Anfang mit einer Platzhalter-Box “Akteurin/Akteur” markiert sind.",caption:"Akteure können alle Normenadressaten oder Institutionen sein.",className:"border border-blue-800"},className:"md:max-w-2/3 lg:max-w-1/2",zoomable:!1,border:!0}),e.jsx("p",{children:"Setzen Sie den Startpunkt an den Anfang der Bahn des Akteurs, den Endpunkt ans Ende. Der genaue Platz wird im Verlauf noch angepasst. Der genaue Punkt findet sich später. Fügen Sie nun Aktivitäten, Entscheidungen und Informationsflüsse der Akteure nacheinander in die Bahnen ein. Formulieren Sie die Aktivitäten möglichst aktiv, z. B. „Akteur X beantragt Y“ oder „Akteur X versendet Y“."}),e.jsx(l,{image:{url:"/images/methoden/flussdiagramme/5/aktivitäten-mit-pfeilen.png",alternativeText:"Fragment eines Flussdiagramms, in denen Kästen für Aktivitäten mit Pfeilen verbunden sind.",caption:"Jede Aktivität der Akteure wird mit einem Pfeil verbunden."},className:"md:max-w-2/3 lg:max-w-1/2",zoomable:!1,border:!0}),e.jsx(i,{markdown:n`
                    **Darauf sollten Sie achten:**
                    - Akteure, Hierarchien, Abläufe und Entscheidungen sind klar und konsistent
                    - Eine eindeutige visuelle Kodierung, zum Beispiel Farben oder Symbole, um Informationen zu unterscheiden
                    - Verweis auf wesentliche Paragraphen, relevante Akteure und EU-Vorgaben
                    
                    Das Ergebnis muss an dieser Stelle noch nicht perfekt aussehen.
                    `}),e.jsx("p",{className:"ds-label-02-reg text-gray-900",id:"flussdiagramm-erstellen-live-desc",children:"Ein Beispielvideo zeigt das Entstehen eines Flussdiagramms."})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:s,badge:a,visual:{type:"component",Component:e.jsx(l,{image:{url:"/images/methoden/flussdiagramme/5/beispiel-fahrschule-kombiniert.png",alternativeText:"Flussdiagramm, welches Aktivitäten für Akteure Fahrschüler:in, Anerkannte Prüfstelle (Fahrschule) sowie Meldebehörde in farblich unterschiedlich kodierten Schwimmbahnen wie im Text beschrieben darstellt."}})},children:e.jsx(i,{markdown:n`
                    - **Akteure** (Fahrschüler:in, Fahrschule, Meldebehörde) haben je eine eigene Schwimmbahn.
                    - **Startpunkt** ("Möchte Führerschein erlangen") liegt am Anfang der Fahrschüler:in-Schwimmbahn.
                    - Prozess-Ablauf wird durch **Verbindungslinien** und **Schritte** dargestellt.
                    - Wesentliche **Paragraphen** (z.B. FeV § 16, BMG § 18) sind in den Kästen vermerkt.
                  `})})}),e.jsx(u,{id:"schritt-6",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(m,{children:"Schritt 6"}),e.jsx(i,{markdown:n`
                    ### Räumen Sie die Visualisierung auf und fügen Sie wichtige Metadaten hinzu
                    Nachdem Sie den Prozess visualisiert haben, können Sie mit dem Feinschliff beginnen und alles ordnen.
                    
                    Prüfen Sie, ob die Elemente in Ihrer Visualisierung zu Ihrer Legende passen. Falls Sie noch keine Legende haben, erstellen Sie eine. Sie sollte Abkürzungen und Symbole klar erklären. Ähnlich wie in diesem Beispiel:
                `}),e.jsx(l,{image:{url:"/images/methoden/flussdiagramme/6/legende.png",alternativeText:"Eine Legende, die zu Symbolen aus dem Diagramm Beschriftungen ergänzt",caption:"Eine Legende erklärt Symbole und Abkürzungen und macht so die Visualisierung verständlich."},border:!0,className:"md:max-w-2/3 lg:max-w-1/2"}),e.jsx(i,{markdown:n`
                      Kennzeichnen Sie Ihre Visualisierung mit den wichtigsten Metadaten:
                      - Datum
                      - Titel
                      - Referat
                      - Version
                      - Leitfrage, die beantwortet wird und,
                      - falls zutreffend, Seitenzahlen
                    `}),e.jsx(i,{markdown:n`
                      **Darauf sollten Sie achten:**
                      - Zusammenhänge und Abgrenzungen sind klar erkennbar z.B. zu anderen Regelungen und Akteuren
                    `})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:s,badge:a,visual:{type:"component",Component:e.jsx(l,{image:{url:"/images/methoden/flussdiagramme/6/vollständiges-beispiel.jpg",alternativeText:"Flussdiagramm, welches zusätzliche Entscheidungssymbole, ein Datenbank-Symbol sowie eine Legende enthält."}})},children:e.jsx(i,{markdown:n`
                    - **Ablauf/Entscheidungen:** Der Prozess ist durch Entscheidungssymbole (◇) erweitert, die einen "bestanden/nicht bestanden" Zweig nach der Theorie- und Praxisprüfung anzeigen.
                    - **Datenspeicherung:** Ein Datenbank-Symbol wurde hinzugefügt, um das "Melderegister" darzustellen.
                    - **Legenden:** Die Bedeutung der neuen Symbole wird in einer Legende erklärt.
                  `})}),hideNextButton:!0})]})]}),e.jsxs("section",{className:"scroll-my-40",id:"video-anleitung",children:[e.jsx("h2",{className:"ds-subhead mb-8",children:"Zusammenfassende Anleitung: So entsteht ein Flussdiagramm"}),e.jsx("p",{className:"mb-40",children:"Im Video sehen Sie die zuvor erklärten Schritte in kompakter Form – diesmal am Beispiel Einbürgerung. So wird deutlich, wie sich die Methode aus dem Führerschein-Beispiel auch auf andere Themen übertragen lässt."}),e.jsxs("video",{controls:!0,muted:!0,width:"100%",className:p("max-w-a11y",I("Content.Steps.5.Video+View")),preload:"none",poster:c+"/Flussdiagramm_erstellen_live_poster_2_b011955559.png","aria-labelledby":"flussdiagramm-erstellen-live-desc",children:[e.jsx("source",{src:c+"/Flussdiagramm_erstellen_live_9d1e3de185.mp4",type:"video/mp4"}),e.jsx(w,{to:c+"/Flussdiagramm_erstellen_live_9d1e3de185.mp4",target:"_blank",rel:"noreferrer",className:"ds-link-01-reg",children:"Video herunterladen"})]})]})]})})}),e.jsxs(A,{className:"mb-80 py-0",children:[e.jsx("hr",{className:"mb-80 border-0 border-b-2 border-solid border-blue-300"}),e.jsxs(o,{badge:{Icon:S,children:"So geht es weiter"},heading:{tagName:"h2",text:"Im nächsten Schritt wenden Sie die Prinzipien an.",className:"ds-heading-03-reg"},children:[e.jsx("p",{children:"Sie wenden die Prinzipien auf Ihre Visualisierung an und identifizieren konkrete Möglichkeiten der Digitalisierung."}),e.jsx(o.LinkList,{links:[{text:"Zu den Prinzipien",look:"tertiary",to:B.url}]})]})]}),e.jsx(C,{})]})});export{ce as default};

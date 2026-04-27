import{j as e,t as f}from"./tailwindMerge.B4_tS6rG.js";import{m as w}from"./routes.XnO0p1en.js";import{S}from"./DriveFileRenameOutline.el9mv5S4.js";import{S as j}from"./LayersOutlined.DAFQL4KB.js";import{a as b}from"./index.B3qy3T_0.js";import{B as h,S as c}from"./Badge.CYu5pl0l.js";import{H as g,B as v}from"./ButtonContainer.BLS05-1e.js";import{I as d}from"./ImageBox.BqMUjFyh.js";import{I as o}from"./InfoBox.CqdhiH9W.js";import{N as p}from"./NumberedList.DeU4bpMt.js";import{R as s,g as z}from"./RichText.rST1Op2y.js";import{C as A}from"./Container.DPEFqV8S.js";import{S as F,T as t}from"./SidebarContainer.QJew3yRD.js";import{c as E}from"./contact.u1KNilBO.js";import{b as P}from"./staticRoutes.BlGCrz0h.js";import{a as r}from"./assetPath.DYDS5rnC.js";import{d as i,L as y}from"./dedentMultilineStrings.CsdQtQqT.js";const N=n=>e.jsxs("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",enableBackground:"new 0 0 24 24",height:24,viewBox:"0 0 24 24",width:24,"data-testid":"ArrowCircleRightOutlinedIcon",focusable:"false","aria-hidden":"true"},n,{children:[e.jsx("g",{children:e.jsx("rect",{fill:"none",height:24,width:24})}),e.jsx("g",{children:e.jsx("path",{d:"M22,12c0-5.52-4.48-10-10-10C6.48,2,2,6.48,2,12s4.48,10,10,10C17.52,22,22,17.52,22,12z M4,12c0-4.42,3.58-8,8-8 c4.42,0,8,3.58,8,8s-3.58,8-8,8C7.58,20,4,16.42,4,12z M16,12l-4,4l-1.41-1.41L12.17,13H8v-2h4.17l-1.59-1.59L12,8L16,12z"})})]})),B=n=>e.jsxs("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",height:24,viewBox:"0 0 24 24",width:24,"data-testid":"ArrowDownwardOutlinedIcon",focusable:"false","aria-hidden":"true"},n,{children:[e.jsx("path",{d:"M0 0h24v24H0V0z",fill:"none"}),e.jsx("path",{d:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"})]})),I=n=>e.jsxs("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",height:24,viewBox:"0 0 24 24",width:24,"data-testid":"ArrowUpwardIcon",focusable:"false","aria-hidden":"true"},n,{children:[e.jsx("path",{d:"M0 0h24v24H0V0z",fill:"none"}),e.jsx("path",{d:"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"})]}));function D(){const[n,a]=b.useState(!1),l=()=>{const x=window.innerHeight,k=window.scrollY>x;a(k)},u=()=>{window.scrollTo({top:0,behavior:"smooth"})};return b.useEffect(()=>(window.addEventListener("scroll",l),()=>{window.removeEventListener("scroll",l)}),[]),e.jsxs("button",{onClick:u,className:f("ds-label-03-reg fixed right-16 bottom-16 z-50 flex items-center gap-8 rounded-full bg-blue-800 p-8 pr-16 text-white shadow-md outline-2 outline-blue-500 transition-opacity duration-150 sm:right-24 sm:bottom-24",n?"opacity-100":"pointer-events-none opacity-0"),"aria-hidden":!n,tabIndex:n?void 0:-1,children:[e.jsx(I,{fill:"currentColor"}),"Zurück nach oben"]})}const V=[{iconUrl:r("/icons/DiagramStartNode.svg"),title:"Start-/Endsymbol",description:i`
        **Start-/Endsymbol**
        
        Der Kreis stellt den Beginn oder das Ende eines Prozesses dar (z.B. Antrag wird gestellt).`},{iconUrl:r("/icons/DiagramDecision.svg"),title:"Entscheidungssymbol",description:i`
        **Entscheidungssymbol**
        
        Eine Raute steht für eine Abfrage mit mindestens zwei möglichen Ausgängen (z.B. Antrag vollständig? – ja/nein).`},{iconUrl:r("/icons/DiagramActor.svg"),title:"Akteurin/Akteur",description:i`
      **Akteurin/Akteur**
      
      Ein Rechteck mit Symbol steht für eine beteiligte Person oder Institution im Prozess (z.B. Meldebehörde oder Fahrschülerin).`},{iconUrl:r("/icons/DiagramData.svg"),title:"Datensymbol (Eingabe/Ausgabe)",description:i`
    **Datensymbol (Eingabe/Ausgabe)**
    
    Dieses Symbol zeigt genutzte oder erzeugte Daten oder Ressourcen (z.B. Melderegister).`},{iconUrl:r("/icons/DiagramActivity.svg"),title:"Prozess-/Aktivitätssymbol",description:i`
    **Prozess-/Aktivitätssymbol**
    
    Das Rechteck stellt eine Aktivität oder einen Arbeitsschritt dar (z.B. Antrag prüfen).`},{iconUrl:r("/icons/DiagramConnector.svg"),title:"Verbindungspfeil",description:i`
    **Verbindungspfeil**
    
    Pfeile verbinden die Symbole und machen die zeitliche Reihenfolge der Prozessschritte sichtbar.`}];function C(){const n=b.useRef(null);function a(){n.current?.closest("li")?.nextElementSibling?.scrollIntoView()}return e.jsx("div",{ref:n,className:"flex justify-center",children:e.jsx(v,{onClick:a,size:"small",iconLeft:e.jsx(B,{}),type:"button",children:"Nächster Schritt"})})}function m({mainContent:n,fullwidthContent:a,hideNextButton:l,id:u}){return e.jsx(p.Item,{className:"flex scroll-my-40 flex-col gap-16",after:e.jsxs(e.Fragment,{children:[a,!l&&e.jsx(C,{})]}),id:u,children:n})}function Q(){const n="px-16 sm:px-56",a={children:"Beispiel: Fahrerlaubnis",look:"hint"};return e.jsxs(e.Fragment,{children:[e.jsxs("main",{children:[e.jsx("div",{className:"breakout-grid-toc bg-blue-100 pt-40 pb-48",children:e.jsxs("div",{children:[e.jsx(g,{tagName:"h1",children:"Erstellung von Flussdiagrammen"}),e.jsx("p",{className:"ds-subhead mt-16",children:"Ein Flussdiagramm visualisiert, wie ein Prozess Schritt für Schritt abläuft. Es hilft, die Reihenfolge von z.B. Handlungen, Datenflüssen oder Entscheidungen übersichtlich darzustellen."})]})}),e.jsx(F,{sidebar:e.jsx(t,{title:"Inhalt",selector:"section[id], li[id]",children:e.jsxs(t.List,{className:"list-unstyled list-none",children:[e.jsx(t.Item,{href:"#aufbau",title:"Aufbau"}),e.jsx(t.Item,{href:"#anleitung",title:"Anleitung",after:e.jsxs(t.List,{className:"mt-0 list-none",children:[e.jsx(t.Item,{href:"#schritt-1",title:"Format",numbered:!0}),e.jsx(t.Item,{href:"#schritt-2",title:"Akteure",numbered:!0}),e.jsx(t.Item,{numbered:!0,href:"#schritt-3",title:"Ziel & Perspektive der Visualisierung"}),e.jsx(t.Item,{numbered:!0,href:"#schritt-4",title:"Start und Ende definieren"}),e.jsx(t.Item,{numbered:!0,href:"#schritt-5",title:"Prozess abbilden"}),e.jsx(t.Item,{numbered:!0,href:"#schritt-6",title:"Informationen ergänzen"})]})}),e.jsx(t.Item,{href:"#video-anleitung",title:"Video-Anleitung"})]})}),children:e.jsxs("div",{className:"my-40 space-y-40 lg:space-y-80",children:[e.jsxs("section",{className:"scroll-my-40 space-y-32 md:space-y-40",id:"aufbau",children:[e.jsx(g,{tagName:"h2",className:"ds-heading-02-reg",children:"Typischer Aufbau eines Flussdiagramms"}),e.jsx("div",{className:"grid grid-cols-1 gap-y-32 md:grid-cols-2 md:gap-x-48 md:gap-y-40",children:V.map(l=>e.jsxs("div",{className:"flex gap-8",children:[e.jsx("img",{src:l.iconUrl,alt:l.title,className:"size-80"}),e.jsx(s,{className:"ds-label-02-reg",markdown:l.description})]},l.title))}),e.jsx(d,{title:"Beispiel eines Flussdiagramms",image:{url:r("/images/methoden/flussdiagramme/flussdiagramm-beispiel.png"),caption:"In diesem Beispiel ist der Antragsprozess für einen Führerschein aus Sicht der Fahrschülerin / des Fahrschülers visualisiert.",alternativeText:"Das Bild zeigt am Beispiel des Führerscheinantrags, wie ein Flussdiagramm funktioniert. Es stellt alle Schritte von der Anmeldung bis zur Meldebestätigung in chronologischer Reihenfolge übersichtlich dar. Die grünen Boxen erklären die jeweiligen Vorteile. Ein Flussdiagramm veranschaulicht Prozesse, verdeutlicht Verantwortlichkeiten und hilft, die Orientierung über den gesamten Ablauf zu bewahren."},zoomable:!0,border:!0})]}),e.jsxs("section",{className:"scroll-my-40 space-y-32 md:space-y-40",id:"anleitung",children:[e.jsxs(g,{tagName:"h2",className:"flex gap-32",children:[e.jsx(S,{className:"size-40"}),"Anleitung"]}),e.jsxs(p,{separator:!0,children:[e.jsx(m,{id:"schritt-1",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(h,{children:"Schritt 1"}),e.jsx(s,{markdown:i`
                    ### Entscheiden Sie, in welchem Medium Sie arbeiten möchten
                    
                    Wir empfehlen, den ersten Entwurf auf Papier oder einem Whiteboard zu erstellen.
                    Sie können Fehler jederzeit leicht korrigieren und die Darstellung flexibel anpassen. 
                    Perfektion ist hier nicht entscheidend – wichtig ist, dass Sie anfangen
                    Sie können auch in einem einfachen Whiteboard-Programm oder Powerpoint arbeiten.
                    
                    **Darauf sollten Sie achten:**
                    
                    - Visualisierung ist klar strukturiert und gut lesbar
                    - Beschränkt sich auf die wesentlichen Elemente des Prozesses
                    `})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:n,badge:{Icon:j,children:"Vorlage für Flussdiagramm"},children:e.jsx(s,{markdown:i`
                    Hier können Sie eine **Powerpoint-Vorlage (PPT)** für das Flussdiagramm herunterladen.
                    In der Vorlage ist eine Schritt-für-Schritt-Anleitung enthalten.
                    Sie können diese ausdrucken oder an Ihrem Computer bearbeiten.
                    Sofern in Ihrem Ressort **Conceptboard** genutzt werden kann, können Sie sich auch eine Kopie dieser Conceptboard-Vorlage erstellen.
                    Für letzteres können Sie einen **Gast-Zugang** anlegen.
                    
                    [Conceptboard-Vorlage](https://bmas.de.conceptboard.com/board/qh33-xcny-usde-7nc6-82cy)
                    
                    [Powerpoint-Vorlage](${P.url})
                    
                    Sie wünschen sich ein anderes Medium?
                    Schicken Sie uns eine E-Mail an ${E.email}.
                  `})})}),e.jsx(m,{id:"schritt-2",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(h,{children:"Schritt 2"}),e.jsx(s,{markdown:i`
                      ### Identifizieren Sie relevante Akteure
                      
                      Sie starten mit einer unsortierten Liste der relevanten Akteure.
                      Schreiben Sie alle Akteure auf, die für den Vollzug der Regelung zuständig sind. Vergessen Sie dabei nicht die Normadressaten.
                      Es ist nicht schlimm, wenn Sie dabei einen Akteur vergessen. Dieser kann später hinzugefügt werden.`})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:n,badge:a,visual:{type:"component",Component:e.jsx(d,{image:{url:r("/images/methoden/flussdiagramme/2/relevante-akteure.png"),alternativeText:"Eine Grafik, welches die Institutionen Meldebehörde, Anerkannte Prüfstelle (Fahrschule), Bundesdruckerei, Bundesamt für Justiz sowie die Rolle Fahrschüler:in ungeordnet darstellt."}})},children:e.jsx(s,{markdown:i`
                    Am Beispiel der Fahrerlaubnis sind die wichtigsten Akteure und Berührungspunkte
                      - Fahrschülerin,
                      - Anerkannte Prüfstelle (Fahrschule)
                      - Meldebehörde
                      - Fahrerlaubnisbehörde
                      - Bundesamt für Justiz
                  `})})}),e.jsx(m,{id:"schritt-3",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(h,{children:"Schritt 3"}),e.jsx(s,{markdown:i`
                      ### Legen Sie fest, was Ziel und Perspektive der Visualisierung sind
                      
                      Das Ziel der Visualisierung dient Ihnen als Orientierungspunkt, auf den Sie während des
                      Visualisierens immer wieder schauen können.
                      Die Perspektive legt fest, welcher Akteur im Fokus steht.
                      Häufig sind das die Normadressaten, es kann aber auch eine bestimmte Behörde sein, deren interne
                      Abläufe verbessert werden sollen.
                      
                      Schreiben Sie beides auf.
              `})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:n,badge:a,visual:{type:"component",Component:e.jsx(d,{image:{url:r("/images/methoden/flussdiagramme/3/ziel-perspektive-visualisierung.png"),alternativeText:"Schaubild, welches Ziel der Visualisierung und Perspektive abstrakt darstellt. Das Ziel ist: Ich möchte den Prozess für Normenadressaten verbessern. Die Perspektive ist: Normenadressaten."}})},children:e.jsx(s,{markdown:i`
                    Am Beispiel der Fahrerlaubnis:
                      - **Ziel** der Visualisierung: „Ich möchte den Prozess für die Erlangung der Fahrerlaubnis verändern und digital ermöglichen.“
                      - Die **Perspektive**  der Visualisierung ist die der Normadressaten und -adressatinnen. In diesem Fall die einer Fahrschülerin.
                  `})})}),e.jsx(m,{id:"schritt-4",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(h,{children:"Schritt 4"}),e.jsx(s,{markdown:i`
                  ### Legen Sie fest, was Start- und Endpunkt sind
                  
                  Jetzt definieren Sie, womit der Prozess beginnt und womit er endet.
                  Nutzen Sie dafür die Perspektive des in Schritt 2 identifizierten Akteurs.

                  Schreiben Sie beides unter die entsprechenden Symbole auf der Vorlage.<br>
                  Es gibt zwei Symbole, die in Flussdiagrammen Standard sind:
                  - **Start (Kreis mit dünner Linie):** Wann startet der Prozess der Akteurin oder Akteurs?
                  - Ende (Kreis mit dicker Linie): Was soll die Akteurin oder Akteur am Ende erreichen?
                  
                  Es kann für verschiedene Akteure unterschiedliche Start- und Endpunkte geben. Konzentrieren Sie sich auf den wichtigsten.
              `}),e.jsx(d,{image:{url:r("/images/methoden/flussdiagramme/4/start-ende.png"),caption:"Der Start markiert die erste Aktion eines Akteurs, das Ende die letzte.",alternativeText:"Darstellung von Start- und Endknoten"},zoomable:!1,border:!0})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:n,badge:a,visual:{type:"component",Component:e.jsx(d,{image:{url:r("/images/methoden/flussdiagramme/4/beispiel-fahrschule-start-ende.png"),alternativeText:"Ausschnitt eines Flussdiagramms: Start des Prozesses durch einen Kreis mit dünner Linie für den Akteur Fahrschüler:in. Zwei dick umrandete Kreise zeigen verschiedene mögliche Endergebnisse."}})},children:e.jsx(s,{markdown:i`
                    Am Beispiel der Fahrerlaubnis:
                      - Der **Startpunkt** für die Fahrschülerin ist der Wunsch, einen Führerschein der Klasse B zu erlangen.
                      - Der **Endpunkt** ist erst erreicht, wenn sie den Führerschein als Plastikkarte erhalten hat.
                  `})})}),e.jsx(m,{id:"schritt-5",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(h,{children:"Schritt 5"}),e.jsx(s,{markdown:i`
                      ### Visualisieren Sie den Prozess
                      Jetzt **übertragen Sie auf das Template** die Akteure sowie Start- und Endpunkt:
                      
                      Jeder Akteur erhält eine sogenannte Schwimmbahn. Alle Aktivitäten des Akteurs finden auf dieser Schwimmbahn statt.
              `}),e.jsx(d,{image:{url:r("/images/methoden/flussdiagramme/5/schwimmbahnen.png"),alternativeText:"Fragment eines Flussdiagramms mit drei horizontalen, länglichen Kästen, die am Anfang mit einer Platzhalter-Box “Akteurin/Akteur” markiert sind.",caption:"Akteure können alle Normenadressaten oder Institutionen sein.",className:"border border-blue-800"},className:"md:max-w-2/3 lg:max-w-1/2",zoomable:!1,border:!0}),e.jsx("p",{children:"Setzen Sie den Startpunkt an den Anfang der Bahn des Akteurs, den Endpunkt ans Ende. Der genaue Platz wird im Verlauf noch angepasst. Der genaue Punkt findet sich später. Fügen Sie nun Aktivitäten, Entscheidungen und Informationsflüsse der Akteure nacheinander in die Bahnen ein. Formulieren Sie die Aktivitäten möglichst aktiv, z. B. „Akteur X beantragt Y“ oder „Akteur X versendet Y“."}),e.jsx(d,{image:{url:r("/images/methoden/flussdiagramme/5/aktivitäten-mit-pfeilen.png"),alternativeText:"Fragment eines Flussdiagramms, in denen Kästen für Aktivitäten mit Pfeilen verbunden sind.",caption:"Jede Aktivität der Akteure wird mit einem Pfeil verbunden."},className:"md:max-w-2/3 lg:max-w-1/2",zoomable:!1,border:!0}),e.jsx(s,{markdown:i`
                    **Darauf sollten Sie achten:**
                    - Akteure, Hierarchien, Abläufe und Entscheidungen sind klar und konsistent
                    - Eine eindeutige visuelle Kodierung, zum Beispiel Farben oder Symbole, um Informationen zu unterscheiden
                    - Verweis auf wesentliche Paragraphen, relevante Akteure und EU-Vorgaben
                    
                    Das Ergebnis muss an dieser Stelle noch nicht perfekt aussehen.
                    `}),e.jsx("p",{className:"ds-label-02-reg text-gray-900",id:"flussdiagramm-erstellen-live-desc",children:"Ein Beispielvideo zeigt das Entstehen eines Flussdiagramms."})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:n,badge:a,visual:{type:"component",Component:e.jsx(d,{image:{url:r("/images/methoden/flussdiagramme/5/beispiel-fahrschule-kombiniert.png"),alternativeText:"Flussdiagramm, welches Aktivitäten für Akteure Fahrschüler:in, Anerkannte Prüfstelle (Fahrschule) sowie Meldebehörde in farblich unterschiedlich kodierten Schwimmbahnen wie im Text beschrieben darstellt."}})},children:e.jsx(s,{markdown:i`
                    - **Akteure** (Fahrschüler:in, Fahrschule, Meldebehörde) haben je eine eigene Schwimmbahn.
                    - **Startpunkt** ("Möchte Führerschein erlangen") liegt am Anfang der Fahrschüler:in-Schwimmbahn.
                    - Prozess-Ablauf wird durch **Verbindungslinien** und **Schritte** dargestellt.
                    - Wesentliche **Paragraphen** (z.B. FeV § 16, BMG § 18) sind in den Kästen vermerkt.
                  `})})}),e.jsx(m,{id:"schritt-6",mainContent:e.jsxs(e.Fragment,{children:[e.jsx(h,{children:"Schritt 6"}),e.jsx(s,{markdown:i`
                    ### Räumen Sie die Visualisierung auf und fügen Sie wichtige Metadaten hinzu
                    Nachdem Sie den Prozess visualisiert haben, können Sie mit dem Feinschliff beginnen und alles ordnen.
                    
                    Prüfen Sie, ob die Elemente in Ihrer Visualisierung zu Ihrer Legende passen. Falls Sie noch keine Legende haben, erstellen Sie eine. Sie sollte Abkürzungen und Symbole klar erklären. Ähnlich wie in diesem Beispiel:
                `}),e.jsx(d,{image:{url:r("/images/methoden/flussdiagramme/6/legende.png"),alternativeText:"Eine Legende, die zu Symbolen aus dem Diagramm Beschriftungen ergänzt",caption:"Eine Legende erklärt Symbole und Abkürzungen und macht so die Visualisierung verständlich."},border:!0,className:"md:max-w-2/3 lg:max-w-1/2"}),e.jsx(s,{markdown:i`
                      Kennzeichnen Sie Ihre Visualisierung mit den wichtigsten Metadaten:
                      - Datum
                      - Titel
                      - Referat
                      - Version
                      - Leitfrage, die beantwortet wird und,
                      - falls zutreffend, Seitenzahlen
                    `}),e.jsx(s,{markdown:i`
                      **Darauf sollten Sie achten:**
                      - Zusammenhänge und Abgrenzungen sind klar erkennbar z.B. zu anderen Regelungen und Akteuren
                    `})]}),fullwidthContent:e.jsx(o,{look:"highlight",className:n,badge:a,visual:{type:"component",Component:e.jsx(d,{image:{url:r("/images/methoden/flussdiagramme/6/vollständiges-beispiel.jpg"),alternativeText:"Flussdiagramm, welches zusätzliche Entscheidungssymbole, ein Datenbank-Symbol sowie eine Legende enthält."}})},children:e.jsx(s,{markdown:i`
                    - **Ablauf/Entscheidungen:** Der Prozess ist durch Entscheidungssymbole (◇) erweitert, die einen "bestanden/nicht bestanden" Zweig nach der Theorie- und Praxisprüfung anzeigen.
                    - **Datenspeicherung:** Ein Datenbank-Symbol wurde hinzugefügt, um das "Melderegister" darzustellen.
                    - **Legenden:** Die Bedeutung der neuen Symbole wird in einer Legende erklärt.
                  `})}),hideNextButton:!0})]})]}),e.jsxs("section",{className:"scroll-my-40",id:"video-anleitung",children:[e.jsx("h2",{className:"ds-subhead mb-8",children:"Zusammenfassende Anleitung: So entsteht ein Flussdiagramm"}),e.jsx("p",{className:"mb-40",children:"Im Video sehen Sie die zuvor erklärten Schritte in kompakter Form – diesmal am Beispiel Einbürgerung. So wird deutlich, wie sich die Methode aus dem Führerschein-Beispiel auch auf andere Themen übertragen lässt."}),e.jsxs("video",{controls:!0,muted:!0,width:"100%",className:f("max-w-a11y",z("Content.Steps.5.Video+View")),preload:"none",poster:c+"/Flussdiagramm_erstellen_live_poster_2_b011955559.png","aria-labelledby":"flussdiagramm-erstellen-live-desc",children:[e.jsx("source",{src:c+"/Flussdiagramm_erstellen_live_9d1e3de185.mp4",type:"video/mp4"}),e.jsx(y,{to:c+"/Flussdiagramm_erstellen_live_9d1e3de185.mp4",target:"_blank",rel:"noreferrer",className:"ds-link-01-reg",children:"Video herunterladen"})]})]})]})}),e.jsxs(A,{className:"mb-80 py-0",children:[e.jsx("hr",{className:"mb-80 border-0 border-b-2 border-solid border-blue-300"}),e.jsxs(o,{badge:{Icon:N,children:"So geht es weiter"},heading:{tagName:"h2",text:"Im nächsten Schritt wenden Sie die Prinzipien an.",className:"ds-heading-03-reg"},children:[e.jsx("p",{children:"Sie wenden die Prinzipien auf Ihre Visualisierung an und identifizieren konkrete Möglichkeiten der Digitalisierung."}),e.jsx(o.LinkList,{links:[{text:"Zu den Prinzipien",look:"tertiary",to:w.path}]})]})]})]}),e.jsx(D,{})]})}export{Q as default};

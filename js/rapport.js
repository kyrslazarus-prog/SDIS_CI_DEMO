function RapportIntervention(numero){

    const interventions =
        chargerInterventions();

    const intervention =
        interventions.find(
            x => x.numero == numero
        );

    if(!intervention){
        return;
    }

    genererRapportPDF(
        intervention
    );
}

function ajouterTitre(doc,titre,y){

    doc.setFontSize(14);

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.text(
        titre,
        105,
        y,
        {align:"center"}
    );

    doc.line(
        20,
        y+2,
        190,
        y+2
    );

    return y + 10;
}

function genererRapportPDF(intervention){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let y = 20;

    const pageWidth =
        doc.internal.pageSize.getWidth();

    const centre =
        pageWidth / 2;

    // ==================================================
    // TITRE
    // ==================================================

    doc.setFontSize(18);

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.text(
        "Rapport d'intervention",
        centre,
        y,
        { align:"center" }
    );

    y += 15;

    doc.setFontSize(14);

    doc.text(
        intervention.type,
        centre,
        y,
        { align:"center" }
    );

    y += 8;

    doc.setFontSize(10);

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.text(
        formaterDate(
            intervention.dateOuverture
        ),
        centre,
        y,
        { align:"center" }
    );

    y += 10;

    doc.line(
        20,
        y,
        190,
        y
    );

    y += 15;

    // ==================================================
    // CROIX
    // ==================================================

    if(
        intervention.dessinCroix
    ){

        doc.setFontSize(14);

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.text(
            "Croix décisionnelle",
            centre,
            y,
            { align:"center" }
        );

        y += 10;

        const largeurCroix = 120;

        const hauteurCroix = 120;

        const xCroix =
            (pageWidth - largeurCroix) / 2;

        doc.addImage(
            intervention.dessinCroix,
            "PNG",
            xCroix,
            y,
            largeurCroix,
            hauteurCroix
        );

        y += hauteurCroix + 15;
    }

    // ==================================================
    // CROQUIS
    // ==================================================

    if(
        intervention.dessinCroquis
    ){

        if(y > 180){

            doc.addPage();

            y = 20;
        }

        doc.setFontSize(14);

        doc.text(
            "Croquis",
            centre,
            y,
            { align:"center" }
        );

        y += 10;

        const largeurCroquis =
            150;

        const hauteurCroquis =
            90;

        const xCroquis =
            (pageWidth - largeurCroquis)
            / 2;

        doc.addImage(
            intervention.dessinCroquis,
            "PNG",
            xCroquis,
            y,
            largeurCroquis,
            hauteurCroquis
        );

        y += hauteurCroquis + 15;
    }

    // ==================================================
    // CONTACTS
    // ==================================================

    if(
        intervention.contacts &&
        intervention.contacts.length > 0
    ){

        if(y > 220){

            doc.addPage();

            y = 20;
        }

        doc.setFontSize(14);

        doc.text(
            "Contacts",
            centre,
            y,
            { align:"center" }
        );

        y += 12;

        intervention.contacts
            .forEach(contact => {

                doc.setFont(
                    "helvetica",
                    "bold"
                );

                doc.text(
                    contact.type || "",
                    15,
                    y
                );

                y += 6;

                doc.setFont(
                    "helvetica",
                    "normal"
                );

                if(contact.nomPrenom){

                    doc.text(
                        `Nom : ${contact.nomPrenom}`,
                        20,
                        y
                    );

                    y += 6;
                }

                if(contact.adresse){

                    doc.text(
                        `Adresse : ${contact.adresse}`,
                        20,
                        y
                    );

                    y += 6;
                }

                if(contact.telephone){

                    doc.text(
                        `Téléphone : ${contact.telephone}`,
                        20,
                        y
                    );

                    y += 6;
                }

                y += 4;

                doc.line(
                    20,
                    y,
                    190,
                    y
                );

                y += 8;

                if(y > 260){

                    doc.addPage();

                    y = 20;
                }

            });
    }

    // ==================================================
    // SAUVEGARDE
    // ==================================================
    doc.setFontSize(8);

    doc.setTextColor(120);

    doc.text(
        `Généré avec ${APP_NAME} ${VERSION}`,
        10,
        290
    );

    doc.save(
        `Intervention_${intervention.numero}.pdf`
    );
}
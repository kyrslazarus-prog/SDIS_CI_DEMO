chargerIntervention()
afficherTitre();
afficherContacts();

const canvas =
    document.getElementById(
        "noteContact"
    );

let ctx = null;
let dessin = false;

if(canvas){

    ctx =
        canvas.getContext("2d");

    canvas.addEventListener(
        "pointerdown",
        debutDessin
    );

    canvas.addEventListener(
        "pointermove",
        dessiner
    );

    canvas.addEventListener(
        "pointerup",
        finDessin
    );

    canvas.addEventListener(
        "pointerleave",
        finDessin
    );
}
/************************************************************
 * DESSIN DE LA CROIX
 ************************************************************/
function dessinerCroix() {

    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(
        canvas.width,
        canvas.height
    );

    ctx.moveTo(
        0,
        canvas.height
    );

    ctx.lineTo(
        canvas.width,
        0
    );

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#444";
    ctx.stroke();
}
function debutDessin(e){

    dessin = true;

    ctx.beginPath();

    ctx.moveTo(
        e.offsetX,
        e.offsetY
    );

    // Debug
    console.log("Type pointeur :", e.pointerType);
}
function dessiner(e){

    if(!dessin) return;

    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    ctx.lineTo(
        e.offsetX,
        e.offsetY
    );

    ctx.stroke();
}
function finDessin(){

    dessin = false;
}




function afficherTitre(){
 
const titre =
document.getElementById(
"titreIntervention"
);
 
titre.textContent =
`Contacts - Intervention #${intervention.numero}`;
}
function ajouterContact(){

    if(!intervention.contacts){

        intervention.contacts = [];
    }

    const contact = {

        id: Date.now(),

        type:
            document.getElementById(
                "typeContact"
            ).value,

        nomPrenom:
            document.getElementById(
                "nomPrenom"
            ).value,

        adresse:
            document.getElementById(
                "adresse"
            ).value,

        telephone:
            document.getElementById(
                "telephone"
            ).value,
    };

    const canvas =
        document.getElementById(
            "noteContact"
        );

    contact.commentaireManuscrit =
        canvas.toDataURL(
            "image/png"
        );

    intervention.contacts.push(
        contact
    );


    sauvegarderIntervention();

    viderFormulaire();

    afficherContacts();
}
function viderFormulaire(){

    document.getElementById(
        "nomPrenom"
    ).value = "";

    document.getElementById(
        "adresse"
    ).value = "";

    document.getElementById(
        "telephone"
    ).value = "";

    if(ctx){
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }
}
function effacerNote(){

    if(!ctx){
        return;
    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}
function afficherContacts(){

    const zone =
        document.getElementById(
            "listeContacts"
        );

    zone.innerHTML = "";

    if(
        !intervention.contacts
    ){
        return;
    }

    intervention.contacts
        .forEach(contact => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "intervention-card";

            div.innerHTML = `

                <strong>
                    ${contact.type}
                </strong>

                <br>

                ${contact.nomPrenom}

                <br>

                ${contact.adresse}

                <br>

                ${contact.telephone}

                <br>

                <img
                    src="${contact.commentaireManuscrit}"
                    class="note-contact">

                <br><br>

                <button
                    onclick="supprimerContact(${contact.id})">

                    Supprimer

                </button>

            `;

            zone.appendChild(div);

        });
}
function supprimerContact(id){

    intervention.contacts =
        intervention.contacts.filter(
            x => x.id !== id
        );

    sauvegarderIntervention();

    afficherContacts();
}



/************************************************************
 * CHARGEMENT DE L'INTERVENTION
 ************************************************************/
chargerIntervention()

if(intervention.statut === "terminee"){

    const bandeau =
        document.getElementById(
            "modeManagement"
        );

    if(bandeau){

        bandeau.style.display =
            "block";
    }
}

/************************************************************
 * TYPE D'INTERVENTION
 ************************************************************/
const titreType =
    document.getElementById("typeIntervention");

if (titreType) {
    titreType.textContent =
        intervention.type || "Non défini";
}



/************************************************************
 * CANVAS
 ************************************************************/
const canvas =
    document.getElementById("dessin");

const ctx =
    canvas.getContext("2d");

let dessin = false;

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
console.log(
    "pointer",
    e.pointerType
);

    canvas.addEventListener(
        "pointercancel",
        finDessin
    );
    dessin = true;

    const pos =
        getCanvasPosition(
            canvas,
            e
        );

    ctx.beginPath();

    ctx.moveTo(
        pos.x,
        pos.y
    );
}
function dessiner(e){

    if(!dessin){
        return;
    }

    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    const pos =
        getCanvasPosition(
            canvas,
            e
        );

    ctx.lineTo(
        pos.x,
        pos.y
    );

    ctx.stroke();
}
function finDessin(){

    dessin = false;

    intervention.dessinCroix =
        canvas.toDataURL(
            "image/png"
        );

    sauvegarderIntervention();
}
/************************************************************
 * INITIALISATION
 ************************************************************/

dessinerCroix();
afficherPictogrammesCroix();

/************************************************************
 * RESTAURATION DU CROQUIS
 ************************************************************/

if (intervention.dessinCroix ) {

    const image = new Image();

    image.onload = () => {

        dessinerCroix();    // dessine la croix

        ctx.drawImage(
            image,
            0,
            0
        );
    };

    image.src =
        intervention.dessinCroix ;
}

/************************************************************
 * DESSIN LIBRE
 ************************************************************/

canvas.addEventListener(
    "mousedown",
    (e) => {

        dessin = true;

        ctx.beginPath();

        ctx.moveTo(
            e.offsetX,
            e.offsetY
        );
    }
);

canvas.addEventListener(
    "mousemove",
    (e) => {

        if (!dessin) return;

        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        ctx.lineTo(
            e.offsetX,
            e.offsetY
        );

        ctx.stroke();
    }
);

canvas.addEventListener(
    "mouseup",
    () => {

        dessin = false;

        sauvegarderCroquis();
    }
);

canvas.addEventListener(
    "mouseleave",
    () => {

        dessin = false;
    }
);

canvas.addEventListener(
    "click",
    placerPictogramme
);
/************************************************************
 * Priorite
 ************************************************************/

document
.querySelectorAll(".priorite")
.forEach(btn => {

    btn.addEventListener("click", () => {

        console.log("clic priorité");

    });

});

const prioNord =
    document.getElementById("prioHaut");

const prioEst =
    document.getElementById("prioDroite");

const prioSud =
    document.getElementById("prioBas");

const prioOuest =
    document.getElementById("prioGauche");

/************************************************************
 * SAUVEGARDE DU CROQUIS
 ************************************************************/

function sauvegarderCroquis() {

    intervention.dessinCroix  =
        canvas.toDataURL("image/png");

    sauvegarderIntervention();
}

/************************************************************
 * PRIORITÉS
 ************************************************************/

const valeursPriorite = [
    "?",
    "I",
    "II",
    "III",
    "IV"
];

canvas.addEventListener("pointerdown", debutDessin);
canvas.addEventListener("pointermove", dessiner);
canvas.addEventListener("pointerup", finDessin);
canvas.addEventListener("pointerleave", finDessin);



/************************************************************
 * RESTAURATION DES PRIORITÉS
 ************************************************************/

prioNord.textContent =
    intervention.priorites?.nord || "?";

prioEst.textContent =
    intervention.priorites?.est || "?";

prioSud.textContent =
    intervention.priorites?.sud || "?";

prioOuest.textContent =
    intervention.priorites?.ouest || "?";

/************************************************************
 * GESTION DES CLICS
 ************************************************************/

function gererPriorite(
    bouton,
    direction
) {

    bouton.addEventListener(
        "click",
        () => {

            let index =
                valeursPriorite.indexOf(
                    bouton.textContent
                );

            index++;

            if (
                index >=
                valeursPriorite.length
            ) {
                index = 0;
            }

            bouton.textContent =
                valeursPriorite[index];

            intervention.priorites[
                direction
            ] =
                bouton.textContent;

            sauvegarderIntervention();
        }
    );
}

gererPriorite(
    prioNord,
    "nord"
);

gererPriorite(
    prioEst,
    "est"
);

gererPriorite(
    prioSud,
    "sud"
);

gererPriorite(
    prioOuest,
    "ouest"
);

/************************************************************
 * EFFACEMENT DU CROQUIS
 ************************************************************/
function effacerCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    dessinerCroix();

    intervention.dessinCroix  = "";

    sauvegarderIntervention();
}


function terminerInterventionCourante(){

    if(
        !confirm(
            "L'intervention est-elle réellement terminée ?"
        )
    ){
        return;
    }

    intervention.statut =
        "terminee";

    intervention.dateFinIntervention =
        new Date().toISOString();

    sauvegarderIntervention();

    alert(
        "Intervention marquée comme terminée."
    );

    window.location.href =
        "../index.html";
}

function placerPictogramme(e){

    if(!pictogrammeSelectionne){

        return;
    }

    const pos =
        getCanvasPosition(
            canvas,
            e
        );

    console.log("intervention :", intervention);

    if(!intervention.pictogrammes){

        console.log(
            "Création du tableau pictogrammes"
        );

        intervention.pictogrammes = [];
    }

    //intervention.pictogrammes.push({

    //    code:
    //        pictogrammeSelectionne.code,

    //    icone:
    //        pictogrammeSelectionne.icone,

    //    x: pos.x,

    //    y: pos.y

    //});
    const pictogramme = {

        code:
            pictogrammeSelectionne.code,

        icone:
            pictogrammeSelectionne.icone,

        x: pos.x,

        y: pos.y

    };
    if(
        pictogrammeSelectionne.code
        === "R+X"
    ){

        pictogramme.valeur =
            prompt(
                "Niveau ?\n\nExemples :\nRDC\nR+1\nR+2\nSS-1"
            );

    }
    intervention.pictogrammes.push(
        pictogramme
    );


    sauvegarderIntervention();
    dessinerCroix();
    afficherPictogrammesCroix();
}

function afficherPictogrammesCroix(){

    if(!intervention.pictogrammes){
        return;
    }

    ctx.font =
        "22px Arial";

    intervention.pictogrammes.forEach(p => {

        let texte =
            p.icone;

        if(
            p.code === "R+X"
            &&
            p.valeur
        ){

            texte +=
                " " +
                p.valeur;

        }

        ctx.fillText(
            texte,
            p.x,
            p.y
        );

    });

}

afficherPictogrammes();

console.log("croix.js chargé");
verifierSession();

window.addEventListener(
    "DOMContentLoaded",
    afficherInterventions
);

document
.getElementById(
    "afficherCloturees"
)
.addEventListener(
    "change",
    afficherInterventions
);

document.addEventListener(
    "click",
    function(event){

        if(
            !event.target.classList.contains(
                "btnSupprimer"
            )
        ){
            return;
        }

        supprimerIntervention(
            event.target.dataset.id
        );
    }
);
document.addEventListener(
    "click",
    function(event){

        if(
            !event.target.classList.contains(
                "btnCloturer"
            )
        ){
            return;
        }

        cloturerIntervention(
            event.target.dataset.id
        );
    }
);
document.addEventListener(
    "click",
    function(event){

        if(
            !event.target.classList.contains(
                "btnReprendre"
            )
        ){
            return;
        }

        const numero =
            event.target.dataset.id;

        setInterventionActive(
            numero
        );

        window.location.href =
            "pages/croix-decisionnelle.html";
    }
);
document.addEventListener(
    "click",
    function(event){

        if(
            !event.target.classList.contains(
                "btnTerminer"
            )
        ){
            return;
        }

        terminerIntervention(
            event.target.dataset.id
        );
    }
);
document.addEventListener(
    "click",
    function(event){

        if(
            !event.target.classList.contains(
                "btnManagement"
            )
        ){
            return;
        }

        ManagementIntervention(
            event.target.dataset.id
        );
    }
);
document.addEventListener(
    "click",
    function(event){

        if(
            !event.target.classList.contains(
                "btnPdf"
            )
        ){
            return;
        }

        RapportIntervention(
            event.target.dataset.id
        );
    }
);
document.addEventListener(
    "click",
    function(event){

        if(
            !event.target.classList.contains(
                "btnConsulter"
            )
        ){
            return;
        }

        ConsulterIntervention(
            event.target.dataset.id
        );
    }
);

document
.getElementById("filtreType")
.addEventListener(
    "change",
    afficherInterventions
);


function afficherInterventions(){

    const container =
        document.getElementById(
            "listeInterventions"
        );

    if(!container){
        return;
    }

    const interventions =
        chargerInterventions();

    interventions.sort((a, b) => b.numero - a.numero);

    const filtreType =
        document
        .getElementById("filtreType")
        .value;

    const resultat =
        interventions.filter(x => {

            if(
                filtreType === ""
            ){
                return true;
            }

            return (
                x.type ===
                filtreType
            );

        });

        const enCours =
            resultat.filter(
                x => x.statut === "enCours"
            );

        const terminees =
            resultat.filter(
                x => x.statut === "terminee"
            );

        const cloturees =
            resultat.filter(
                x => x.statut === "cloturee"
            );

    const afficherCloturees =
        document
        .getElementById(
            "afficherCloturees"
        )
        .checked;

    container.innerHTML = "";

    enCours.forEach(
        intervention => {

            ajouterIntervention(
                intervention,
                container
            );

        }
    );
    terminees.forEach(
        intervention => {

            ajouterIntervention(
                intervention,
                container
            );

        }
    );

    if(afficherCloturees){

        cloturees.forEach(
            intervention => {

                ajouterIntervention(
                    intervention,
                    container
                );

            }
        );
    }
}
function ajouterIntervention(
    intervention,
    container
){

    const div =
        document.createElement("div");

    div.className =
        "intervention-card";

const badge =
    intervention.statut === "enCours"
        ? "🟢"
        : intervention.statut === "terminee"
            ? "🟡"
            : "🔴";

    div.innerHTML = `

        <div class="ligne1">

            <span class="numero">
                ${badge} ${intervention.numero}
            </span>

            <span class="type">
                ${intervention.type}
            </span>

            <span class="date">
                ${formaterDate(
                    intervention.dateOuverture
                )}
            </span>

        </div>

        <div class="ligne2">

            ${
                intervention.statut === "enCours"
                ?
                `
                <button
                    data-id="${intervention.numero}"
                    class="btnReprendre">

                    Reprendre

                </button>

                <button
                    data-id="${intervention.numero}"
                    class="btnTerminer">

                    Terminer

                </button>

                <button
                    data-id="${intervention.numero}"
                    class="btnSupprimer">

                    Supprimer

                </button>
                `
                :
                intervention.statut === "terminee"
                ?
                `
                <button
                    data-id="${intervention.numero}"
                    class="btnManagement">

                    Management

                </button>

                <button
                    data-id="${intervention.numero}"
                    class="btnPdf">

                    PDF

                </button>

                <button
                    data-id="${intervention.numero}"
                    class="btnCloturer">

                    Clôturer

                </button>
                `
                :
                `
                <button
                    data-id="${intervention.numero}"
                    class="btnConsulter">

                    Consulter

                </button>

                <button
                    data-id="${intervention.numero}"
                    class="btnPdf">

                    PDF

                </button>
                `
            }

        </div>

    `;
    if(
        intervention.statut ===
        "cloturee"
    ){
        div.classList.add(
            "intervention-cloturee"
        );
    }
    container.appendChild(div);
}
function formaterDate(date){

    return new Date(date)
        .toLocaleString(
            "fr-CH"
        );
}
function supprimerIntervention(numero)
{

    if(
        !confirm(
            "Supprimer cette intervention ?"
        )
    ){
        return;
    }

    let interventions =
        chargerInterventions();

    interventions =
        interventions.filter(
            x =>
            x.numero != numero
        );

    sauvegarderInterventions(
        interventions
    );
    afficherInterventions();
}
function cloturerIntervention(numero){

console.log(
            "Bouton cliqué :",
            event.target
        );

    const interventions = chargerInterventions();

    intervention = interventions.find(
            x =>  Number(x.numero) === Number(numero)
    );

    intervention.statut = "cloturee";

    intervention.dateFermeture =
        new Date().toISOString();

    sauvegarderInterventions(
        interventions
    );

    afficherInterventions();
}
function terminerIntervention(numero){


console.log(
            "Bouton cliqué :",
            event.target
        );

    const interventions =
        chargerInterventions();

    const intervention =
        interventions.find(
            x => x.numero == numero
        );

    if(!intervention){
        return;
    }

    intervention.statut =
        "terminee";

    intervention.dateFinIntervention =
        new Date().toISOString();

    sauvegarderInterventions(
        interventions
    );
    afficherInterventions();
}
function ManagementIntervention(numero){

    setInterventionActive(
        numero
    );

    window.location.href =
        "pages/croix-decisionnelle.html";
}
function RapportIntervention(numero){
    console.log("PDF");
}
function ConsulterIntervention(numero){
    console.log("Consulter");
}
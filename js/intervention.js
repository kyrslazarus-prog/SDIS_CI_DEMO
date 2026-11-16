
let intervention = {
    numero: "",
    dateOuverture:  "",
    dateFermeture: "",
    statut: "",
    type: "",
    priorites: {
        nord: "?",
        est: "?",
        sud: "?",
        ouest: "?"
    },
    constatations: "",
    mesuresPrises: "",
    dessinCroix:"",
    dessinCroquis: "",
    contacts: []
};


function creerNouvelleIntervention(type){
    return {
        numero: prochainNumeroIntervention(),
        dateOuverture: new Date().toISOString(),
        statut: "enCours",
        type: type,
        priorites: {
            nord: "?",
            est: "?",
            sud: "?",
            ouest: "?"
        },
        croquis: ""
    };
}
function chargerIntervention()
{

    const numero = parseInt(getInterventionActive());
    const interventions = chargerInterventions();

    intervention = interventions.find(
            x =>  Number(x.numero) === Number(numero)
        );
    
    if(!intervention){

        alert(
            "Intervention introuvable"
        );

        return;
    }
}
function sauvegarderIntervention(){

    const interventions =
        chargerInterventions();

    const index =
        interventions.findIndex(
            x =>
            x.numero ===
            intervention.numero
        );

    interventions[index] =
        intervention;

    sauvegarderInterventions(interventions);
}
function creerIntervention(){

    const type = document.getElementById("typeIntervention").value;
    const nouvelle = creerNouvelleIntervention(type);
    const interventions = chargerInterventions();

    interventions.push(nouvelle);

    console.log("Type choisi = ",type);
    console.log("Intervention avant sauvegarde = ",nouvelle);

    sauvegarderInterventions(interventions);
    setInterventionActive(nouvelle.numero);
    window.location.href = "croix-decisionnelle.html";
}
function reprendreIntervention(numero)
{
    setInterventionActive(numero);
    window.location.href = "pages/croix-decisionnelle.html";
}
console.log("Intervention.js chargé");
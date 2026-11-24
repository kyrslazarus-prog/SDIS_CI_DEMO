function sauvegarder(cle, valeur){

    localStorage.setItem(
        cle,
        JSON.stringify(valeur)
    );
}
function charger(cle){

    const valeur =
        localStorage.getItem(cle);

    if(!valeur) return null;

    return JSON.parse(valeur);
}
function chargerInterventions(){

    const donnees =
        localStorage.getItem(
            "interventions"
        );

    if(!donnees){
        return [];
    }

    return JSON.parse(donnees);
}
function sauvegarderInterventions(interventions)
{
    localStorage.setItem(
        "interventions",
        JSON.stringify(
            interventions
        )
    );
}
function getInterventionActive(){

    return  Number( localStorage.getItem("interventionActive"));
}
function setInterventionActive(numero)
{
    localStorage.setItem(
        "interventionActive",
        numero
    );
}
function prochainNumeroIntervention(){

    let numero =
        parseInt(
            localStorage.getItem(
                "dernierNumeroIntervention"
            ) || "0"
        );

    numero++;

    localStorage.setItem(
        "dernierNumeroIntervention",
        numero
    );

    return numero;
}


console.log("Storage.js chargé");
verifierSession();

function getCurrentUser(){

    return JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );
}

function verifierSession(){
    return true;
    const user =
        getCurrentUser();

    if(!user){

        window.location.href =
            "login.html";
    }
}

function seDeconnecter(){

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "login.html";
}
function afficherUtilisateur(){

    const user =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

    console.log(user);

    const element =
        document.getElementById(
            "currentUser"
        );

    console.log(element);

    if(user && element){

        element.textContent =
            `${user.login} (${user.role})`;
    }
}
document.addEventListener(
    "DOMContentLoaded",
    afficherUtilisateur
);
console.log("Session.js chargé");
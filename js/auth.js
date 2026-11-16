// Comptes de test


function seConnecter(){

    const login =
        document.getElementById(
            "login"
        ).value;

    const password =
        document.getElementById(
            "password"
        ).value;

    const user =
        USERS.find(
            x =>
                x.login === login &&
                x.password === password
        );

    if(!user){

        alert(
            "Identifiants incorrects"
        );

        return;
    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    window.location.href =
        "index.html";
}
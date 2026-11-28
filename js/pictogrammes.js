let pictogrammeSelectionne = null;

const PICTOGRAMMES = {
    commun: [

        {
            code: "VIC",
            icone: "👤",
            libelle: "Victime"
        },

        {
            code: "ACC",
            icone: "🚪",
            libelle: "Accès"
        },

        {
            code: "ELE",
            icone: "⚡",
            libelle: "Danger électrique"
        },

        {
            code: "R+X",
            icone: "🏢",
            libelle: "Niveau"
        }

    ],

    feu: [

        {
            code: "FEU",
            icone: "🔥",
            libelle: "Foyer principal"
        },

        {
            code: "FUM",
            icone: "💨",
            libelle: "Fumées"
        },

        {
            code: "DEV",
            icone: "💥",
            libelle: "Développement"
        }

    ],

    inondation: [

        {
            code: "EAU",
            icone: "💧",
            libelle: "Présence d'eau"
        },

        {
            code: "PROP",
            icone: "🌊",
            libelle: "Propagation"
        }

    ],

    sauvetage: [

        {
            code: "VIC",
            icone: "👤",
            libelle: "Victime"
        },

        {
            code: "SAUV",
            icone: "🛟",
            libelle: "Sauvetage"
        }

    ]

};

function obtenirPictogrammes(){

    const type =
        intervention.type
            .toLowerCase();

    return [

        ...PICTOGRAMMES.commun,

        ...(PICTOGRAMMES[type] || [])

    ];

}

function afficherPictogrammes(){

    const container =
        document.getElementById(
            "listePictogrammes"
        );

    if(!container){
        return;
    }

    container.innerHTML = "";

    const liste =
        obtenirPictogrammes();

    liste.forEach(picto => {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "picto";

        div.dataset.code =
            picto.code;

        div.innerHTML = `

            <div class="picto-icone">
                ${picto.icone}
            </div>

            <div class="picto-code">
                ${picto.code}
            </div>

        `;

        div.addEventListener(
            "click",
            () => {
                selectionnerPictogramme(
                    picto,
                    div
                );
            }
        );

        container.appendChild(div);

    });

}

function selectionnerPictogramme(
    picto,
    element
){

    document
        .querySelectorAll(".picto")
        .forEach(x => {

            x.classList.remove(
                "selectionne"
            );

        });

    element.classList.add(
        "selectionne"
    );

    pictogrammeSelectionne =
        picto;

    console.log(
        "Sélection :",
        picto.code
    );
}
// ====================================================
// Version de l'application
// ====================================================

const VERSION =
    "0.8.0-beta";

const APP_NAME =
    "CI Assistant";
// ====================================================
// Affichage automatique
// ====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .querySelectorAll(".version")
            .forEach(element => {

                element.textContent =
                    `CI Assistant v${VERSION}`;

            });
    }
);

console.log(
    `${APP_NAME} ${VERSION}`
);


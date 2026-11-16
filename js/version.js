// ====================================================
// Version de l'application
// ====================================================

const VERSION =
    "0.6.1-beta";

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
    `CI Assistant v${VERSION}`
);
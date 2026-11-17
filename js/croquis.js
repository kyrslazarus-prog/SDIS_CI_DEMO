chargerIntervention();

const titre =
    document.getElementById(
        "titreCroquis"
    );

titre.textContent =
    `Croquis intervention #${intervention.numero}`;

const canvas =
    document.getElementById(
        "croquisCanvas"
    );

const ctx =
    canvas.getContext("2d");

let dessin = false;

if(intervention.dessinCroquis){

    const image =
        new Image();

    image.onload = () => {

        ctx.drawImage(
            image,
            0,
            0
        );

    };

    image.src =
        intervention.dessinCroquis;
}

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

function debutDessin(e){

    dessin = true;

    ctx.beginPath();

    const pos =
        getCanvasPosition(
            canvas,
            e
        );

    ctx.lineTo(
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

    if(!dessin){

        return;
    }

    dessin = false;

    intervention.dessinCroquis =
        canvas.toDataURL(
            "image/png"
        );

    sauvegarderIntervention();
}

function effacerCroquis(){

    if(
        !confirm(
            "Effacer le croquis ?"
        )
    ){
        return;
    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    intervention.dessinCroquis = "";

    sauvegarderIntervention();
}
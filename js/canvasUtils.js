function getCanvasPosition(
    canvas,
    event
){

    const rect =
        canvas.getBoundingClientRect();

    return {

        x:
            (event.clientX - rect.left)
            * canvas.width
            / rect.width,

        y:
            (event.clientY - rect.top)
            * canvas.height
            / rect.height
    };
}
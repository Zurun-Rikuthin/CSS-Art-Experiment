function getPixelIdFromCoordinates(y_coord, x_coord) {
    let y_coordinate = String(y_coord);
    let x_coordinate = String(x_coord);

    // pixelID format is "pixel_YYY_XXX"
    while (y_coordinate.length < 3) {
        y_coordinate = '0' + y_coordinate;
    }
    while (x_coordinate.length < 3) {
        x_coordinate = '0' + x_coordinate;
    }

    return `pixel_${y_coordinate}_${x_coordinate}`
}

function getCoordinatesFromPixelId(pixelID) {
    y_coordinate = pixelID.slice(6, 9);
    x_coordinate = pixelID.slice(10, 13);

    return (y_coordinate, x_coordinate);
}

// Accepts integer y and x coordinates and the pixel's colour then creates new pixel with those properties within the canvas
function createPixel(y_coord, x_coord, colour) {
    let canvas = document.getElementById("canvas");
    let pixedID = getPixelIdFromCoordinates(y_coord, x_coord);
    let formattedCoordinates = getCoordinatesFromPixelId(pixedID);

    canvas.innerHTML += `<div id="${pixedID}" class="pixel" style="background-color: ${colour}; grid-area: ${y_coordinate} / ${x_coordinate} / ${y_coordinate} / ${x_coordinate}"; ></div>`
}

// If the target pixel exists, then update it's colour, otherwise create it from scratch with the desired colour
// Colour must be provided in "rgb(rrr, ggg, bbb)" format
function updatePixel(pixelID, newColour) {
    let currPixel = document.getElementById(pixelID);

    if (typeof (currPixel) != 'undefined' && currPixel != null) {
        currPixel.style.backgroundColor = newColour;
    } else {
        createPixel(pixelID, newColour);
    }
}

// Loads in all pixels set to white.
function resetCanvas(numRows, numColumns) {
    for (let y = 1; y <= numRows; y++) {
        for (let x = 1; x <= numColumns; x++) {
            updatePixel(y, x, "rgb(204, 204, 255)");
        }
    }
}

// Wipes all pixels from the canvas and changes the amount of pixels that comprise the canvas
function updateCanvasResolution(numRows, numColumns) {
    console.log(`Updating canvas resolution to ${numRows} rows x ${numColumns} columns...`);
    let canvas = document.getElementById("canvas");

    canvas.innerHTML = "";
    canvas.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;

    resetCanvas(numRows, numColumns);
}

// Reads in a json file (or some other format, not sure yet)
function loadCanvasFromFile(file) { }

updateCanvasResolution(50, 50);
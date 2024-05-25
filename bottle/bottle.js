img = "";
statu = "";
object = [];

function preload() {
    img = loadImage("bottle.jpg");
}

function setup() {
    canvas = createCanvas(640,420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("model Loaded");
    statu = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (statu != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%" , object[i].x , object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x + 15 , object[i].y + 15 , object[i].width , object[i].height);
        }
    }
}
cancion='';
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;

function setup(){
    video=createCapture(VIDEO);
    video.hide();
    canvas=createCanvas(600,500);
    canvas.center();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function preload(){
    cancion=loadSound('music.mp3'); 
}
function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#b58222");

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        cancion.setVolume(volume);
    }
}
function play(){
    cancion.play();
    cancion.setVolume(1);
    cancion.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX +" rightWristY = "+ rightWristY);
    }
}
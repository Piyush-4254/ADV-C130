song="";
LeftWristX=0;
LeftWristY=0;
RightWristX=0;
RightWristY=0;
scoreLeftwrist=0;
scoreRightwrist=0;

function preload()
{
song = loadSound("starboy.mp3");
}

function setup()
{
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelloaded);
poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,500);

    fill("red");
    stroke("red");


if(scoreRightwrist > 0.2)
{
    circle(RightWristX,RightWristY,20);
    if(RightWristY >0 && RightWristY <=100)
    {
        song.rate(0.5);
        document.getElementById("speed").innerHTML = "Speed =0.5x";
    }
    else if(RightWristY >100 && RightWristY <=200)
    {
        song.rate(1);
        document.getElementById("speed").innerHTML = "Speed =1x";
    }
    else if(RightWristY >200 && RightWristY <=300)
    {
        song.rate(1.5);
        document.getElementById("speed").innerHTML = "Speed =1.5x";
    }
    else if(RightWristY >300 && RightWristY <=400)
    {
        song.rate(2);
        document.getElementById("speed").innerHTML = "Speed =2x";
    }
    else if(RightWristY >400 && RightWristY <=500)
    {
        song.rate(2.5);
        document.getElementById("speed").innerHTML = "Speed =2.5x";
    }
}

    if(scoreLeftwrist > 0.2)
    {
    circle(LeftWristX,LeftWristY,20);
    innumberleftwristy = Number(LeftWristY);
    remove_decimals = floor(innumberleftwristy);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "VOLUME = "+volume; 
    song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelloaded(){
    console.log("PoseNet model is loaded");
}

function gotPoses(results)
{
if(results.length > 0 )
{
    console.log(results);

    scoreLeftwrist = results[0].pose.keypoints[9].score;
    console.log("scoreleftewrist = "+scoreLeftwrist);

    scoreRightwrist = results[0].pose.keypoints[10].score;
    console.log("scorerightwrist = "+scoreRightwrist);

    LeftWristX = results[0].pose.leftWrist.x;
    LeftWristY = results[0].pose.leftWrist.y;
    console.log("leftwristx = "+LeftWristX);
    console.log("leftwristy = "+LeftWristY);

    RightWristX = results[0].pose.rightWrist.x;
    RightWristY = results[0].pose.rightWrist.y;
    console.log("rightwristx = "+RightWristX);
    console.log("rightwristy = "+RightWristY);


}


}
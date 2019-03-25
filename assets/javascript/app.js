
var timerInterval; //reference to the interval
var time;
var corrects;
var incorrects;

var audioClick = new Audio("assets/audio/click.mp3");
var audioWin = new Audio("assets/audio/win.mp3");
var audioLose = new Audio("assets/audio/lose.mp3");


var questions = [
    {
        question: "Pac-Man was originally going to be known as what?",
        possibleAnswers: ["Puckman", "Discman", "Pizzaman", "Greedyman"],
        correctAnswer: "Puckman"
    }, 
    {
        question: "Which Atari game was so bad, it was taken offsale and buried in a Mexican desert?",
        possibleAnswers: ["Breakout", "Pong", "E.T. The Extraterrestrial", "Yars Reveng"],
        correctAnswer: "E.T. The Extraterrestrial"
    }, 
    {
        question: "The original Contra was famous for creating which cheat code?",
        possibleAnswers: ["Nintendo Code", "The UbiCode", "The Konami Code", "The Nes Code"],
        correctAnswer: "The Konami Code"
    },
    {
        question: "Which famous series was the first to feature cutscenes?",
        possibleAnswers: ["Teenage Mutant Ninja Turtles", "Bubble Bobble", "Ghosts and Goblins", "Ninja Gaiden"],
        correctAnswer: "Ninja Gaiden"
    }];

    
var count;

$("#start-game").on("click", StartGame);
$("#replay-game").on("click", StartGame);
$(".answer").on("click", SelectAnswer);

function StartGame() {
    count = 0;
    corrects = 0;
    incorrects = 0;

    $("#ingame").attr("style", "display: none;");
    $("#menu").attr("style", "display: block;");
    $("#inter").attr("style", "display: none;");
    $("#endgame").attr("style", "display: none;");

    CreateQuestion();
}

function CreateQuestion() {
    if(count == questions.length){
        clearInterval(timerInterval);
        ShowEnding();
        return;
    }
    var question = questions[count].question;
    $("#question").text(question);
    SetupAnswers();
    $("#ingame").attr("style", "display: block;");
    $("#menu").attr("style", "display: none;");
    $("#inter").attr("style", "display: none;");
    time = 30;
    $("#timer").text(time + " seconds left!");
    timerInterval = setInterval(Timer, 1000);

}
function SetupAnswers() {
    PlayClickAudio();
    $(".answer").each(function (index) {
        $(this).text(questions[count].possibleAnswers[index]);
        $(this).attr("value", questions[count].possibleAnswers[index]);
    })
}

function PlayClickAudio(){
    audioClick.pause();
    audioClick.currentTime = 0;
    audioClick.play();
}

function SelectAnswer() {
    PlayClickAudio();
    var value = $(this).attr("value");
    count++;
    clearInterval(timerInterval);
    if (value == questions[count - 1].correctAnswer) {
        ShowWinResult();
    } else {
        ShowLooseResult();
    }
}

function Timer() {
    time--;
    $("#timer").text(time + " seconds left!");

    if (time == 0) {
        clearInterval(timerInterval);
        count++;
        ShowTimeOutResult();
    }
}

function ShowTimeOutResult() {
    incorrects++;
    
    audioLose.pause();
    audioLose.currentTime = 0;
    audioLose.play();
    $("#ingame").attr("style", "display: none;");
    $("#menu").attr("style", "display: none;");
    $("#inter").attr("style", "display: block;");

    $("#inter-title").text("Time up! you didn't answered");
    $("#correct-answer").html("<h3>The correct answer was: <span class='main-color'>" + questions[count - 1].correctAnswer+"<span></h3>");
    $("#corrects").text("Correct answers: " + corrects);
    $("#incorrects").text("Incorrect answers: " + incorrects);
    setTimeout(CreateQuestion, 3 * 1000);
}

function ShowWinResult() {
    corrects++;

    audioWin.pause();
    audioWin.currentTime = 0;
    audioWin.play();

    $("#ingame").attr("style", "display: none;");
    $("#menu").attr("style", "display: none;");
    $("#inter").attr("style", "display: block;");

    $("#inter-title").text("That's correct, you win a point");
    $("#correct-answer").html("<h3>The correct answer was: <span class='main-color'>" + questions[count - 1].correctAnswer+"<span></h3>");
    $("#corrects").text("Correct answers: " + corrects);
    $("#incorrects").text("Incorrect answers: " + incorrects);
    setTimeout(CreateQuestion, 3 * 1000);
}

function ShowLooseResult() {
    incorrects++;

    audioLose.pause();
    audioLose.currentTime = 0;
    audioLose.play();

    $("#ingame").attr("style", "display: none;");
    $("#menu").attr("style", "display: none;");
    $("#inter").attr("style", "display: block;");

    $("#inter-title").text("That's incorrect, you loose a point");
    $("#correct-answer").html("<h3>The correct answer was: <span class='main-color'>" + questions[count - 1].correctAnswer+"<span></h3>");
    $("#corrects").text("Correct answers: " + corrects);
    $("#incorrects").text("Incorrect answers: " + incorrects);
    setTimeout(CreateQuestion, 3 * 1000);
}

function ShowEnding() {
    $("#ingame").attr("style", "display: none;");
    $("#menu").attr("style", "display: none;");
    $("#inter").attr("style", "display: none;");
    $("#endgame").attr("style", "display: block;");

    console.log( $("#correctsEnd"));
    $("#correctsEnd").text("Correct answers: " + corrects);
    $("#incorrectsEnd").text("Incorrect answers: " + incorrects);
}

//BACKGROUND MOVEMENT STUFF---------------------------------
    var x = 0;
    setInterval(function(){
        x-=1;
        $('body').css('background-position', x + 'px 0');
    }, 90);

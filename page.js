import { amharicAlphabetList, shuffleToCopy } from "./amharicAlphabet.js";

const questionTypeEnum = {
    FIND_THE_SOUND: 0,
    FIND_THE_LETTER: 1, 
};

const levelData = {
    level: 1,
    question: 1,
    alphabetList: [],
    questionType: 0,
    currentAnswer: 0
};

const buttons = [
    "ans_a",
    "ans_b",
    "ans_c",
    "ans_d"
];

const prefixes = ["a. ", "b. ", "c. ", "d. "];

function getIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLetter() {
    let randIndex = getIntRange(0, levelData.alphabetList.length - 1);
    let randVowel = getIntRange(0, 5); // 6 total vowels

    return levelData.alphabetList[randIndex].letters[randVowel];
}

function getRandomAnswer() {
    let randLetter = getRandomLetter();

    if (levelData.questionType == questionTypeEnum.FIND_THE_SOUND) {
        return randLetter.sound;
    } 
    else if (levelData.questionType == questionTypeEnum.FIND_THE_LETTER) {
        return randLetter.name;
    } else {
        console.error("Invalid questionType");
    }
}

function setUpLevel() {
    levelData.alphabetList = shuffleToCopy(amharicAlphabetList); // Set up randomized alphabet ordering

    let buttonElements = document.getElementsByClassName("answers");

    let answer = setUpQuestion();

    for (let button of buttonElements) {
        button.addEventListener("click", function () {

            if (button.dataset.answer === levelData.currentAnswer) {
                console.log("You selected the correct answer!");
            } else {
                console.log("The answer was incorrect, the correct answer was " + levelData.currentAnswer);
            }

            nextQuestion();
        });
    }
}

function getRandLetterWithVowel(vowel) {
    return levelData.alphabetList[levelData.question - 1].letters[vowel];
}

function setAnswers(answer) {
    let correctAnswerIndex = getIntRange(0, 3);

    let used = new Set();
    used.add(answer);

    for (let i = 0; i < buttons.length; i++) {
        let button = document.getElementById(buttons[i]);

        let value;

        if (i === correctAnswerIndex) {
            value = answer;
        } else {
            do {
                value = getRandomAnswer();
            } while (used.has(value));

            used.add(value);
        }

        button.textContent = prefixes[i] + value;
        button.dataset.answer = value;

        button.style.backgroundColor = ""; // reset color (important for next question)
    }
}

function setUpQuestion() {
    let answer = setQuestionData();
    levelData.currentAnswer = answer;
    setAnswers(answer);

    return answer;
}

function nextQuestion() {
    levelData.question++;
    setUpQuestion();
}

// Happens every question and sets up how the question is asked and returns the answer
function setQuestionData() {
    levelData.questionType = getIntRange(0, 1);

    let questionText = "";
    let vowel = 0;

    if (levelData.level == 1) {
        vowel = 0;
    } else {
        vowel = getIntRange(0, 5);
    }

    let letterObj = getRandLetterWithVowel(vowel);
    let answer = "";

    console.log(levelData.questionType);

    // Set question type
    if (levelData.questionType == questionTypeEnum.FIND_THE_SOUND) {
        questionText = "What sound does this letter make? " + letterObj.name;
        answer = letterObj.sound;
    }
    else if (levelData.questionType == questionTypeEnum.FIND_THE_LETTER) {
        questionText = "what letter is associated with this sound? " + letterObj.sound;
        answer = letterObj.name;
    }
    else {
        console.error("Invalid questionType ID: " + levelData.questionType);
    }

    document.getElementById("question").textContent = questionText;

    return answer;
}

document.getElementById("questionNum").textContent = "Question " + levelData.question;

setUpLevel();
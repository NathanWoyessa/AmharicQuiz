import { amharicAlphabetList, shuffleToCopy } from "./amharicAlphabet.js";

const questionTypeEnum = {
    FIND_THE_SOUND: 0,
    FIND_THE_LETTER: 1, 
};

const buttons = [
    "ans_a",
    "ans_b",
    "ans_c",
    "ans_d"
];

function getIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buttonEventClick(levelData, event) {
    const button = event.target;
    if (levelData.checkIfCorrectButton(Number(button.dataset.buttonId))) {
        console.log("correct answer!");
        levelData.scoreData.addAnsweredQuestion(true);
    }
    else {
        console.log("incorrect answer");
        levelData.scoreData.addAnsweredQuestion(false);
        button.style.backgroundColor = "red";

        levelData.wrongAnswers.push(
            {answer: levelData.getButtonData(Number(button.dataset.buttonId)), questionType: levelData.questiontype}
        );
    }

    levelData.showCorrectButton();

    document.getElementById("continue").disabled = false;

    levelData.setAnswerButtonsDisabledStatus(true);

    //levelData.nextQuestion(); // Make sure this is called after
}

class scoring {
    highestStreak = 0;
    currentStreak = 0;
    totalQuestionsCount = 0;
    questionsCorrect = 0;


    getAmountOfIncorrectQuestions() {
        return this.totalQuestionsCount - this.questionsCorrect;
    }

    getCorrectAccuacy() {
        return Math.round((this.questionsCorrect / this.totalQuestionsCount) * 100);
    }

    calculateFinalScore() {
        return this.getCorrectAccuacy() * this.highestStreak;
    }

    addAnsweredQuestion(answerStatusBool) {
        this.totalQuestionsCount++;
        if (answerStatusBool === true) {
            this.questionsCorrect++;
            this.currentStreak++;

            if (this.currentStreak > this.highestStreak) {
                this.highestStreak = this.currentStreak; // Set new highest streak
            }
        } else {
            this.currentStreak = 0;
        }
    }
}

class levelData {
    levelNumber = 1;

    questionNumber = 0;
    questiontype = questionTypeEnum.FIND_THE_SOUND;
    amharicRandomizedAlphabet = [];

    question = null;
    correctAnswer = null;
    correctButton = 0;
    maxQuestions = 20;
    secondsPassed = 0;

    scoreData = new scoring();

    buttonsData = []; // The array storing the data in each button

    wrongAnswers = [];

    handler = (event) => { buttonEventClick(this, event); };

    getButtonData(buttonId) {
        return this.buttonsData[buttonId];
    }

    checkIfCorrectButton(buttonId) {
        return this.getButtonData(buttonId) === this.correctAnswer;
    }

    showCorrectButton() {
        for (let i = 0; i < this.buttonsData.length; i++) {
            let button = this.getButton(i);

            if (this.checkIfCorrectButton(i)) {
                button.style.backgroundColor = "green";
            }
        }
    }

    resetButtonText(button, buttonNumber) {
        button.textContent = buttonNumber + ". ";
    }

    // Gets the randomized question letter via index with randomized vowel depending on the level
    getQuestionLetter(randomIndex) {
        let randVowel = 0;
        if (this.levelNumber > 1) {
            randVowel = getIntRange(0, 6);
        }
        return this.amharicRandomizedAlphabet[randomIndex][randVowel];
    }

    getTrueRandomLetter() {
        return this.getQuestionLetter(getIntRange(0, this.amharicRandomizedAlphabet.length - 1));
    }

    getRandomFalseAnswer() {
        let randButtonAnswer = "";

        // Loop ensures the false answer never becomes the correct one or another false duplicate
        do {
            if (this.questiontype == questionTypeEnum.FIND_THE_SOUND) {
                randButtonAnswer = this.getTrueRandomLetter().sound;
            }
            else if (this.questiontype == questionTypeEnum.FIND_THE_LETTER) {
                randButtonAnswer = this.getTrueRandomLetter().name;
            } 
            else {
                console.error("Invalid questionType" + this.questiontype);
            }
        } while (randButtonAnswer === this.correctAnswer || this.buttonsData.includes(randButtonAnswer)); 

        console.assert(!this.buttonsData.includes(randButtonAnswer));

        return randButtonAnswer;
    }

    getButton(buttonId) {
        return document.getElementById(buttons[buttonId]);
    }

    #setButtonEventHandlers() {
        let buttons = document.getElementsByClassName("answers");

        for (let i = 0; i < buttons.length; i++) {
            let button = this.getButton(i);

            button.dataset.buttonId = i;

            this.resetButtonText(button, i + 1);

            button.addEventListener("click", this.handler);
        }
    }

    setAnswerButtonsDisabledStatus(staus) {
        let buttons = document.getElementsByClassName("answers");

        for (let button of buttons) {
            button.disabled = staus;
        }
    }

    #setUpContinueButton() {
        let button = document.getElementById("continue");
        button.disabled = true;

        button.addEventListener("click", () => {
            button.disabled = true; // Disable after clicking
            this.setAnswerButtonsDisabledStatus(false);
            this.nextQuestion();
            console.log("continue button pressed");
        });


    }

    #setUpButtonColors() {
        let buttons = document.getElementsByClassName("answers");

        for (let button of buttons) {
            button.style.backgroundColor = ""; // Reset to default color
        }   
    }

    // Happens every new question, callbacks should be done once before level starts
    setButtons() {
        let randomLetterIndex = 0;

        this.#setUpButtonColors();

        this.correctButton = getIntRange(0, 3);

        this.buttonsData.length = 4;

        for (let i = 0; i < 4; i++) {
            let button = this.getButton(i);
            this.resetButtonText(button, i + 1); // Always reset button text before setting question to not accumulate text

            if (i === this.correctButton) {
                button.textContent += this.correctAnswer;
                this.buttonsData[i] = this.correctAnswer;
            } 
            else {

                let falseAnswer = this.getRandomFalseAnswer();

                button.textContent += falseAnswer;
                this.buttonsData[i] = falseAnswer;
            }
        }
    }

    getQuestion() {
        let questionText = "";
        let randLetter = this.getQuestionLetter(this.questionNumber);
        let question = "";
        
        if (this.questiontype === questionTypeEnum.FIND_THE_SOUND) {
            question = randLetter.name;

            questionText = "Which sound does this letter make? " + question;
            this.correctAnswer = randLetter.sound;
        } 
        else if (this.questiontype === questionTypeEnum.FIND_THE_LETTER) {
            question = randLetter.sound;

            questionText = "Which letter is associated with this sound? " + question;
            this.correctAnswer = randLetter.name;
        }
        else {
            console.error("Invalid question type" + this.questiontype);
        }

        document.getElementById("question").textContent = questionText;

        return question;
    }

    getTimeToPassLevel() {
        if (this.levelNumber === 1) {
            return this.amharicRandomizedAlphabet.length * 2.5; // Multipled by 3 for seconds per question
        } else if (this.levelNumber === 2) {
            return this.amharicRandomizedAlphabet.length * 1.5;
        } else if (this.levelNumber === 3) {
            return this.amharicRandomizedAlphabet.length * 1;
        } else {
            return this.amharicRandomizedAlphabet.length * (5 / this.levelNumber);
        }
    }

    finishLevel() {
        const percentage = document.createElement("p");
        const secondsPassed = document.createElement("p");

        const div = document.getElementById("results");

        percentage.textContent = "Your percentage was " + this.scoreData.getCorrectAccuacy();
        secondsPassed.textContent += "Finished in " + this.secondsPassed + " seconds";

        div.appendChild(percentage);
        div.appendChild(secondsPassed);


        if (this.secondsPassed <= this.getTimeToPassLevel()) {
            const finishMsg = document.createElement("p");
            finishMsg.textContent += "You have completed this test in the sufficient amount of time!";

            div.appendChild(finishMsg);
        }

        console.log("final score is " + this.scoreData.calculateFinalScore());

        for (let button of document.getElementsByClassName("answers")) {
            button.removeEventListener("click", this.handler);
            button.disabled = true;
        }
    }

    nextQuestion() {
        this.questionNumber++;

        console.log(this.questionNumber);
        if (this.questionNumber <= this.maxQuestions) {
            this.setQuestion();
        } else {
            // Finish level
            this.finishLevel();
        }
    }

    getQuestionsRemaining() {
        return this.maxQuestions - this.questionNumber;
    }

    setQuestion() {
        this.questiontype = getIntRange(0, 1); // Randomize the question type, MUST BE DONE BEFORE CALLING GET QUESTION

        this.question = this.getQuestion();
        console.log(this);

        // Set question and level number
        document.getElementById("questionNum").textContent = "Question " + this.questionNumber + ", level " + this.levelNumber + ", questions remaining " + this.getQuestionsRemaining();

        this.setButtons();
    }

    setLevel(levelNumber = 0) {
        this.levelNumber = levelNumber;
        this.questionNumber = 0;
        this.amharicRandomizedAlphabet = shuffleToCopy(amharicAlphabetList);
        this.startTimer();

        if (this.levelNumber === 1) {
            this.maxQuestions = (this.amharicRandomizedAlphabet.length - 1); // All base letters

        } else if (this.levelNumber === 2) {
            this.maxQuestions = this.maxQuestions = (this.amharicRandomizedAlphabet.length - 1) * 7; // All combinations

        } else if (this.levelNumber === 3) {

        } else if (this.levelNumber > 3) {

        } else {
            console.error("Invalid levelNumber: " + this.levelNumber);
        }

        this.#setButtonEventHandlers();
        this.#setUpContinueButton();


        this.nextQuestion();
    }

    startTimer() {
        let timer = setInterval(() => {
            this.secondsPassed++; // Callback that increments a timer every 1000 ms(1 second)
        }, 1000);
    }

}

const level = new levelData();

level.setLevel(1);
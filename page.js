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

class scoring {
    streak = 0;
    questionsCorrect = 0;

    getAmountOfIncorrectQuestions(totalQuestions) {
        return totalQuestions - this.questionsCorrect;
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

    scoreData = new scoring();

    buttonsData = []; // The array storing the data in each button

    resetButtonText(button, buttonNumber) {
        button.textContent = buttonNumber + ". ";;
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

    setButtons() {
        let randomLetterIndex = 0;

        this.correctButton = getIntRange(0, 3);

        for (let i = 0; i < 4; i++) {
            let button = this.getButton(i);
            this.resetButtonText(button, i + 1); // Always reset button text before setting question to not accumulate text
            this.buttonsData.length = 4;

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

    nextQuestion() {
        this.questionNumber++;

        if (this.questionNumber < this.maxQuestions) {
            this.setQuestion();
        } else {
            
        }
    }

    setQuestion() {
        this.questiontype = getIntRange(0, 1); // Randomize the question type, MUST BE DONE BEFORE CALLING GET QUESTION

        this.question = this.getQuestion();
        console.log(this);

        // Set question and level number
        document.getElementById("questionNum").textContent = "Question " + this.questionNumber + ", level " + this.levelNumber;

        this.setButtons();
    }

    setLevel(levelNumber = 0, maxLevels = 10) {
        this.levelNumber = levelNumber;
        this.questionNumber = 0;
        this.amharicRandomizedAlphabet = shuffleToCopy(amharicAlphabetList);
        this.maxQuestions = maxLevels;

        let buttons = document.getElementsByClassName("answers");

        let i = 0; // Start at 1 to have 1 based numbering for questions
        for (let button of buttons) {
            i++;
            this.resetButtonText(button, i + 1);

            button.addEventListener("click", () => {

                if (button.textContent.includes(this.correctAnswer)) {
                    console.log("correct answer!");
                }
                else {
                    console.log("incorrect answer");
                }

                this.nextQuestion(); // Make sure this is called after
            });
        }

        this.nextQuestion();
    }

}

const level = new levelData();

level.setLevel(0);
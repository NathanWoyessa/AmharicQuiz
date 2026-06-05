import { amharicAlphabetList, shuffleToCopy } from "./amharicAlphabet.js";

const questionTypeEnum = {
    FIND_THE_SOUND: 0,
    FIND_THE_LETTER: 1, 
};

function getIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class levelData {
    levelNumber = 0;

    questionNumber = 0;
    questiontype = questionTypeEnum.FIND_THE_SOUND;
    amharicRandomizedAlphabet = [];
    correctAnswer = "";

    getRandLetter() {
        let randVowel = 0;
        if (this.levelNumber > 0) {
            randVowel = getIntRange(0, 6);
        }
        return this.amharicRandomizedAlphabet[this.questionNumber][randVowel];
    }

    getQuestion() {
        let questionType = "";
        let questionText = "";
        let randLetter = this.getRandLetter();
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
            console.error("Invalid question type" + questiontype);
        }

        document.getElementById("question").textContent = questionText;

        return question;
    }

    nextQuestion() {
        this.questionNumber++;

        this.setQuestion();
    }

    getRandQuestion() {
        return 
    }

    setQuestion() {
        let question = this.getQuestion();
        this.questiontype = getIntRange(0, 1); // Randomize the question type
        console.log(this);

        document.getElementById("questionNum").textContent = "Question " + this.questionNumber; // Set question Number

    }

    setLevel(levelNumber = 0) {
        this.levelNumber = levelNumber;
        this.questionNumber = 0;
        this.amharicRandomizedAlphabet = shuffleToCopy(amharicAlphabetList);

        let buttons = document.getElementsByClassName("answers");

        let i = 0;
        for (let button of buttons) {
            i++;
            button.textContent = i + ". ";

            button.addEventListener("click", () => {
                this.nextQuestion();
            });
        }

        this.nextQuestion();
    }

}

const level = new levelData();

level.setLevel(0);
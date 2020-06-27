import { Howl } from 'howler';
import correctChime from '../sounds/correct_chime.mp3';
import incorrectChime from '../sounds/incorrect_chime.mp3'

const correctAudio = new Howl({
    src: [correctChime]
});

const incorrectAudio = new Howl({
    src: [incorrectChime]
});

const correctPlay = () => {
    correctAudio.play();
}

const incorrectPlay = () => {
    incorrectAudio.play();
}

export { correctPlay, incorrectPlay };


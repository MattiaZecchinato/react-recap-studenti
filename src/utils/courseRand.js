import courses from "../data/course";

export default function courseRand() {

    const getRandomInt = (min, max) => {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }

    const index = getRandomInt(0, (courses.length) - 1);

    return courses[index];
}
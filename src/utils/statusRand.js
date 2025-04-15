export default function statusRand() {

    const getRandomInt = (min, max) => {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }

    const index = getRandomInt(0, 1);

    return index === 0 ? 'active' : 'inactive';
}
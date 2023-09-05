export default function MakeArrayFromNumber(num) {
    let arr = [];
    for (let i = 0; i < num; ++i) {
        arr.push(i);
    }
    return arr;
}
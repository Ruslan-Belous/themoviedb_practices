export default function formattedNumber(data) {
    let num = data.toString();
    return num.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
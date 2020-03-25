let generator = () => {
    let code = '',
        length = 0;

    while (length<21) {
        char = String.fromCharCode(Math.round(Math.random() * 100) + 30);
        code+=char;
        length++
    }
    return code
}

module.exports = generator
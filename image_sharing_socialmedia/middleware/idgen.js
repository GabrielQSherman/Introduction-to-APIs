let generator = (totalChars, factor, start) => {
    let code = '',
        length = 0;

    while (length<totalChars) {
        char = String.fromCharCode(Math.round(Math.random() * factor) + start);
        code+=char;
        length++
    }
    return code
}

module.exports = generator
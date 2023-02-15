
// passes test if alphanumeric characters or undersoce
function isAlphaNumericSlash (str) {
    const regex = /^[a-zA-Z0-9_]*$/;
    return regex.test(str);
}

function isAlphabetic (str) {
    const regex = /^[a-zA-Z]*$/;
    return regex.test(str);
}

function isValidEmailFormat (emailStr) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // ai generated regex
    return regex.test(emailStr);
}

function isValidPnrFormat (pnrStr) {
    const regex = /^\d{8}-\d{4}$/;
    return regex.test(pnrStr);
}

function isEqualOrLarger(str, size){
    return str.length >= size;
}

function validateRegisterForm (username, password, pnr, email, name, surname) {
    const MIN_USERNAME_SIZE = 3;
    const MIN_PASSWORD_SIZE = 6;
    const MIN_NAME_LEN = 2;
    const MIN_SURNAME_LEN = 2;
    let checks = [isAlphaNumericSlash(username) && isEqualOrLarger(username, MIN_USERNAME_SIZE)];
    checks = [...checks, isAlphaNumericSlash(password) && isEqualOrLarger(password, MIN_PASSWORD_SIZE)];
    checks = [...checks, isValidPnrFormat(pnr), isValidEmailFormat(email)];
    checks = [...checks, isAlphabetic(name) && isEqualOrLarger(name, MIN_NAME_LEN)];
    checks = [...checks, isAlphabetic(surname) && isEqualOrLarger(surname, MIN_SURNAME_LEN)];
    const boolResult = checks.find(bool => bool === false) === undefined;
    return boolResult;
}

module.exports = {validateRegisterForm}
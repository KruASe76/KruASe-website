// ALGORITHM
// Incoming string.
// Converting each character of the string into an integer where the first digit is a local key (that is used only at this
// stage), the second and the third form a two-digit number and other digits form the number of the position of the source
// character in the Unicode Table.
// The key and the two-digit number are used to find out the length of the position number using a formula:
// N = ((dd/key + key) / 10)^2, where "dd" is a two-digit number, and round N to the closest integer.
// Key is a random integer in the range from 1 to 4 and used to hide the always repeating digit "1" every 4 or 5 digits that
// could be suspicious.
// Then converting to binary number system, saving to a variable the number of digits "1" before first digit "0" in the
// beginning of the binary number (it will be a cipher key), deleting this digits "1" and inverting the number
// (all 1 turn 0 and all 0 turn 1), so we have a binary number and a decimal cipher key.
// After this converting the binary to hexadecimal number system and applying Caesar Cipher on this hexadecimal number (as
// a string) using a sequence of hexadecimal digits (0123456789abcdef) as an alphabet and the cipher key we found out before
// as the shift.
// After applying, if there are digits "0" in the beginning of the number they are being deleted and their quantity will be
// added to the cipher key as the fractional part of it, else the cipher key is an integer.
// The last stage is converting the hexadecimal pseudo-number back to decimal.
// Thus, at the end of all operations we have a cipher and a key for it, both decimal numbers.

function encrypt(text) {
    const hexSymbols = "0123456789abcdef";
    let result = "", key;
    
    for (let char of text) {
        const num = char.charCodeAt(0);
        const sq = Math.round(Math.sqrt(num.toString().length) * 10);
        
        const localKey = 1 + Math.floor(Math.random() * 4);
        const cipheredSq = (sq - localKey) * localKey; // so we always get two-digit number
        
        const auxiliary = cipheredSq.toString().length > 1 ? "" : "0"; // to make cipheredSq 2-digit
        result += localKey + auxiliary + cipheredSq + num;
    }

    result = BigInt(result).toString(2);
    key = result.indexOf("0"); // the main key
    result = result.slice(key);
    result = result.replaceAll("1", "2");
    result = result.replaceAll("0", "1");
    result = result.replaceAll("2", "0");

    result = BigInt("0b" + result).toString(16);
    let newResult = "";
    for (char of result) { // Caesar cipher
        const index = hexSymbols.indexOf(char) + key;
        newResult += hexSymbols[index % 16];
    }
    result = newResult;

    let keyFract = 0; // fractional part of the key
    while (result[0] === "0") {
        result = result.slice(1);
        keyFract += 1;
    }
    key = key + "." + keyFract;

    result = BigInt("0x" + result).toString();

    return [result, key];
}

function decrypt(code, key) {
    const hexSymbols = "0123456789abcdef";
    let result = "";

    key = key.toString();
    key = key.includes(".") ? key : key + ".0";
    const [keyInt, keyFract] = key.split(".");

    code = "0".repeat(keyFract) + BigInt(code).toString(16);
    for (char of code) {
        const index = hexSymbols.indexOf(char) - keyInt;
        result += hexSymbols[(index + 16) % 16]; // if keyInt > ind
    }

    result = BigInt("0x" + result).toString(2);
    result = result.replaceAll("1", "2");
    result = result.replaceAll("0", "1");
    result = result.replaceAll("2", "0");
    result = "1".repeat(keyInt) + result;

    result = BigInt("0b" + result).toString();
    let newResult = "";
    while (result) {
        const localKey = Number(result[0]);
        const cipheredSq = Number(result.slice(1, 3));
        result = result.slice(3);

        const sq = (cipheredSq / localKey + localKey) / 10;
        const charCodeLength = Math.round(Math.pow(sq, 2));

        const num = Number(result.slice(0, charCodeLength));
        const char = String.fromCharCode(num);
        newResult += char;

        result = result.slice(charCodeLength);
    }
    result = newResult;

    return result;
}

console.log(decrypt("2296390609674970032243855431724607297762", 1));
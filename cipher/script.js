import * as cipher from "./_js/KruASeCoder.js";


let textField = document.querySelector(".text-input");
let codeField = document.querySelector(".code-input");
let keyField = document.querySelector(".key-input");

let encryptButton = document.querySelector(".encrypt-button");
let decryptButton = document.querySelector(".decrypt-button");

let warningLabel = document.querySelector(".warning-label");

encryptButton.onclick = function() {
    const text = textField.value;
    // console.log("text: " + text);

    const [code, key] = cipher.encrypt(text);
    // console.log("code: " + code);
    // console.log("key: " + key);

    codeField.value = code;
    keyField.value = Number(key);

    warningLabel.style.visibility = "hidden";
}

decryptButton.onclick = function() {
    const code = codeField.value;
    const key = keyField.value;
    // console.log("code: " + code);
    // console.log("key: " + key);

    let text;
    try {
        text = cipher.decrypt(code, key);
    } catch (err) {
        warningLabel.style.visibility = "visible";
        return;
    }
    // console.log("text: " + text);
    textField.value = text;

    warningLabel.style.visibility = "hidden";
}
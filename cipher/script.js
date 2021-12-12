import * as cipher from "./_js/KruASeCoder.js";


const textField = document.querySelector("#text-input");
const codeField = document.querySelector("#code-input");
const keyField = document.querySelector("#key-input");

const encryptButton = document.querySelector("#encrypt-button");
const decryptButton = document.querySelector("#decrypt-button");

const warningLabel = document.querySelector("#warning-label");

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


const copyText = document.querySelector("#copy-text");
const pasteText = document.querySelector("#paste-text");
const copyCode = document.querySelector("#copy-code");
const pasteCode = document.querySelector("#paste-code");

// warning on empty!!
// wipe default warning-label value!!
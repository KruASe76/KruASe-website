import * as cipher from "./_js/KruASeCoder.js";


const textField = document.querySelector("#text-input");
const codeField = document.querySelector("#code-input");
const keyField = document.querySelector("#key-input");

const encryptButton = document.querySelector("#encrypt-button");
const decryptButton = document.querySelector("#decrypt-button");

const warningLabel = document.querySelector("#warning-label");


encryptButton.onclick = function() {
    const text = textField.value.trim();
    if (text === "") {
        warningLabel.textContent = "Empty text input field";
        warningLabel.style.visibility = "visible";
        return;
    }

    const [code, key] = cipher.encrypt(text);

    codeField.value = code;
    keyField.value = Number(key);

    warningLabel.style.visibility = "hidden";
}
decryptButton.onclick = function() {
    const code = codeField.value.trim();
    const key = keyField.value.trim();
    if (code === "") {
        warningLabel.textContent = "Empty code input field";
        warningLabel.style.visibility = "visible";
        return;
    }
    if (key === "") {
        warningLabel.textContent = "Empty key input field";
        warningLabel.style.visibility = "visible";
        return;
    }

    let text;
    try {
        text = cipher.decrypt(code, key);
    } catch (err) {
        warningLabel.textContent = "Invalid code or/and key";
        warningLabel.style.visibility = "visible";
        return;
    }
    textField.value = text;

    warningLabel.style.visibility = "hidden";
}


const copyText = document.querySelector("#copy-text");
const pasteText = document.querySelector("#paste-text");
const copyCode = document.querySelector("#copy-code");
const pasteCode = document.querySelector("#paste-code");

function copy(field1, field2 = undefined) {
    const text1 = field1.value.trim();
    const text2 = field2 ? field2.value.trim() : "";
    if (!(text1 && (text2 || !field2))) { // (field2 === undefined && text1) || (text && text2) -> don't execute
        warningLabel.textContent = "Invalid data to copy";
        warningLabel.style.visibility = "visible";
        return;
    }

    const text = text2 ? text1 + "\nkey: " + text2 : text1;

    const prom = navigator.clipboard.writeText(text);
    prom.then(() => {
        warningLabel.style.visibility = "hidden";
    })
    prom.catch(err => {
        warningLabel.textContent = "Unable to copy";
        warningLabel.style.visibility = "visible";
    });
}
function paste(field1, field2 = undefined) {
    const prom = navigator.clipboard.readText();
    prom.then(text => {
        if (text.includes("\nkey: ")) {
            const [codePaste, keyPaste] = text.split("\nkey: ");
            field1.value = codePaste.trim();
            field2.value = keyPaste.trim();
        } else {
            field1.value = text;
        }

        warningLabel.style.visibility = "hidden";
    });
    prom.catch(err => {
        warningLabel.textContent = "Unable to paste";
        warningLabel.style.visibility = "visible";
    });
}

copyText.onclick = function() {
    copy(textField);
}
pasteText.onclick = function() {
    paste(textField);
}
copyCode.onclick = function() {
    copy(codeField, keyField);
}
pasteCode.onclick = function() {
    paste(codeField, keyField);
}

let textField = document.querySelector('.text-input');
let codeField = document.querySelector('.code-input');
let keyField = document.querySelector('.key-input');

let encryptButton = document.querySelector('.encrypt-button');
let decryptButton = document.querySelector('.decrypt-button');

let warningLabel = document.querySelector('.warning-label');

encryptButton.onclick = async function() {
    let text = textField.value;
    // console.log('text: ' + text);

    let [code, key] = await eel.encode_py(text)();
    // console.log('code: ' + code);
    // console.log('key: ' + key);

    codeField.value = code;
    keyField.value = parseFloat(key);
};

decryptButton.onclick = async function() {
    let code = codeField.value;
    let key = keyField.value;
    // console.log('code: ' + code);
    // console.log('key: ' + key);

    try {
        await eel.decode_py(code, key)(); // if i define 'text' here, it dont work
    } catch (err) {
        warningLabel.style.visibility = 'visible';
        return;
    }
    let text = await eel.decode_py(code, key)()
    // console.log('text: ' + text);
    textField.value = text;
    warningLabel.style.visibility = 'hidden';
};
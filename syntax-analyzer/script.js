const divDependency = document.getElementById("divDependency");
const results = document.getElementById("results");
const btnSubmit1 = document.getElementById("btnSubmit1");
const btnSubmit2 = document.getElementById("btnSubmit2");
const btnSearch = document.getElementById("btnSearch");
const fileInput = document.getElementById("pickSearchFiles");
const fileInputAnalyse = document.getElementById("pickAnalyseFiles");
const textArea = document.getElementById("text");
const searchArea = document.getElementById("searchArea");
const lemmaInput = document.getElementById("inputLemma");
const selectDependency = document.getElementById("selectDependency");
const lblError = document.getElementById("lblError");
const lblError1 = document.getElementById("lblError1");

const wordToTag = {
    "Подлежащее": "nsubj,csubj",
    "Сказуемое": "ccomp,xcomp,root,cop,aux",
    "Дополнение": "obl,obj,iobj",
    "Определение": "amod,nmod,acl",
    "Приложение": "parataxis,appos",
    "Обстоятельство": "advcl,advmod",
    "Относительное предложение": "acl:relcl",
    "Нефинитный клауз": "acl,advcl,acl:relcl"
};

const allowedFileFormats = ["csv", "docx", "epub", "fb2", "htm", "html", "odt", "pdf", "txt", "xlsx"]


btnSearch.onclick = async function () {
    if (fileInput.files.length == 0) {
        lblError1.textContent = "Необходимо загрузить файлы";
        return;
    } else {
        lblError1.textContent = "";
    }


    const formData = new FormData();

    formData.append("lemma", lemmaInput.value == "" ? 0 : lemmaInput.value);
    formData.append("dependencies", selectDependency.value == "" ? 0 : wordToTag[selectDependency.value]);

    const files = fileInput.files;
    for (let file of files) {
        if (!allowedFileFormats.includes(file.name.split(".").pop())) {
            lblError.textContent = "Загружены файлы в недопустимом формате";
            return;
        }
        formData.append("files", file);
    }

    console.log(typeof (lemmaInput.value));

    const responseJson = JSON.parse(
        await fetch(
            "https://kruase.serveo.net/api/search", {
                method: "POST",
                headers: {
                    "ngrok-skip-browser-warning": "qwerty",
                    'Accept': 'application/json'
                },
                body: formData
            }
        )
        .then(response => {
            return response.text();
        })
    );


    console.log(responseJson);
    let result = "";
    let length = responseJson["sentences"].length;
    result += "Найдено предложений: " + length.toString();

    for (let i = 0; i < length; i++) {
        result += `\n\n\t${responseJson["sentences"][i]}`;
    }

    searchArea.value = result;
}



btnSubmit1.onclick = function () {
    if (fileInputAnalyse.files.length == 0) {
        lblError.textContent = "Необходимо загрузить файлы";
    } else {
        lblError.textContent = "";
    }
}

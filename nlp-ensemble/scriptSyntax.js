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

btnTree.onclick = function() {
  sectSentences.style.display = "none";
  sectTree.style.display = "block";

  btnSentences.disabled = false;
  btnTree.disabled = true;
}

btnSentences.onclick = function() {
  sectTree.style.display = "none";
  sectSentences.style.display = "block";

  btnTree.disabled = false;
  btnSentences.disabled = true;
}

btnSearch1.onclick = async function() {
  if (fileInput1.files.length == 0){
    lblError1.textContent = "Необходимо загрузить файлы";
    return;
  }
  else {
    lblError1.textContent = "";
  }


  const formData = new FormData();

  formData.append("lemma", lemmaInput.value == "" ? 0 : lemmaInput.value);
  formData.append("dependencies", selectDependency.value == "" ? 0 : wordToTag[selectDependency.value]);

  const files = fileInput1.files;
  for (let file of files) {
    if (!allowedFileFormats.includes(file.name.split(".").pop())) {
      lblError2.textContent = "Загружены файлы в недопустимом формате";
      return;
    }
    formData.append("files", file);
  }


  statusLabelFiles1.textContent = "Загрузка... (до нескольких десятков секунд в зависимости от размера текста)";

  const responseJson = JSON.parse(
    await fetch(
      `${url}/syntax/search`,
      {
        method: "POST",
        headers: {
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



btnSubmit1.onclick = function() {
  if (fileInputAnalyse.files.length == 0){
    lblError2.textContent = "Необходимо загрузить файлы";
  }
  else {
    lblError2.textContent = "";
  }
}

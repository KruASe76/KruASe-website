let prevValue = 1;
let allPages = [];
let currentPage = 0;
const grammarTags = {
  "part_of_speech": "Часть речи",
  "S": "существительное",
  "V": "глагол",
  "A": "прилагательное",
  "ADV": "наречие",
  "APRO": "местоимение (прилагательное)",
  "SPRO": "местоимение (существительное)",
  "NUM": "числительно",
  "ANUM": "порядковое числительно",
  "PR": "предлог",
  "CONJ": "союз",
  "PART": "частица",
  "INTJ": "междометие",
  "ADVPRO": "местоимение (наречие)",
  "COM": "часть фразеологизма",

  "number": "Число",
  "ед": "единственное",
  "мн": "множественное",

  "gender": "Род",
  "муж": "мужской",
  "жен": "женский",
  "сред": "средний",

  "noun_case": "Падеж",
  "им": "именительный",
  "род": "родительный",
  "дат": "дательный",
  "вин": "винительный",
  "твор": "творительный",
  "пр": "предложный",
  "парт": "партитивный",
  "местн": "локативный",
  "зват": "звательный",

  "verb_time": "Время",
  "прош": "прошедшее",
  "наст": "настоящее",
  "непрош": "будущее",

  "verb_type": "Тип",
  "прич": "причастие",
  "деепр": "деепричастие",
  "инф": "инфинитив",
  "изъяв": "изъявительное наклонение",
  "пов": "повелительное наклонение",

  "adjective_form": "Форма",
  "полн": "полная",
  "кр": "краткая",
  "притяж": "притяжательная",

  "other_features": "Прочие признаки",
  "имя": "имя",
  "фам": "фамилия",
  "отч": "отчество",
  "гео": "географическое название",
  "мж": "общая форма",
  "разг": "разговорное слово",
  "сокр": "скоращение",
  "устар": "устаревшее слово",
  "обсц": "обсценная лексика",
  "затр": "затруднено формообразование",
  "искаж": "искаженная форма",
  "редк": "редкое слово",
  "вводн": "вводное слово",
  "прдк": "предикатив",
}

btnLoadText.onclick = function() {
  sectSearch.style.display = "none";
  sectAdd.style.display = "block";

  btnSearchByText.disabled = false;
  btnLoadText.disabled = true;
}

btnSearchByText.onclick = function() {
  sectAdd.style.display = "none";
  sectSearch.style.display = "block";

  btnLoadText.disabled = false;
  btnSearchByText.disabled = true;
}

function writeNumber(num)
{
  if (num % 10 >= 2 && num % 10 <= 4 && num % 100 != 11 && num % 100 != 12 &&
     num % 100 != 13 && num % 100 != 14) return " раза";
  return " раз";
}

prevPageButton.onclick = function() {
  if (currentPage > 0)
  {
    currentPage--;
    resultsArea.value = allPages[currentPage];
    resultsArea.scrollTo(0, 0);
    pageNumberLabel.innerHTML = (currentPage + 1).toString() + "/" + allPages.length.toString();
  }
}

nextPageButton.onclick = function() {
  if (currentPage < allPages.length - 1)
  {
    currentPage++;
    resultsArea.value = allPages[currentPage];
    resultsArea.scrollTo(0, 0);
    pageNumberLabel.innerHTML = (currentPage + 1).toString() + "/" + (allPages.length).toString();
  }
}

reloadDbButton.onclick = async function() {
  const dbNames = JSON.parse(
    await fetch(
        `${url}/concordancer/db_names`, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        }
    )
    .then(response => {
        return response.text();
    }));

  selectDb.innerHTML = `<option>${dbNames.join("</option><option>")}</option>`;
}

searchButton.onclick = async function() {
  const db_name = selectDb.value;
  const searchType = selectSearchParam.value;
  if (searchType == 1)
  {
      allPages = [];
      pageNumberLabel.value = "1/1";
      currentPage = 0;
      const lemma = searchInput.value;
      const responseJson = JSON.parse(
      await fetch(
          `${url}/concordancer/lemma`, {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "lemma": lemma,
                "db_name": db_name
              })
          }
      )
      .then(response => {
          return response.text();
      }));

      console.log(responseJson)

      if (responseJson.length == 0)
      {
        resultsArea.value = "Не найдено";
        return;
      }

      let resultString = "";
      let cur_token = "";
      resultsArea.value = "";

      for (let i = 0; i < responseJson.length; i++) {
        if (responseJson[i]["lemma"][0] != responseJson[i]["token"][0])
        {
          continue;
        }
        if (cur_token != responseJson[i]["token"])
        {
          if (cur_token != "")
          {
            resultString += "-".repeat(40) + "\n";
          }
          cur_token = responseJson[i]["token"];
          resultString += responseJson[i]["token"] + "\n";
          resultString += grammarTags["part_of_speech"] + ": " + grammarTags[responseJson[i]["tags"]["part_of_speech"]] + "\n";
          if (responseJson[i]["tags"]["number"] != undefined)
          {
            resultString += grammarTags["number"] + ": " + grammarTags[responseJson[i]["tags"]["number"]] + "\n";
          }
          if (responseJson[i]["tags"]["gender"] != undefined)
          {
            resultString += grammarTags["gender"] + ": " + grammarTags[responseJson[i]["tags"]["gender"]] + "\n";
          }
          if (responseJson[i]["tags"]["noun_case"] != undefined)
          {
            resultString += grammarTags["noun_case"] + ": ";
            for (let j = 1; j < responseJson[i]["tags"]["noun_case"].length - 1; j++) {
              resultString += grammarTags[responseJson[i]["tags"]["noun_case"][j]] + ", ";
            }
            resultString += grammarTags[responseJson[i]["tags"]["noun_case"][responseJson[i]["tags"]["noun_case"].length - 1]] + "\n";
          }
          if (responseJson[i]["tags"]["verb_time"] != undefined)
          {
            resultString += grammarTags["verb_time"] + ": " + grammarTags[responseJson[i]["tags"]["verb_time"]] + "\n";
          }
          if (responseJson[i]["tags"]["verb_type"] != undefined)
          {
            resultString += grammarTags["verb_type"] + ": " + grammarTags[responseJson[i]["tags"]["verb_type"]] + "\n";
          }
          if (responseJson[i]["tags"]["adjective_form"] != undefined)
          {
            resultString += grammarTags["adjective_form"] + ": " + grammarTags[responseJson[i]["tags"]["adjective_form"]] + "\n";
          }
          if (responseJson[i]["tags"]["other_features"] != undefined)
          {
            resultString += grammarTags["other_features"] + ": " + grammarTags[responseJson[i]["tags"]["other_features"]] + "\n";
          }
          resultString += "Встретилось " + responseJson[i]["token_occurrences_count"] + writeNumber(responseJson[i]["token_occurrences_count"]) + "\n";
          resultString += "Примеры:\n";
        }
        resultString += "\t" + responseJson[i]["sentence"] + "\n";
      }
    if (cur_token != "")
    {
      resultString += "-".repeat(40) + "\n";
    }
    resultsArea.value = resultString;
  }


  else if (searchType == 2)
  {
      allPages = [];
      pageNumberLabel.value = "1/1";
      currentPage = 0;
      const token = searchInput.value;
      const responseJson = JSON.parse(
      await fetch(
          `${url}/concordancer/token`, {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "token": token,
                "db_name": db_name
              })
          }
      )
      .then(response => {
          return response.text();
      }));
    console.log(responseJson);

    if (responseJson.length == 0)
    {
      resultsArea.value = "Не найдено";
      return;
    }

    let resultString = "";
    let cur_lemma = "";
    resultsArea.value = "";
    for (let i = 0; i < responseJson.length; i++) {
      if (responseJson[i]["lemma"][0] != responseJson[i]["token"][0])
      {
        continue;
      }
      if (cur_lemma != responseJson[i]["lemma"])
      {
        if (cur_lemma != "")
        {
          resultString += "-".repeat(40) + "\n";
        }
        cur_lemma = responseJson[i]["lemma"];
        resultString += "Начальная форма: " + responseJson[i]["lemma"] + "\n";
        resultString += grammarTags["part_of_speech"] + ": " + grammarTags[responseJson[i]["tags"]["part_of_speech"]] + "\n";
          if (responseJson[i]["tags"]["number"] != undefined)
          {
            resultString += grammarTags["number"] + ": " + grammarTags[responseJson[i]["tags"]["number"]] + "\n";
          }
          if (responseJson[i]["tags"]["gender"] != undefined)
          {
            resultString += grammarTags["gender"] + ": " + grammarTags[responseJson[i]["tags"]["gender"]] + "\n";
          }
          if (responseJson[i]["tags"]["noun_case"] != undefined)
          {
            resultString += grammarTags["noun_case"] + ": ";
            for (let j = 1; j < responseJson[i]["tags"]["noun_case"].length - 1; j++) {
              resultString += grammarTags[responseJson[i]["tags"]["noun_case"][j]] + ", ";
            }
            resultString += grammarTags[responseJson[i]["tags"]["noun_case"][responseJson[i]["tags"]["noun_case"].length - 1]] + "\n";
          }
          if (responseJson[i]["tags"]["verb_time"] != undefined)
          {
            resultString += grammarTags["verb_time"] + ": " + grammarTags[responseJson[i]["tags"]["verb_time"]] + "\n";
          }
          if (responseJson[i]["tags"]["verb_type"] != undefined)
          {
            resultString += grammarTags["verb_type"] + ": " + grammarTags[responseJson[i]["tags"]["verb_type"]] + "\n";
          }
          if (responseJson[i]["tags"]["adjective_form"] != undefined)
          {
            resultString += grammarTags["adjective_form"] + ": " + grammarTags[responseJson[i]["tags"]["adjective_form"]] + "\n";
          }
          if (responseJson[i]["tags"]["other_features"] != undefined)
          {
            resultString += grammarTags["other_features"] + ": " + grammarTags[responseJson[i]["tags"]["other_features"]] + "\n";
          }
          resultString += "Встретилось " + responseJson[i]["token_occurrences_count"] + writeNumber(responseJson[i]["token_occurrences_count"]) + "\n";
          resultString += "Примеры:\n";
        }
        resultString += "\t" + responseJson[i]["sentence"] + "\n";
    }
    if (cur_lemma != "")
    {
      resultString += "-".repeat(40) + "\n";
    }
    resultsArea.value = resultString;
  }


  else
  {
    allPages = []
    pageNumberLabel.value = "1/1";
    currentPage = 0;
    let extraTags = [];
    for (const checkBox of checkBoxes) {
      if (checkBox.checked) {
        extraTags.push(checkBox.value);
      }
    }
    const responseJson = JSON.parse(
    await fetch(
        `${url}/concordancer/form`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                "form": {
                  "part_of_speech": selectPartOfSpeech.value == "" ? null : selectPartOfSpeech.value,
                  "number": selectNumber.value  == "" ? null : selectNumber.value,
                  "gender": selectGender.value  == "" ? null : selectGender.value,
                  "noun_case": selectCase.value  == "" ? null : selectCase.value,
                  "verb_time": selectTime.value  == "" ? null : selectTime.value,
                  "verb_type": selectType.value  == "" ? null : selectType.value,
                  "adjective_form": selectForm.value  == "" ? null : selectForm.value,
                  "other_features": extraTags
                },
                "letter_range": {
                  "left": firstLetter.value,
                  "right": lastLetter.value
                },
                "db_name": db_name
              }
            )
        }
    )
    .then(response => {
      return response.text();
    }));
    console.log({
                "form": {
                  "part_of_speech": selectPartOfSpeech.value,
                  "number": selectNumber.value,
                  "gender": selectGender.value,
                  "noun_case": selectCase.value,
                  "verb_time": selectTime.value,
                  "verb_type": selectType.value,
                  "adjective_form": selectForm.value,
                  "other_features": extraTags
                },
                "letter_range": {
                  "left": firstLetter.value,
                  "right": lastLetter.value
                },
                "db_name": db_name
              });
    console.log(responseJson);

    if (responseJson.length == 0)
    {
      resultsArea.value = "Не найдено";
      return;
    }

    let resultString = "";
    let cur_lemma = "";
    let cur_token = "";
    let cur_index = 0;
    resultsArea.value = "";

    for (let page = 0; page < responseJson.length / 1000; page++) {
      for (let i = 0; i < ((responseJson.length - page * 1000) < 1000 ? responseJson.length - page * 1000 : 1000); i++) {
        cur_index = page * 1000 + i;
        if (cur_lemma != responseJson[cur_index]["lemma"])
        {
          if (cur_lemma != "")
          {
            resultString += "-".repeat(40) + "\n";
          }
          resultString += responseJson[cur_index]["lemma"] + "\n";
          cur_lemma = responseJson[cur_index]["lemma"];
          if (cur_lemma[0] != responseJson[cur_index]["token"][0])
          {
            continue;
          }
          resultString += "\n\t" + responseJson[cur_index]["token"] + "\n";
          resultString += "\tВстретилось " + responseJson[cur_index]["token_occurrences_count"] + writeNumber(responseJson[cur_index]["token_occurrences_count"]) +"\n";
          cur_token = responseJson[cur_index]["token"];
        }
        else if (cur_token != responseJson[cur_index]["token"])
        {
          if (cur_lemma[0] != responseJson[cur_index]["token"][0])
          {
            continue;
          }
          resultString += "\n\t" + responseJson[cur_index]["token"] + "\n";
          cur_token = responseJson[cur_index]["token"];
          resultString += "\tВстретилось " + responseJson[cur_index]["token_occurrences_count"] + writeNumber(responseJson[cur_index]["token_occurrences_count"]) +"\n";
        }
        resultString += "\t\t" + responseJson[cur_index]["sentence"] + "\n";

      }
      if (cur_lemma != "")
      {
        resultString += "-".repeat(40) + "\n";
      }
      allPages.push(resultString);

      if (resultsArea.value == "")
      {
        resultsArea.value = resultString;
      }
      resultString = "";
    }
  }

  lblPage.innerHTML = "1/" + (allPages.length > 0 ? allPages.length : 1).toString();
}

function selectSearchParamClicked() {
  let value = selectSearchParam.value;
  searchLabel.textContent = value;
  if (prevValue < 3 && value == 3)
  {
    searchLabel.style.display = "none";
    searchInput.style.display = "none";
    divGrammarTags.style.display = "block";
    divLimit.style.display = "block";
  }
  else
  {
    divGrammarTags.style.display = "none";
    divLimit.style.display = "none";
    searchLabel.style.display = "block";
    searchInput.style.display = "block";
    if (value == 1)
    {
      searchLabel.textContent = "Введите лемму:";
    }
    else
    {
      searchLabel.textContent = "Введите словоформу:";
    }
  }
  prevValue = value;
}

window.onload = reloadDbButton.onclick;





sendTextButton.onclick = async function() {
  const dbName = dbNameInput.value;
  errorLabel.textContent = "";

  if (dbName == "")
  {
    errorLabel.textContent = "Введите имя базы данных для сохранения результата";
    return;
  }

  const text = textArea.value;

  const dbNames = JSON.parse(
    await fetch(
        `${url}/concordancer/db_names`, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        }
    )
    .then(response => {
        return response.text();
    }));

  if (dbNames.includes(dbName)) {
    errorLabel.textContent = "База даных с таким именем уже существует";
    return;
  }

  statusLabelText.textContent = "Загрузка... (до нескольких десятков секунд в зависимости от размера текста)";

  const responseJson = JSON.parse(
    await fetch(
        `${url}/concordancer/text`,
          {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "text": text,
              "db_name": dbName
            })
          }
    )
    .then(response => {
        return response.text();
    })
  );

  statusLabelText.textContent = "";
  alert("База данных добавлена");

  console.log(responseJson);
}

sendFilesButton.onclick = async function() {
  //sendFilesButton.disabled = true;
  const dbName = dbNameInput.value;
  errorLabel.textContent = "";

  if (dbName == "")
  {
    errorLabel.textContent = "Введите имя базы данных для сохранения результата";
    return;
  }

  const formData = new FormData();
  const files = fileInput.files;
  formData.append("db_name", dbName);
  for (const file of files) {
    if (!allowedFileFormats.includes(file.name.split(".").pop())) {
      lblError.textContent = "Загружены файлы в недопустимом формате";
      return;
    }
    formData.append("files", file);
  }

  const dbNames = JSON.parse(
    await fetch(
        `${url}/concordancer/db_names`, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        }
    )
    .then(response => {
        return response.text();
    }));

  if (dbNames.includes(dbName)) {
    errorLabel.textContent = "База даных с таким именем уже существует";
    return;
  }

  statusLabelFiles.textContent = "Загрузка... (до нескольких десятков секунд в зависимости от размера текста)";

  const responseJson = JSON.parse(
    await fetch(
        `${url}/concordancer/files`,
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

  statusLabelFiles.textContent = "";
  alert("База данных добавлена");

  console.log(responseJson);
}

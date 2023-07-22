const cancel = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 15 19.5"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';

const partsOfSpeech = {
  "Существительное": "S",
  "Прилагательное": "A",
  "Глагол": "V",
  "Наречие": "ADV"
};

btnCloserOnes.onclick = function() {
  sectComparison.style.display = "none";
  sectNGrams.style.display = "none";
  sectCloserOnes.style.display = "block";

  btnComparison.disabled = false;
  btnNGrams.disabled = false;
  btnCloserOnes.disabled = true;
}

btnComparison.onclick = function() {
  sectCloserOnes.style.display = "none";
  sectNGrams.style.display = "none";
  sectComparison.style.display = "block";

  btnCloserOnes.disabled = false;
  btnNGrams.disabled = false;
  btnComparison.disabled = true;
}

btnNGrams.onclick = function() {
  sectCloserOnes.style.display = "none";
  sectComparison.style.display = "none";
  sectNGrams.style.display = "block";

  btnCloserOnes.disabled = false;
  btnComparison.disabled = false;
  btnNGrams.disabled = true;
}

btnAddPlusWord.onclick = function() {
  const div = document.createElement("div");
  div.style.cssText = "margin-top:1%;";

  const input = document.createElement("input");

  const select = document.createElement("select");
  for (const [key, value] of Object.entries(partsOfSpeech))
  {
    const opt = document.createElement("option");
    opt.innerHTML = key;
    opt.value = value;
    select.appendChild(opt);
  }
  select.style.cssText = "margin-left: 5px;";

  const button = document.createElement("button");
  button.style.cssText = "margin-left:0%;\
    background-color:white;\
    color:red;\
    border:none;\
    outline:none;\
    text-align: center;\
    background-color: rgba(0, 0, 0, 0);";

  button.innerHTML = cancel;
  button.onclick = function() {
    const div = button.parentElement;
    div.remove();
  };
  div.appendChild(input);
  div.appendChild(select);
  div.appendChild(button);
  divPlusWords.appendChild(div);
}

btnAddMinusWord.onclick = function() {
  const div = document.createElement("div");
  div.style.cssText = "margin-top:1%;";

  const input = document.createElement("input");

  const select = document.createElement("select");
  for (const [key, value] of Object.entries(partsOfSpeech))
  {
    const opt = document.createElement("option");
    opt.innerHTML = key;
    opt.value = value;
    select.appendChild(opt);
  }
  select.style.cssText = "margin-left: 5px;";

  const button = document.createElement("button");
  button.style.cssText = "margin-left:0%;\
    background-color:white;\
    color:red;\
    border:none;\
    outline:none;\
    text-align: center;\
    background-color: rgba(0, 0, 0, 0);";

  button.innerHTML = cancel;
  button.onclick = function() {
    const div = button.parentElement;
    div.remove();
  };
  div.appendChild(input);
  div.appendChild(select);
  div.appendChild(button);
  divMinusWords.append(div);
}

btnSearchCloseWords.onclick = async function() {
  lblIdiotCloseWords.textContent = "";
  const add = [];
  const subtract = [];

  for (let i = 0; i < table.children.length; i++) {
    if (table.children[i].tagName == "TR") {
      table.removeChild(table.children[i]);
      i--;
    }
  }

  for (const child of divPlusWords.children)
  {
    if (child.tagName != "DIV") {
      continue;
    }

    add.push(child.children[0].value.toLowerCase() + "_" + child.children[1].value);
  }

  for (const child of divMinusWords.children)
  {
    if (child.tagName != "DIV") {
      continue;
    }

    subtract.push(child.children[0].value.toLowerCase() + "_" + child.children[1].value);
  }

  console.log(JSON.stringify({
          "add": add,
          "subtract": subtract,
          "amount": inputCloseWordsNumber.value
        }));

  const responseJson = JSON.parse(
    await fetch(
      "https://kruase.serveo.net/semantics/most_similar",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "add": add,
          "subtract": subtract,
          "amount": inputCloseWordsNumber.value
        })
      }
    )
      .then(response => {
        return response.text();
      })
  );

  console.log(responseJson);

  if (responseJson.error != undefined)
  {
    lblIdiotCloseWords.textContent = "Одно из слов не существует";
    return;
  }

  for (const [key, value] of Object.entries(responseJson)) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td1.innerHTML = key;
    td2.innerHTML = value;
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
  }
}

function selectNumberNGramsChanged() {
  if (selectNumberNGrams.value == "all")
  {
    sectNumberNGrams.style.display = "none";
  }
  else
  {
    sectNumberNGrams.style.display = "block";
  }
}

btnCompare.onclick = async function() {
  lblIdiotCompare.textContent = "";
  lblComparisonResult.textContent = "Результат: ";
  const responseJson = JSON.parse(
    await fetch(
      "https://kruase.serveo.net/semantics/similarity",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "word_1": inputFirstWord.value + "_" + selectFirstWordType.value,
          "word_2": inputSecondWord.value + "_" + selectSecondWordType.value
        })
      }
    )
      .then(response => {
        return response.text();
      })
  );

  console.log(responseJson);

  if (responseJson.error != undefined)
  {
    lblIdiotCompare.textContent = "Одно из слов не существует";
    return;
  }

  lblComparisonResult.textContent = "Результат: " + responseJson["similarity"];
}

btnSearchNGrams.onclick = async function() {
  NGramsArea.value = "";

  let amount = -1;
  if (selectNumberNGrams.value == "choose")
  {
    amount = inputNumberNGrams.value;
  }

  const responseJson = JSON.parse(
    await fetch(
      `https://kruase.serveo.net/semantics/${selectNGrams.value}`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "amount": amount
        })
      }
    )
      .then(response => {
        return response.text();
      })
  );

  console.log(responseJson);

  let result = "";
  result += `Найдено ${responseJson.length} ${selectNGrams.value == "bigrams" ? "биграмм" : "триграмм"}.\n`;
  for (const i of responseJson)
  {
    result += i + "\n";
  }
  NGramsArea.value = result;
}

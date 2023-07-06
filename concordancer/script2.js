const fileInput = document.getElementById("pickFile");
const textArea = document.getElementById("textArea");
const sendFilesButton = document.getElementById("btnSendFiles");
const sendTextButton = document.getElementById("btnSendText");
const dbNameInput = document.getElementById("inputDbName");
const errorLabel = document.getElementById("lblError");
const statusLabelFiles = document.getElementById("lblStatusFiles");
const statusLabelText = document.getElementById("lblStatusText");

const allowedFileFormats = ["csv", "docx", "epub", "fb2", "htm", "html", "odt", "pdf", "txt", "xlsx"]

sendTextButton.onclick = async function () {
  const dbName = dbNameInput.value;
  errorLabel.textContent = "";

  if (dbName == "") {
    errorLabel.textContent = "Введите имя базы данных для сохранения результата";
    return;
  }

  const text = textArea.value;

  const dbNames = JSON.parse(
    await fetch(
      "https://kruase.serveo.net/api/db_names", {
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
      "https://kruase.serveo.net/add/text", {
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

  console.log(responseJson);

  window.location.href = "index.html";
}

sendFilesButton.onclick = async function () {
  //sendFilesButton.disabled = true;
  const dbName = dbNameInput.value;
  errorLabel.textContent = "";

  if (dbName == "") {
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
      "https://kruase.serveo.net/api/db_names", {
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
      "https://kruase.serveo.net/add/files", {
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

  window.location.href = "index.html";
}

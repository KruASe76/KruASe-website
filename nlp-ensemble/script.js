const urlResponse = await fetch(
  `https://gist.githubusercontent.com/KruASe76/296443317b2a308a42f0c8c1cff2f1a6/raw/localhost_domain.url?_=${crypto.randomUUID()}`
);
export const url = await urlResponse.text();

export const searchButton = document.getElementById("btnSearch");
export const reloadDbButton = document.getElementById("btnReload")
export const prevPageButton = document.getElementById("btnPrevPage");
export const nextPageButton = document.getElementById("btnNextPage");
export const sendFilesButton = document.getElementById("btnSendFiles");
export const sendTextButton = document.getElementById("btnSendText");
export const btnSearchByText = document.getElementById("btnSearchByText");
export const btnLoadText = document.getElementById("btnLoadText");
export const btnConcordancer = document.getElementById("btnConcordancer");
export const btnSyntax = document.getElementById("btnSyntax");
export const btnSemantic = document.getElementById("btnSemantic");
export const btnSubmit1 = document.getElementById("btnSubmit1");
export const btnSubmit2 = document.getElementById("btnSubmit2");
export const btnSearch1 = document.getElementById("btnSearch1");
export const btnTree = document.getElementById("btnTree");
export const btnSentences = document.getElementById("btnSentences");
export const btnCloserOnes = document.getElementById("btnCloserOnes");
export const btnComparison = document.getElementById("btnComparison");
export const btnNGrams = document.getElementById("btnNGrams");
export const btnAddPlusWord = document.getElementById("btnAddPlusWord");
export const btnAddMinusWord = document.getElementById("btnAddMinusWord");
export const btnSearchCloseWords = document.getElementById("btnSearchCloseWords");
export const btnChangeTheme = document.getElementById("shrek");
export const btnSearchNGrams = document.getElementById("btnSearchNGrams");
export const btnCompare = document.getElementById("btnCompare");

export const sectConcordancer = document.getElementById("sectConcordancer");
export const sectAdd = document.getElementById("sectAdd");
export const sectSearch = document.getElementById("sectSearch");
export const sectSyntax = document.getElementById("sectSyntax");
export const sectSemantic = document.getElementById("sectSemantic");
export const sectTree = document.getElementById("sectTree");
export const sectSentences = document.getElementById("sectSentences");
export const sectCloserOnes = document.getElementById("sectCloserOnes");
export const sectComparison = document.getElementById("sectComparison");
export const sectNGrams = document.getElementById("sectNGrams");
export const sectNumberNGrams = document.getElementById("sectNumberNGrams");

export const results = document.getElementById("results");
export const checkBoxes = document.getElementsByClassName("check");
export const pageNumberLabel = document.getElementById("lblPage");
export const lblError2 = document.getElementById("lblError2");
export const lblError1 = document.getElementById("lblError1");
export const errorLabel = document.getElementById("lblError");
export const statusLabelFiles = document.getElementById("lblStatusFiles");
export const statusLabelText = document.getElementById("lblStatusText");
export const statusLabelFiles1 = document.getElementById("lblStatusFiles1");
export const lblSendFilesNGrams = document.getElementById("lblSendFilesNGrams");
export const lblComparisonResult = document.getElementById("lblComparisonResult");
export const lblIdiotCompare = document.getElementById("lblIdiotCompare");
export const searchLabel = document.getElementById("lblEnterSearch");
export const lblIdiotCloseWords = document.getElementById("lblIdiotCloseWords");

export const dbNameInput = document.getElementById("inputDbName");
export const lemmaInput = document.getElementById("inputLemma");
export const fileInput = document.getElementById("pickFile");
export const fileInput1 = document.getElementById("pickSearchFiles");
export const fileInputAnalyse = document.getElementById("pickAnalyseFiles");
export const searchInput = document.getElementById("inputSearch");
export const inputFilesNGrams = document.getElementById("inputFilesNGrams");
export const inputCloseWordsNumber = document.getElementById("inputCloseWordsNumber");
export const inputFirstWord = document.getElementById("inputFirstWord");
export const inputSecondWord = document.getElementById("inputSecondWord");
export const inputNumberNGrams = document.getElementById("inputNumberNGrams");

export const selectDb = document.getElementById("selectDb");
export const selectPartOfSpeech = document.getElementById("selectPartOfSpeech");
export const selectNumber = document.getElementById("selectNumber");
export const selectGender = document.getElementById("selectGender");
export const selectCase = document.getElementById("selectCase");
export const selectTime = document.getElementById("selectTime");
export const selectType = document.getElementById("selectType");
export const selectForm = document.getElementById("selectForm");
export const selectDependency = document.getElementById("selectDependency");
export const firstLetter = document.getElementById("selectLetter1");
export const lastLetter = document.getElementById("selectLetter2");
export const selectSearchParam = document.getElementById("selectSearchParam");
export const selectFirstWordType = document.getElementById("selectFirstWordType");
export const selectSecondWordType = document.getElementById("selectSecondWordType");
export const selectNGrams = document.getElementById("selectNGrams");
export const selectNumberNGrams = document.getElementById("selectNumberNGrams");

export const textArea = document.getElementById("textArea");
export const textArea1 = document.getElementById("text");
export const searchArea = document.getElementById("searchArea");
export const resultsArea = document.getElementById("resultsArea");
export const NGramsArea = document.getElementById("areaNGrams");

export const divGrammarTags = document.getElementById("divGrammarTags");
export const divLimit = document.getElementById("divLimit");
export const divDependency = document.getElementById("divDependency");
export const divSeveralWords = document.getElementById("divSeveralWords");
export const divPlusWords = document.getElementById("divPlusWords");
export const divMinusWords = document.getElementById("divMinusWords");
export const divCloseWordsResults = document.getElementById("divCloseWordsResults");

export const table = document.getElementById("table");

export const allowedFileFormats = ["docx", "epub", "fb2", "htm", "html", "odt", "pdf", "txt"];


btnConcordancer.onclick = function() {
  sectSyntax.style.display = "none";
  sectSemantic.style.display = "none";
  sectAdd.style.display = "none";
  sectConcordancer.style.display = "block";
  sectSearch.style.display = "block";

  btnSyntax.disabled = false;
  btnSemantic.disabled = false;
  btnLoadText.disabled = false;
  btnConcordancer.disabled = true;
  btnSearchByText.disabled = true;
}

btnSyntax.onclick = function() {
  sectConcordancer.style.display = "none";
  sectSemantic.style.display = "none";
  sectSentences.style.display = "none";
  sectSyntax.style.display = "block";
  sectTree.style.display = "block";

  btnSemantic.disabled = false;
  btnConcordancer.disabled = false;
  btnSentences.disabled = false;
  btnSyntax.disabled = true;
  btnTree.disabled = true;
}

btnSemantic.onclick = function() {
  sectConcordancer.style.display = "none";
  sectSyntax.style.display = "none";
  sectComparison.style.display = "none";
  sectNGrams.style.display = "none";
  sectSemantic.style.display = "block";
  sectCloserOnes.style.display = "block";

  btnConcordancer.disabled = false;
  btnSyntax.disabled = false;
  btnComparison.disabled = false;
  btnNGrams.disabled = false;
  btnSemantic.disabled = true;
  btnCloserOnes.disabled = true;
}

btnChangeTheme.onclick = function() {
  const html = document.getElementsByTagName("html")[0];
  if (html.classList.contains("shrek"))
  {
    html.classList.remove("shrek");
  }
  else
  {
    html.classList.add("shrek");
  }
}


document.querySelector("#sectTree > .divFiles > form").setAttribute("action", `${url}/syntax/files`);
document.querySelector("#sectTree > .divText > form").setAttribute("action", `${url}/syntax/text`);

const searchButton = document.getElementById("btnSearch");
const reloadDbButton = document.getElementById("btnReload")
const prevPageButton = document.getElementById("btnPrevPage");
const nextPageButton = document.getElementById("btnNextPage");
const sendFilesButton = document.getElementById("btnSendFiles");
const sendTextButton = document.getElementById("btnSendText");
const btnSearchByText = document.getElementById("btnSearchByText");
const btnLoadText = document.getElementById("btnLoadText");
const btnConcordancer = document.getElementById("btnConcordancer");
const btnSyntax = document.getElementById("btnSyntax");
const btnSemantic = document.getElementById("btnSemantic");
const btnSubmit1 = document.getElementById("btnSubmit1");
const btnSubmit2 = document.getElementById("btnSubmit2");
const btnSearch1 = document.getElementById("btnSearch1");
const btnTree = document.getElementById("btnTree");
const btnSentences = document.getElementById("btnSentences");
const btnCloserOnes = document.getElementById("btnCloserOnes");
const btnComparison = document.getElementById("btnComparison");
const btnNGrams = document.getElementById("btnNGrams");
const btnAddPlusWord = document.getElementById("btnAddPlusWord");
const btnAddMinusWord = document.getElementById("btnAddMinusWord");
const btnSearchCloseWords = document.getElementById("btnSearchCloseWords");
const btnChangeTheme = document.getElementById("shrek");
const btnSearchNGrams = document.getElementById("btnSearchNGrams");
const btnCompare = document.getElementById("btnCompare");

const sectConcordancer = document.getElementById("sectConcordancer");
const sectAdd = document.getElementById("sectAdd");
const sectSearch = document.getElementById("sectSearch");
const sectSyntax = document.getElementById("sectSyntax");
const sectSemantic = document.getElementById("sectSemantic");
const sectTree = document.getElementById("sectTree");
const sectSentences = document.getElementById("sectSentences");
const sectCloserOnes = document.getElementById("sectCloserOnes");
const sectComparison = document.getElementById("sectComparison");
const sectNGrams = document.getElementById("sectNGrams");
const sectNumberNGrams = document.getElementById("sectNumberNGrams");

const results = document.getElementById("results");
const checkBoxes = document.getElementsByClassName("check");
const pageNumberLabel = document.getElementById("lblPage");
const lblError2 = document.getElementById("lblError2");
const lblError1 = document.getElementById("lblError1");
const errorLabel = document.getElementById("lblError");
const statusLabelFiles = document.getElementById("lblStatusFiles");
const statusLabelText = document.getElementById("lblStatusText");
const statusLabelFiles1 = document.getElementById("lblStatusFiles1");
const lblSendFilesNGrams = document.getElementById("lblSendFilesNGrams");
const lblComparisonResult = document.getElementById("lblComparisonResult");
const lblIdiotCompare = document.getElementById("lblIdiotCompare");
const searchLabel = document.getElementById("lblEnterSearch");
const lblIdiotCloseWords = document.getElementById("lblIdiotCloseWords");

const dbNameInput = document.getElementById("inputDbName");
const lemmaInput = document.getElementById("inputLemma");
const fileInput = document.getElementById("pickFile");
const fileInput1 = document.getElementById("pickSearchFiles");
const fileInputAnalyse = document.getElementById("pickAnalyseFiles");
const searchInput = document.getElementById("inputSearch");
const inputFilesNGrams = document.getElementById("inputFilesNGrams");
const inputCloseWordsNumber = document.getElementById("inputCloseWordsNumber");
const inputFirstWord = document.getElementById("inputFirstWord");
const inputSecondWord = document.getElementById("inputSecondWord");
const inputNumberNGrams = document.getElementById("inputNumberNGrams");

const selectDb = document.getElementById("selectDb");
const selectPartOfSpeech = document.getElementById("selectPartOfSpeech");
const selectNumber = document.getElementById("selectNumber");
const selectGender = document.getElementById("selectGender");
const selectCase = document.getElementById("selectCase");
const selectTime = document.getElementById("selectTime");
const selectType = document.getElementById("selectType");
const selectForm = document.getElementById("selectForm");
const selectDependency = document.getElementById("selectDependency");
const firstLetter = document.getElementById("selectLetter1");
const lastLetter = document.getElementById("selectLetter2");
const selectSearchParam = document.getElementById("selectSearchParam");
const selectFirstWordType = document.getElementById("selectFirstWordType");
const selectSecondWordType = document.getElementById("selectSecondWordType");
const selectNGrams = document.getElementById("selectNGrams");
const selectNumberNGrams = document.getElementById("selectNumberNGrams");

const textArea = document.getElementById("textArea");
const textArea1 = document.getElementById("text");
const searchArea = document.getElementById("searchArea");
const resultsArea = document.getElementById("resultsArea");
const NGramsArea = document.getElementById("areaNGrams");

const divGrammarTags = document.getElementById("divGrammarTags");
const divLimit = document.getElementById("divLimit");
const divDependency = document.getElementById("divDependency");
const divSeveralWords = document.getElementById("divSeveralWords");
const divPlusWords = document.getElementById("divPlusWords");
const divMinusWords = document.getElementById("divMinusWords");
const divCloseWordsResults = document.getElementById("divCloseWordsResults");

const table = document.getElementById("table");

const allowedFileFormats = ["docx", "epub", "fb2", "htm", "html", "odt", "pdf", "txt"];


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

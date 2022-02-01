const cells = document.querySelectorAll("td.day");
const switchButton = document.querySelector("#switch-button");
const groupLabel = document.querySelector("#group-label");

function fillCells() {
	for (let cell of cells) {
		if (cell.classList.contains("alg"))      cell.innerHTML = "Алгебра<br><a href=\"https://meet.google.com\" target=\"_blank\">math9a</a>";
		if (cell.classList.contains("geom"))     cell.innerHTML = "<a href=\"https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fmeetup-join%2F19%3Ameeting_YmQ5NTQwNjctOWU1MS00YTIyLWJkOTgtOGQ1ZjUzODdiOTBh%40thread.v2%2F0%3Fcontext%3D%257b%2522Tid%2522%253a%2522dcb67d46-35b2-47d7-a41c-5507eb550715%2522%252c%2522Oid%2522%253a%25225791b23c-5b53-43d9-ba6e-148f69067e68%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=91faddac-7f35-4076-ae59-2b6587f1c0d8&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true\" target=\"_blank\">Геометрия</a>";
		if (cell.classList.contains("phys"))     cell.innerHTML = "<a href=\"https://meet.google.com/vwj-wdra-zyb\">Физика</a>";
		if (cell.classList.contains("inf"))      cell.innerHTML = "<a href=\".\">Информатика</a>";
		if (cell.classList.contains("chem"))     cell.innerHTML = "<a href=\"https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fmeetup-join%2F19%3Ameeting_NmI1NzFkOTQtODQzNy00NTYwLTgzNWUtN2Y2OWFhMDMzYWI1%40thread.v2%2F0%3Fcontext%3D%257b%2522Tid%2522%253a%2522dcb67d46-35b2-47d7-a41c-5507eb550715%2522%252c%2522Oid%2522%253a%25223d589ed9-9b1d-49b1-bb75-cf6fe3a987aa%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=5c917b92-fe9f-41c8-8f6b-50137c2741fb&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true\" target=\"_blank\">Химия</a>";
		if (cell.classList.contains("rus"))      cell.innerHTML = "Русский язык<br><a href=\"https://meet.google.com\" target=\"_blank\">rus9</a>";
		if (cell.classList.contains("eng"))      cell.innerHTML = "<div><p>Английский язык</p><a href=\".\">Группа 1</a><a href=\"https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fmeetup-join%2F19%3Ameeting_NGZkYTYzM2EtYmU5OC00YjlhLThkYjEtNjIwYzM4ZDE3NDJi%40thread.v2%2F0%3Fcontext%3D%257b%2522Tid%2522%253a%2522dcb67d46-35b2-47d7-a41c-5507eb550715%2522%252c%2522Oid%2522%253a%252235fc9eed-eccc-4625-94f2-0e10d6f78a8a%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=c84bfa24-55d1-4f66-9c88-4fd03f506392&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true\">Группа 2</a><a href=\".\">Группа 3</a></div>";
		if (cell.classList.contains("hist"))     cell.innerHTML = "<a href=\".\">История</a>";
		if (cell.classList.contains("social"))   cell.innerHTML = "<a href=\".\">Обществознание</a>";
		if (cell.classList.contains("geog"))     cell.innerHTML = "<a href=\".\">География</a>";
		if (cell.classList.contains("bio"))      cell.innerHTML = "<a href=\"https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fmeetup-join%2F19%3Ameeting_NmQ1OTBlNjctN2MyMi00ZWU4LThiZTAtODEyNmQ0NDc2NGQw%40thread.v2%2F0%3Fcontext%3D%257b%2522Tid%2522%253a%2522dcb67d46-35b2-47d7-a41c-5507eb550715%2522%252c%2522Oid%2522%253a%25220395eb97-b8d0-44c0-af18-da4d3102e20e%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=d0be72d4-41ee-4cf3-84e0-9442452583ec&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true\" target=\"_blank\">Биология</a>";
		if (cell.classList.contains("lit"))      cell.innerHTML = "<a href=\"https://meet.google.com/mig-pnri-evm\" target=\"_blank\">Литература</a>";
		if (cell.classList.contains("pe"))       cell.innerHTML = "<a href=\".\">Физкультура</a>";
		if (cell.classList.contains("lyc-hour")) cell.innerHTML = "<a href=\".\">Лицейский час</a>";

		if (cell.classList.contains("sem"))      cell.innerHTML = cell.innerHTML.slice(0, -4).replace("<br>", " ") + "<br>(семинар)";
		if (cell.classList.contains("lect"))     cell.innerHTML = cell.innerHTML.slice(0, -4).replace("<br>", " ") + "<br>(лекция)";
		if (cell.classList.contains("oge"))      cell.innerHTML = cell.innerHTML.slice(0, -4).replace("<br>", " ") + "<br>(подготовка к ОГЭ)";
		if (cell.classList.contains("pract"))    cell.innerHTML = cell.innerHTML.slice(0, -4).replace("<br>", " ") + "<br>(практикум)";
		if (cell.classList.contains("spec"))     cell.innerHTML = cell.innerHTML.slice(0, -4).replace("<br>", " ") + "<br>(спецкурс)";
		if (cell.classList.contains("rewr"))     cell.innerHTML = cell.innerHTML.slice(0, -4).replace("<br>", " ") + "<br>(переписывание работ)";

		if (cell.innerHTML.includes(" <a")) cell.innerHTML = cell.innerHTML.slice(0, -4).replace("<br>", "</a><br>"); // <a> fix

		if (cell.classList.value == "day alg oge") cell.innerHTML = "Алгбебра <a href=\"https://meet.google.com\" target=\"_blank\">math9a</a><br>(подготовка к ОГЭ)"; // easter egg
	}
}

function changeClasses() {
	const lessons = document.querySelectorAll(".sem");
	for (let lesson of lessons) {
		if (lesson.classList.replace("rus", "inf"))  continue;
		if (lesson.classList.replace("inf", "geom")) continue;
		if (lesson.classList.replace("geom", "rus")) continue;
	}
}

fillCells();


function getCookie(name) {
	if (!document.cookie.includes(name)) return undefined;

	const nameIndex = document.cookie.indexOf(name);
	const valueStart = document.cookie.indexOf("=", nameIndex) + 1;
	const valueEnd = document.cookie.includes(";") ? document.cookie.indexOf(";", nameIndex) : undefined;
	return document.cookie.slice(valueStart, valueEnd);
}

function setCookie(name, value, maxAge = undefined) {
	document.cookie = `${name}=${value}` + ((maxAge === undefined) ? "" : `; max-age=${maxAge}`);
}

let group;
if (getCookie("group") === undefined) {
	group = 0;
	setCookie("group", group, 60*60*24*30*365*3); // three years
	groupLabel.textContent = `Текущая группа: ${group + 1}`;
} else {
	group = Number(getCookie("group"));
	for (let i = 0; i < group; i++) {
		changeClasses();
	}
	fillCells();
	groupLabel.textContent = `Текущая группа: ${group + 1}`;
}

switchButton.onclick = function() {
	for (let i = 0; i <= group; i++) {
		changeClasses();
	}
	fillCells();
	group = (group + 1) % 2;
	setCookie("group", group, 60*60*24*30*365*3); // three years
	groupLabel.textContent = `Текущая группа: ${group + 1}`;
}


const algBoard = document.querySelector("#alg-board");
const physBoard = document.querySelector("#phys-board");

algBoard.onclick = function() {
	window.open("https://idroo.com/board-h6X3Jk2W0L");
}
physBoard.onclick = function() {
	window.open("https://idroo.com/board-bprANv42NB");
}
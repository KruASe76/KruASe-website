const cells = document.querySelectorAll("td.day");
const switchButton = document.querySelector("#switch-button");
const groupLabel = document.querySelector("#group-label");

function fillCells() {
	for (let cell of cells) {
		if (cell.classList.contains("alg"))      cell.innerHTML = "<a href=\"https://meet.google.com/beg-sqeq-tyg\" target=\"_blank\">Алгебра</a>";
		if (cell.classList.contains("geom"))     cell.innerHTML = "<a href=\"https://meet.google.com/ezo-zfyi-kwx\" target=\"_blank\">Геометрия</a>";
		if (cell.classList.contains("phys"))     cell.innerHTML = "<a href=\".\">Физика</a>";
		if (cell.classList.contains("inf"))      cell.innerHTML = "<a href=\".\">Информатика</a>";
		if (cell.classList.contains("chem"))     cell.innerHTML = "<a href=\".\">Химия</a>";
		if (cell.classList.contains("rus"))      cell.innerHTML = "<a href=\"https://meet.google.com/nzm-kupu-khp\" target=\"_blank\">Русский язык</a>";
		if (cell.classList.contains("eng"))      cell.innerHTML = "<div><p>Английский язык</p><a href=\".\">Группа 1</a><a href=\".\">Группа 2</a><a href=\".\">Группа 3</a></div>";
		if (cell.classList.contains("hist"))     cell.innerHTML = "<a href=\".\">История</a>";
		if (cell.classList.contains("social"))   cell.innerHTML = "<a href=\".\">Обществознание</a>";
		if (cell.classList.contains("geog"))     cell.innerHTML = "<a href=\".\">География</a>";
		if (cell.classList.contains("bio"))      cell.innerHTML = "<a href=\".\">Биология</a>";
		if (cell.classList.contains("lit"))      cell.innerHTML = "<a href=\".\">Литература</a>";
		if (cell.classList.contains("pe"))       cell.innerHTML = "<a href=\".\">Физкультура</a>";
		if (cell.classList.contains("lyc-hour")) cell.innerHTML = "<a href=\".\">Лицейский час</a>";

		if (cell.classList.contains("sem"))      cell.innerHTML = cell.innerHTML.slice(0, -4) + "<br>(семинар)";
		if (cell.classList.contains("lect"))     cell.innerHTML = cell.innerHTML.slice(0, -4) + "<br>(лекция)";
		if (cell.classList.contains("oge"))      cell.innerHTML = cell.innerHTML.slice(0, -4) + "<br>(подготовка к ОГЭ)";
		if (cell.classList.contains("pract"))    cell.innerHTML = cell.innerHTML.slice(0, -4) + "<br>(практикум)";
		if (cell.classList.contains("spec"))     cell.innerHTML = cell.innerHTML.slice(0, -4) + "<br>(спецкурс)";
		if (cell.classList.contains("rewr"))     cell.innerHTML = cell.innerHTML.slice(0, -4) + "<br>(переписывание работ)";

		if (cell.classList.value == "day alg oge") cell.innerHTML = "<a href=\"https://meet.google.com/beg-sqeq-tyg\" target=\"_blank\">Алгбебра<br>(подготовка к ОГЭ)</a>";
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
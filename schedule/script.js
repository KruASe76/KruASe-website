const cells = document.querySelectorAll("td.day");
const switchButton = document.querySelector("#switch-button");
const groupLabel = document.querySelector("#group-label");

function fillCells() {
	for (let cell of cells) {
		if (cell.classList.contains("alg"))      cell.textContent = "Алгебра";
		if (cell.classList.contains("geom"))     cell.textContent = "Геометрия";
		if (cell.classList.contains("phys"))     cell.textContent = "Физика";
		if (cell.classList.contains("inf"))      cell.textContent = "Информатика";
		if (cell.classList.contains("chem"))     cell.textContent = "Химия";
		if (cell.classList.contains("rus"))      cell.textContent = "Русский язык";
		if (cell.classList.contains("eng"))      cell.textContent = "Английский язык";
		if (cell.classList.contains("hist"))     cell.textContent = "История";
		if (cell.classList.contains("social"))   cell.textContent = "Обществознание";
		if (cell.classList.contains("geog"))     cell.textContent = "География";
		if (cell.classList.contains("bio"))      cell.textContent = "Биология";
		if (cell.classList.contains("lit"))      cell.textContent = "Литература";
		if (cell.classList.contains("pe"))       cell.textContent = "Физкультура";
		if (cell.classList.contains("lyc-hour")) cell.textContent = "Лицейский час";

		if (cell.classList.contains("sem"))      cell.textContent += "\n(семинар)";
		if (cell.classList.contains("lect"))     cell.textContent += "\n(лекция)";
		if (cell.classList.contains("oge"))      cell.textContent += "\n(подготовка к ОГЭ)";
		if (cell.classList.contains("pract"))    cell.textContent += "\n(практикум)";
		if (cell.classList.contains("spec"))     cell.textContent += "\n(спецкурс)";
		if (cell.classList.contains("rewr"))     cell.textContent += "\n(переписывание работ)";
		
		cell.innerHTML = cell.innerHTML.replace(/\n/gi, '<br>');
	}
}

function changeClasses() {
	const lessons = document.querySelectorAll(".sem");
	for (lesson of lessons) {
		if (lesson.classList.replace("rus", "inf")) continue;
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
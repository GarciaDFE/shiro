const $menu = document.querySelector(".menu");
const $btnOpenMenu = document.querySelector(".btnMenuOpen");
const $btnCloseMenu = document.querySelector(".btnMenuClose");

function clickBtnOpenMenu() {
	$menu.classList.add("menu-open");
	$btnOpenMenu.classList.remove("imgBtnOpen");
	event.preventDefault();
}

function clickBtnCloseMenu() {
	$menu.classList.remove("menu-open");
	$btnOpenMenu.classList.add("imgBtnOpen");
	event.preventDefault();
}

$btnOpenMenu.addEventListener("click", clickBtnOpenMenu);
$btnCloseMenu.addEventListener("click", clickBtnCloseMenu);
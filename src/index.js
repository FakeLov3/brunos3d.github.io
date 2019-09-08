const RepoList = require("./components/RepoList");

// void Start =]
$(document).ready(function () {
	const today = new Date();
	const year = today.getFullYear();
	$("#timestamp").text(`© 2019 - ${year}`);

	// evita que a navbar inicialize transparente quando o scroll não for igual a 0
	const navbar = $("#navbar");
	const scrollPos = $(document).scrollTop();

	const scrollDynamic = $(".scroll-dynamic");
	scrollDynamic.toggleClass("scrolled", scrollPos > navbar.height());
});

$(".nav-link").on("click", function () {
	$(".nav-link.active").removeClass("active");
	$(this).addClass("active");
});

$("#button-scroll-top").on("click", function () {
	window.location.href = "#";
	$(".nav-link.active").removeClass("active");
	$('a[href="#"]').addClass("active");
});

let lastSearch = "";
let searchNavCounter = 0;
$("#search-form").submit(function (event) {
	event.preventDefault();
	const search = $("#search").val();

	if (!search) return;

	// console.log("Realizando Busca:", search);

	if (lastSearch == search) {
		searchNavCounter++;
	}
	else {
		lastSearch = search;
		searchNavCounter = 0;
	}

	const elements = $("h1, h2, p, a, label").filter(function () {
		return $(this).text().toLowerCase().indexOf(search.toLowerCase()) >= 0;
	});

	if (searchNavCounter >= elements.length) {
		searchNavCounter = 0;
	}

	const element = elements.eq(searchNavCounter);

	if (element && element.offset()) {
		// console.log("Encontrado", element);
		$(document).scrollTop(element.offset().top - 200);
	}
	else {
		// console.log("Não Encontrado");
	}
});
$("#contact-form").submit(function (event) {
	event.preventDefault();

	const fname = $("#fname").val();
	const lname = $("#lname").val();
	const subject = $("#subject").val();

	//mailto:bruno3dcontato@gmail.com?subject=whatever&body=whatever2
	const URI = `mailto:bruno3dcontato@gmail.com?subject=Portfolio%20Contato:%20${encodeURIComponent(fname)}%20${encodeURIComponent(lname)}&body=${encodeURIComponent(subject)}`;

	window.open(URI, "_blank");
});

$(document).scroll(function () {
	const navbar = $("#navbar");
	const scrollPos = $(document).scrollTop();

	const scrollDynamic = $(".scroll-dynamic");
	scrollDynamic.toggleClass("scrolled", scrollPos > navbar.height());

	if (scrollPos > 400) {
		// navbar.css("top", `${-(scrollPos - 400)}px`);

		// display back to top button
		$("#button-scroll-top").css("display", "block");
	} else {
		// navbar.css("top", "0");

		// hide back to top button
		$("#button-scroll-top").css("display", "none");
	}
});

async function renderComponents() {
	await RepoList.Render();
}

renderComponents();
//Sayfadan biraz assagi inince Header daha koyu olur
window.addEventListener("scroll", () => {
	const header = document.getElementById("site-header");
	if (window.scrollY > 50) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
});

//Bulundugumuz bolumu navigation linkde vurgulama

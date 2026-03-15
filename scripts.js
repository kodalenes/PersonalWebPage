//Sayfadan biraz assagi inince navigation bar koyulasir
function navLinksEffect() {
	//Bulundugumuz bolumu navigation linkde vurgulama
	const sections = document.querySelectorAll("section[id]");
	const navLinks = document.querySelectorAll(".nav-links a");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					navLinks.forEach((link) => {
						link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
					});
				}
			});
		},
		{ threshold: 0.6 },
	);

	sections.forEach((s) => observer.observe(s));
}

//Projeleri filtrelemee secenekleri
function filterProjectCards() {
	const filterBtns = document.querySelectorAll(".project-filter-btn");
	const projectCards = document.querySelectorAll(".project-card");

	filterBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const isActive = btn.classList.contains("active");

			filterBtns.forEach((b) => b.classList.remove("active"));

			if (isActive && btn.dataset.filter !== "all") {
				document.querySelector('[data-filter = "all"]').classList.add("active");
				projectCards.forEach((card) => (card.style.display = "flex"));
				return;
			}

			btn.classList.add("active");
			const filter = btn.dataset.filter;

			projectCards.forEach((card) => {
				const tag = card.querySelector(".project-tag").textContent;
				if (filter === "all" || tag.includes(filter)) {
					card.style.display = "flex";
				} else {
					card.style.display = "none";
				}
			});
		});
	});
}

//Sayfayi assagi kaydirinca en uste cik butonu ekler
function addScrollToTopButton() {
	const scrollTopBtn = document.createElement("button");
	scrollTopBtn.textContent = "↑";
	scrollTopBtn.id = "scroll-top-btn";
	document.body.appendChild(scrollTopBtn);

	//Tiklaninca en uste goturme
	scrollTopBtn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}

function typewriterEffect() {
	const element = document.querySelector("#typewriter");
	const text = element.textContent;

	let charIndex = 0;

	element.textContent = "";
	const timer = setInterval(() => {
		if (charIndex < text.length) {
			element.textContent += text[charIndex];
			charIndex++;
		} else {
			clearInterval(timer);
			element.id = "";
		}
	}, 50);
}

function scrollAnimReveal() {
	const elements = document.querySelectorAll(".skills-card , .stat-item  , .project-card");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15 },
	);

	elements.forEach((el) => observer.observe(el));
}

function onScroll() {
	let ticking = false;

	window.addEventListener("scroll", () => {
		if (!ticking) {
			requestAnimationFrame(() => {
				const scrollY = window.scrollY;
				const header = document.getElementById("site-header");
				const scrollTopBtn = document.getElementById("scroll-top-btn");

				header.classList.toggle("scrolled", scrollY > 50);

				scrollTopBtn.style.display = scrollY > 300 ? "block" : "none";

				ticking = false;
			});
			ticking = true;
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	navLinksEffect();
	filterProjectCards();
	addScrollToTopButton();
	typewriterEffect();
	scrollAnimReveal();
	onScroll();
});

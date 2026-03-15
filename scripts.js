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

//Projeler bölümüne "Java", "HTML/CSS" butonları ekle. Tıklanınca sadece o tag'e sahip kartlar görünsün.
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

//Sayfanin en altina inince cikacak  uste cik butonu
//Butonu olusturma
const scrollTopBtn = document.createElement("button");
scrollTopBtn.textContent = "↑";
scrollTopBtn.id = "scroll-top-btn";
document.body.appendChild(scrollTopBtn);

//Scroll u dinleme ve butonu gosterme
window.addEventListener("scroll", () => {
	if (window.scrollY > 300) {
		scrollTopBtn.style.display = "block";
	} else {
		scrollTopBtn.style.display = "none";
	}
});

//Tiklaninca en uste goturme
scrollTopBtn.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

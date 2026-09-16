document.addEventListener("DOMContentLoaded", () => {
	const menuToggle = document.querySelector(".menu-toggle");
	const navigation = document.querySelector(".site-nav");
	const year = document.querySelector("#current-year");
	const revealItems = document.querySelectorAll(".reveal");
	const sections = document.querySelectorAll("main section[id]");
	const navLinks = document.querySelectorAll(".site-nav a[href^='#']");

	if (year) {
		year.textContent = new Date().getFullYear();
	}

	const closeMenu = () => {
		if (!menuToggle || !navigation) return;
		navigation.classList.remove("open");
		menuToggle.classList.remove("open");
		menuToggle.setAttribute("aria-expanded", "false");
	};

	if (menuToggle && navigation) {
		menuToggle.addEventListener("click", () => {
			const isOpen = navigation.classList.toggle("open");
			menuToggle.classList.toggle("open", isOpen);
			menuToggle.setAttribute("aria-expanded", String(isOpen));
		});

		navigation.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", closeMenu);
		});
	}

	if ("IntersectionObserver" in window) {
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });
		revealItems.forEach((item) => revealObserver.observe(item));

		const sectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				navLinks.forEach((link) => {
					link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
				});
			});
		}, { rootMargin: "-25% 0px -65% 0px" });
		sections.forEach((section) => sectionObserver.observe(section));
	} else {
		revealItems.forEach((item) => item.classList.add("visible"));
	}
});

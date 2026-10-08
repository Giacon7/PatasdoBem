/* =========================================================
   PATAS DO BEM
   SCRIPT.JS — INTERAÇÕES
========================================================= */


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 700);

});


/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("open");

    });


    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

        });

    });

}


/* =========================================================
   HEADER AO ROLAR
========================================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   CONTADORES
========================================================= */

const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const element = entry.target;

            const target = Number(
                element.getAttribute("data-counter")
            );

            let current = 0;

            const duration = 1400;

            const increment = target / (duration / 16);


            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    element.textContent = target;

                    return;

                }

                element.textContent = Math.floor(current);

                requestAnimationFrame(updateCounter);

            };


            updateCounter();

            counterObserver.unobserve(element);

        });

    },
    {
        threshold: 0.5
    }
);


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================================
   FILTROS DE ADOÇÃO
========================================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const dogCards = document.querySelectorAll(".dog-card");
const dogSearch = document.getElementById("dogSearch");
const noResults = document.getElementById("noResults");

let currentFilter = "todos";


function filterDogs() {

    const searchTerm = dogSearch
        ? dogSearch.value.toLowerCase().trim()
        : "";

    let visibleCards = 0;


    dogCards.forEach(card => {

        const category = card.dataset.category;
        const name = card.dataset.name.toLowerCase();


        const matchesCategory =
            currentFilter === "todos" ||
            category === currentFilter;


        const matchesSearch =
            name.includes(searchTerm);


        if (matchesCategory && matchesSearch) {

            card.style.display = "";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    if (noResults) {

        if (visibleCards === 0) {

            noResults.classList.add("show");

        } else {

            noResults.classList.remove("show");

        }

    }

}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        filterDogs();

    });

});


if (dogSearch) {

    dogSearch.addEventListener(
        "input",
        filterDogs
    );

}


/* =========================================================
   FAVORITOS
========================================================= */

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

const toast =
    document.getElementById("toast");


favoriteButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();

        button.classList.toggle("active");


        if (button.classList.contains("active")) {

            button.textContent = "♥";

            showToast("Adicionado aos favoritos!");

        } else {

            button.textContent = "♡";

            showToast("Removido dos favoritos.");

        }

    });

});


function showToast(message) {

    if (!toast) {
        return;
    }

    const toastText =
        toast.querySelector("p");

    toastText.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================================
   MODAL DE ADOÇÃO
========================================================= */

const adoptionModal =
    document.getElementById("adoptionModal");

const modalClose =
    document.getElementById("modalClose");

const modalDogText =
    document.getElementById("modalDogText");

const adoptButtons =
    document.querySelectorAll(".adopt-btn");


let selectedDog = "";


adoptButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedDog =
            button.dataset.dog;


        modalDogText.textContent =
            `Você demonstrou interesse em adotar ${selectedDog}. Queremos conhecer você e entender se podemos construir uma nova história juntos.`;


        adoptionModal.classList.add("show");

        document.body.classList.add("no-scroll");

    });

});


function closeAdoptionModal() {

    adoptionModal.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeAdoptionModal
    );

}


const modalOverlay =
    document.querySelector(".modal-overlay");

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeAdoptionModal
    );

}


/* =========================================================
   FORMULÁRIO DE ADOÇÃO
========================================================= */

const adoptionForm =
    document.getElementById("adoptionForm");


if (adoptionForm) {

    adoptionForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "adoptionName"
                ).value;


            closeAdoptionModal();

            adoptionForm.reset();


            setTimeout(() => {

                showToast(
                    `Obrigado, ${name}! Seu interesse foi registrado. ❤️`
                );

            }, 350);

        }
    );

}


/* =========================================================
   GALERIA
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const imageModal =
    document.getElementById("imageModal");

const expandedImage =
    document.getElementById("expandedImage");

const imageModalClose =
    document.getElementById("imageModalClose");


galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image =
            item.dataset.image;


        expandedImage.src = image;

        imageModal.classList.add("show");

        document.body.classList.add("no-scroll");

    });

});


function closeImageModal() {

    imageModal.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


if (imageModalClose) {

    imageModalClose.addEventListener(
        "click",
        closeImageModal
    );

}


if (imageModal) {

    imageModal.addEventListener(
        "click",
        event => {

            if (
                event.target === imageModal
            ) {

                closeImageModal();

            }

        }
    );

}


/* =========================================================
   ESC PARA FECHAR MODAIS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeAdoptionModal();

            closeImageModal();

        }

    }
);


/* =========================================================
   DEPOIMENTOS
========================================================= */

const testimonials =
    document.querySelectorAll(".testimonial");

const prevTestimonial =
    document.getElementById(
        "prevTestimonial"
    );

const nextTestimonial =
    document.getElementById(
        "nextTestimonial"
    );


let testimonialIndex = 0;


function showTestimonial(index) {

    testimonials.forEach(
        testimonial => {

            testimonial.classList.remove(
                "active"
            );

        }
    );


    testimonials[index].classList.add(
        "active"
    );

}


if (nextTestimonial) {

    nextTestimonial.addEventListener(
        "click",
        () => {

            testimonialIndex++;

            if (
                testimonialIndex >=
                testimonials.length
            ) {

                testimonialIndex = 0;

            }

            showTestimonial(
                testimonialIndex
            );

        }
    );

}


if (prevTestimonial) {

    prevTestimonial.addEventListener(
        "click",
        () => {

            testimonialIndex--;

            if (testimonialIndex < 0) {

                testimonialIndex =
                    testimonials.length - 1;

            }

            showTestimonial(
                testimonialIndex
            );

        }
    );

}


/* =========================================================
   AUTO SLIDE DEPOIMENTOS
========================================================= */

setInterval(() => {

    if (
        testimonials.length > 0 &&
        !document.hidden
    ) {

        testimonialIndex++;

        if (
            testimonialIndex >=
            testimonials.length
        ) {

            testimonialIndex = 0;

        }

        showTestimonial(
            testimonialIndex
        );

    }

}, 6000);


/* =========================================================
   FAQ
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(
            ".faq-question"
        );

    const answer =
        item.querySelector(
            ".faq-answer"
        );


    question.addEventListener(
        "click",
        () => {

            const isOpen =
                item.classList.contains(
                    "open"
                );


            faqItems.forEach(otherItem => {

                otherItem.classList.remove(
                    "open"
                );

                const otherAnswer =
                    otherItem.querySelector(
                        ".faq-answer"
                    );

                otherAnswer.style.maxHeight =
                    null;

            });


            if (!isOpen) {

                item.classList.add("open");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        }
    );

});


/* =========================================================
   FORMULÁRIO DE CONTATO
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formSuccess =
    document.getElementById(
        "formSuccess"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            formSuccess.classList.add(
                "show"
            );


            showToast(
                "Mensagem enviada com sucesso! ❤️"
            );


            contactForm.reset();


            setTimeout(() => {

                formSuccess.classList.remove(
                    "show"
                );

            }, 5000);

        }
    );

}


/* =========================================================
   BOTÕES "COMO AJUDAR"
========================================================= */

const helpActions =
    document.querySelectorAll(
        ".help-action"
    );


helpActions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const type =
                button.dataset.help;


            const messages = {

                doacao:
                    "Obrigado por querer ajudar através de uma doação! ❤️",

                lar:
                    "Que lindo! Oferecer um lar temporário pode salvar uma vida. 🏡",

                voluntario:
                    "Obrigado por querer fazer parte do nosso time! 🤝"

            };


            showToast(
                messages[type] ||
                "Obrigado por querer ajudar!"
            );


            setTimeout(() => {

                document
                    .getElementById("contato")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }, 600);

        }
    );

});


/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 600) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   MODO ESCURO
========================================================= */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


const savedTheme =
    localStorage.getItem(
        "patas-theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    themeToggle.textContent = "☀️";

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            themeToggle.textContent =
                isDark ? "☀️" : "🌙";


            localStorage.setItem(
                "patas-theme",
                isDark ? "dark" : "light"
            );

        }
    );

}


/* =========================================================
   COOKIES
========================================================= */

const cookieBanner =
    document.getElementById(
        "cookieBanner"
    );

const acceptCookies =
    document.getElementById(
        "acceptCookies"
    );


const cookiesAccepted =
    localStorage.getItem(
        "patas-cookies"
    );


if (cookiesAccepted === "true") {

    cookieBanner.classList.add(
        "hidden"
    );

}


if (acceptCookies) {

    acceptCookies.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "patas-cookies",
                "true"
            );

            cookieBanner.classList.add(
                "hidden"
            );

        }
    );

}


/* =========================================================
   NAVEGAÇÃO ATIVA
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const navObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );

                });


                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${entry.target.id}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add(
                        "active"
                    );

                }

            });

        },
        {
            rootMargin:
                "-30% 0px -60% 0px"
        }
    );


sections.forEach(section => {

    navObserver.observe(section);

});


/* =========================================================
   FECHA MENU AO REDIRECIONAR
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (nav) {

                    nav.classList.remove(
                        "open"
                    );

                }

            }
        );

    });
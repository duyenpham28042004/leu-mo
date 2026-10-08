/* =====================================================
   LỀU MƠ
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ================= HEADER ================= */

    const header = document.getElementById("header");

    function updateHeader() {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* ================= MOBILE MENU ================= */

    const mobileToggle =
        document.getElementById("mobileToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    mobileToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        mobileToggle.classList.toggle("active");

    });


    /* Close menu after click */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            mobileToggle.classList.remove("active");

        });

    });


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

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


    /* ================= BOOKING FORM ================= */

    const bookingForm =
        document.getElementById("bookingForm");

    const bookingPopup =
        document.getElementById("bookingPopup");

    const popupClose =
        document.getElementById("popupClose");

    const popupOverlay =
        document.querySelector(".popup-overlay");


    bookingForm.addEventListener("submit", async event => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const people =
        document.getElementById("people").value;

    /* Kiểm tra */

    if (!name || !phone || !date || !time || !people) {

        alert("Vui lòng điền đầy đủ thông tin đặt bàn.");

        return;

    }

    /* Kiểm tra số điện thoại */

    const phoneRegex =
        /^(0|\+84)[0-9]{9,10}$/;

    if (!phoneRegex.test(phone)) {

        alert("Vui lòng nhập số điện thoại hợp lệ.");

        return;

    }

    /* Gửi thông tin đến Formspree */

    try {

        const response = await fetch(
            bookingForm.action,
            {
                method: "POST",
                body: new FormData(bookingForm),
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (response.ok) {

            bookingPopup.classList.add("active");

            document.body.style.overflow = "hidden";

            bookingForm.reset();

        } else {

            alert(
                "Không gửi được yêu cầu. Vui lòng thử lại hoặc gọi 0358 444 375."
            );

        }

    } catch (error) {

        alert(
            "Có lỗi kết nối. Vui lòng thử lại hoặc gọi 0358 444 375."
        );

    }

});


    /* ================= CLOSE POPUP ================= */

    function closePopup() {

        bookingPopup.classList.remove("active");

        document.body.style.overflow = "";

    }


    popupClose.addEventListener("click", closePopup);

    popupOverlay.addEventListener("click", closePopup);


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closePopup();

        }

    });


    /* ================= DATE ================= */

    const dateInput =
        document.getElementById("date");


    const today =
        new Date().toISOString().split("T")[0];


    dateInput.min = today;


    /* ================= SMOOTH ANCHOR ================= */

    document.querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", function(event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId === "#" ||
                    !document.querySelector(targetId)
                ) {
                    return;
                }

                event.preventDefault();


                const target =
                    document.querySelector(targetId);


                const headerHeight =
                    header.offsetHeight;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        });


    /* ================= PARALLAX HERO ================= */

    const hero =
        document.querySelector(".hero");


    window.addEventListener("scroll", () => {

        if (window.innerWidth > 700) {

            const scroll =
                window.scrollY;

            if (scroll < window.innerHeight) {

                hero.style.backgroundPosition =
                    `center ${scroll * 0.25}px`;

            }

        }

    });


    /* ================= GALLERY ================= */

    const galleryImages =
        document.querySelectorAll(".gallery-item img");


    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            const overlay =
                document.createElement("div");

            overlay.style.position = "fixed";
            overlay.style.inset = "0";
            overlay.style.background = "rgba(0,0,0,.94)";
            overlay.style.zIndex = "3000";
            overlay.style.display = "flex";
            overlay.style.alignItems = "center";
            overlay.style.justifyContent = "center";
            overlay.style.padding = "30px";
            overlay.style.cursor = "zoom-out";


            const fullImage =
                document.createElement("img");

            fullImage.src = image.src;

            fullImage.alt = image.alt;

            fullImage.style.maxWidth = "100%";
            fullImage.style.maxHeight = "90vh";
            fullImage.style.width = "auto";
            fullImage.style.objectFit = "contain";


            overlay.appendChild(fullImage);

            document.body.appendChild(overlay);

            document.body.style.overflow = "hidden";


            overlay.addEventListener("click", () => {

                overlay.remove();

                document.body.style.overflow = "";

            });

        });

    });


    /* ================= ACTIVE NAV ================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".desktop-menu a");


    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.style.color = "";

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.style.color = "#c9984c";

            }

        });

    });
    /* ================= CHỌN MÓN ================= */

const foodCards =
    document.querySelectorAll(".food-card");

const selectedFoods =
    document.getElementById("selectedFoods");

const selectedFoodsTotal =
    document.getElementById("selectedFoodsTotal");

const orderInput =
    document.getElementById("order");

const cart = {};


/* ================= GIỎ HÀNG NỔI ================= */

const floatingCart =
    document.getElementById("floatingCart");

/* Bấm giỏ → đi xuống phần đặt bàn */

floatingCart.addEventListener("click", () => {

    const bookingSection =
        document.getElementById("booking");

    if (bookingSection) {

        bookingSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

});


/* ================= TẠO NÚT CHỌN ================= */

foodCards.forEach(card => {

    const name =
        card.querySelector("h3").textContent.trim();

    const priceText =
        card.querySelector(".price").textContent.trim();

    const price =
        parseInt(priceText.replace(/\D/g, ""));

    const foodInfo =
        card.querySelector(".food-info");


    const button =
        document.createElement("button");

    button.type = "button";

    button.className =
        "food-select-btn";

    button.textContent =
        "+ Chọn món";


    foodInfo.appendChild(button);


    button.addEventListener("click", () => {

        if (!cart[name]) {

            cart[name] = {
                price: price,
                quantity: 1,
                button: button
            };

        } else {

            cart[name].quantity++;

        }


        updateCart();

        updateFoodButton(name);

    });

});


/* ================= CẬP NHẬT NÚT MÓN ================= */

function updateFoodButton(name) {

    const item = cart[name];

    if (!item) return;


    item.button.textContent =
        `✓ Đã chọn · ${item.quantity}`;

    item.button.classList.add("selected");

}


/* ================= CẬP NHẬT GIỎ ================= */

function updateCart() {

    selectedFoods.innerHTML = "";

    let total = 0;

    let totalQuantity = 0;

    const items =
        Object.entries(cart);


    if (items.length === 0) {

        selectedFoods.textContent =
            "Chưa chọn món nào.";

        selectedFoodsTotal.textContent =
            "0K";

        orderInput.value = "";

        floatingCart.classList.remove("active");

        return;

    }


    items.forEach(([name, item]) => {

        const row =
            document.createElement("div");

        row.className =
            "selected-food-row";


        const subtotal =
            item.price * item.quantity;


        total += subtotal;

        totalQuantity += item.quantity;


        row.innerHTML = `

            <span class="selected-food-name">
                ${name}
            </span>

            <span class="selected-food-quantity">
                × ${item.quantity}
            </span>

            <strong>
                ${subtotal}K
            </strong>

            <button
                type="button"
                class="remove-food"
            >
                −
            </button>

        `;


        row.querySelector(".remove-food")
            .addEventListener("click", () => {

                item.quantity--;


                if (item.quantity <= 0) {

    /* Nếu là món ăn */
    if (item.button) {

        item.button.textContent =
            "+ Chọn món";

        item.button.classList.remove(
            "selected"
        );

    }

    /* Nếu là combo */
    else {

        const comboCards =
            document.querySelectorAll(".combo-card");

        comboCards.forEach(combo => {

            const comboName =
                combo.querySelector(
                    ".combo-text strong"
                ).textContent.trim();

            if (comboName === name) {

                const comboButton =
                    combo.querySelector(
                        ".combo-select-btn"
                    );

                if (comboButton) {

                    comboButton.textContent =
                        "+ Chọn combo";

                    comboButton.classList.remove(
                        "selected"
                    );

                }

            }

        });

    }

    delete cart[name];

} else {

    if (item.button) {

        updateFoodButton(name);

    }

}


                updateCart();

            });


        selectedFoods.appendChild(row);

    });


    selectedFoodsTotal.textContent =
        `${total}K`;


    orderInput.value =
        items.map(([name, item]) => {

            const subtotal =
                item.price * item.quantity;

            return `${name} x ${item.quantity} - ${subtotal}K`;

        }).join("\n")
        + `\nTạm tính: ${total}K`;


    /* Cập nhật giỏ nổi */

    document.getElementById(
        "floatingCartCount"
    ).textContent =
        `${totalQuantity} món`;


    document.getElementById(
        "floatingCartTotal"
    ).textContent =
        `${total}K`;


    floatingCart.classList.add("active");

}

/* ================= CHỌN COMBO ================= */

const comboCards = document.querySelectorAll(".combo-card");

comboCards.forEach(combo => {

    const button = combo.querySelector(".combo-select-btn");

    if (!button) return;

    button.addEventListener("click", () => {

        const name =
            combo.querySelector(".combo-text strong").textContent.trim();

        const priceText =
            combo.querySelector(".combo-action span").textContent.trim();

        const price =
            parseInt(priceText.replace(/\D/g, ""), 10);

        if (cart[name]) {

            cart[name].quantity++;

        } else {

            cart[name] = {
                price: price,
                quantity: 1
            };

        }

        button.textContent =
            `✓ Đã chọn · ${cart[name].quantity}`;

        button.classList.add("selected");

        updateCart();

    });

});
/* ================= KẾT THÚC ================= */

});
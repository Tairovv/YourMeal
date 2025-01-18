document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.main_slider');
    const rangeInput = document.querySelector('.slider-range');
    const icons = document.querySelector('.icons');
    const buttons = icons.querySelectorAll('button')
    const contentItems = document.querySelectorAll('.content-item');
    const iconCount = icons.children.length;
    const iconWidth = icons.children[0].clientWidth;
    const maxScrollWidth = (iconWidth + 5) * iconCount - slider.clientWidth;


    rangeInput.addEventListener('input', (e) => {
        const value = e.target.value;
        const scrollAmount = (value / 100) * maxScrollWidth;
        icons.style.transform = `translateX(-${scrollAmount}px)`;
    });
  
    icons.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const contentId = e.target.getAttribute('data-content');
            buttons.forEach(button => {
                button.classList.remove('active');
            });
            e.target.classList.add('active');
            contentItems.forEach(item => {
                item.classList.remove('active');
                if (item.id === contentId) {
                    item.classList.add('active');
                }
            });
        }
    });


    contentItems[0].classList.add('active');
});

let cart = [];

function addToCart(name, price, src, gram) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, src, gram, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-items';

        cartItem.innerHTML = `
            <img src="${item.src}" alt="${item.name}">
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-weight">${item.gram}</span>
                <span class="item-price">${item.price}СУМ</span>
            </div>
            <div class="item-quantity">
                <button onclick="decreaseQuantity('${item.name}')">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity('${item.name}')">+</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    document.querySelector('.total-price').textContent = `${total}СУМ`;
    document.querySelector('.item-count').textContent = itemCount;
}

function increaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.name !== name);
    }
    updateCart();
}

function toggleCart() {
    const cartContainer = document.querySelector('.cart-body');
    cartContainer.classList.toggle('hidden');
}

document.querySelector('.cart-container').addEventListener('click', (event) => {
    if (!event.target.classList.contains('delivery-button')) {
        const cartBody = document.querySelector('.cart-body');
        if (cartBody.classList.contains('hidden')) {
            cartBody.classList.remove('hidden');
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
   function createProductModal(productData) {

        const modal = document.createElement("div");
        modal.id = "dynamicProductModal";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${productData.name}</h2>
                <img src="${productData.image}" alt="${productData.name}">
                <p>${productData.description}</p>
                <div class="modal-footer">
                    <button class="btn" onclick="addToCart('${productData.name}', '${productData.price}', '${productData.image}', '${productData.gram}')">Добавить</button>
                    <div class="quantity">
                        <button class="quantity-btn" id="decrease">-</button>
                        <input type="number" id="quantity" value="1" min="1">
                        <button class="quantity-btn" id="increase">+</button>
                    </div>
                    <span class="price">${productData.price}СУМ </span>
                </div>
            </div>

            
        `;

        modal.style.display = "none";


        document.body.appendChild(modal);


        const closeButton = modal.querySelector(".close");
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        modal.style.display = "block";
        const decreaseBtn = modal.querySelector("#decrease");
        const increaseBtn = modal.querySelector("#increase");
        const quantityInput = modal.querySelector("#quantity");

        decreaseBtn.addEventListener("click", () => {
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) {
                quantityInput.value = currentQuantity - 1;
            }
        });

        increaseBtn.addEventListener("click", () => {
            let currentQuantity = parseInt(quantityInput.value);
            quantityInput.value = currentQuantity + 1;
        });

    }


    function handleMenuItems(menuItems) {
        menuItems.forEach((menuItem) => {
            menuItem.addEventListener("click", () => {
                const productData = {
                    name: menuItem.getAttribute("data-name"),
                    image: menuItem.getAttribute("data-image"),
                    description: menuItem.getAttribute("data-description"),
                    price: menuItem.getAttribute("data-price"),
                    gram: menuItem.getAttribute("data-gram")
                };
                createProductModal(productData);
            });
        });
    }


    const tabs = document.querySelectorAll(".content-item");

    tabs.forEach(tab => {
        const menuItems = tab.querySelectorAll(".menu-item-details");
        handleMenuItems(menuItems);
    });

    
});

document.addEventListener('DOMContentLoaded', () => {
    function createDeliveryModal() {

        const existingModal = document.getElementById("dynamicDeliveryModal");
        if (existingModal) {
            existingModal.remove();
        }


        const modal = document.createElement("div");
        modal.id = "dynamicDeliveryModal";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Доставка</h2>
                <form>
                    <input type="text" placeholder="Ваше имя" required>
                    <input type="text" placeholder="Телефон" required>
                    <label>
                        <input type="radio" name="delivery" value="pickup" required> Самовывоз
                    </label>
                    <label>
                        <input type="radio" name="delivery" value="delivery" checked required> Доставка
                    </label>
                    <input type="text" placeholder="Улица, дом, квартира" required>
                    <div class="form-group">
                        <input type="text" placeholder="Этаж" required>
                        <input type="text" placeholder="Домофон">
                    </div>
                    <button type="submit" class="btn">Оформить</button>
                </form>
            </div>
        `;


        document.body.appendChild(modal);

        const closeButton = modal.querySelector(".close");
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });


        modal.style.display = "block";
    }


    const tabs = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        const menuItems = tab.querySelectorAll(".menu-item");
        handleMenuItems(menuItems);
    });


    const checkoutButton = document.querySelector(".checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", createDeliveryModal);
    }
});

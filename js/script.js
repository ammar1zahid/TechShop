document.addEventListener("DOMContentLoaded", function () {
  // Fetch products from inventory.json
  fetch("/json/inventory.json")
    .then((response) => response.json())
    .then((data) => {
      const productContainer = document.getElementById("product-container");
      if (!productContainer) {
        console.error("Error: product-container element not found.");
        return;
      }

      let productsHTML = "";

      data.products.forEach((product) => {
        productsHTML += `
          <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p class="price">$ ${product.price}</p>
            <a href="#" class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</a>
            <div class="additional-details d-none">
              <p>${product.details.info}</p>
              <p>Battery Life: ${product.details.battery}</p>
              <p>Warranty: ${product.details.warranty}</p>
            </div>
            <button class="toggle-details btn btn-secondary mt-2">Show More</button>
          </div>
        `;
      });

      productContainer.innerHTML = productsHTML;

      // Event listeners for show more button
      const toggleButtons = document.querySelectorAll(".toggle-details");
      toggleButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const additionalDetails = this.previousElementSibling;
          additionalDetails.classList.toggle("d-none");
          this.textContent = additionalDetails.classList.contains("d-none")
            ? "Show More"
            : "Show Less";
        });
      });

      // Add to Cart functionality
      const addToCartButtons = document.querySelectorAll(".add-to-cart");
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
          event.preventDefault();
          const productId = this.getAttribute("data-id");

          const selectedProduct = data.products.find((p) => p.id == productId);

          if (!selectedProduct) {
            console.error(`Error: Product with ID ${productId} not found.`);
            return;
          }

          let cart = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : [];
          
          selectedProduct.quantity = selectedProduct.quantity || 1;
          cart.push(selectedProduct);
          localStorage.setItem("cart", JSON.stringify(cart));

          alert(`${selectedProduct.name} has been added to the cart!`);
        });
      });

      // Cart display elements
      const cartItemsContainer = document.getElementById("cart-items");
      console.log("cart item container",cartItemsContainer);

      const subtotalElement = document.getElementById("subtotal");
      console.log("subtotal element",subtotalElement);

      const totalElement = document.getElementById("total");
      console.log("total element",totalElement);

      if (!cartItemsContainer || !subtotalElement || !totalElement) {
        console.error("Error: Cart element(s) not found.");
        return;
      }

      let cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

      let shippingCost = 20;

      // Display cart items
      function displayCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
          cartItemsContainer.innerHTML = `<tr><td colspan="5" class="text-center">Your cart is empty!</td></tr>`;
          subtotalElement.textContent = "$0";
          totalElement.textContent = "$20";
        } else {
          let subtotal = 0;

          cart.forEach((product, index) => {
            const productTotal = product.price * product.quantity;
            subtotal += productTotal;

            const cartItemHTML = `
              <tr>
                <td>
                  <div class="cart-product d-flex align-items-center">
                    <img src="${product.img}" alt="${product.name}" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover;">
                    <div class="ms-3">
                      <h5>${product.name}</h5>
                      <p>${product.description}</p>
                    </div>
                  </div>
                </td>
                <td class="price">$${product.price}</td>
                <td>
                  <input type="number" value="${product.quantity}" class="form-control quantity-input" data-index="${index}" style="width: 70px;">
                </td>
                <td class="total">$${productTotal}</td>
                <td>
                  <button class="btn btn-danger remove-btn" data-index="${index}">Remove</button>
                </td>
              </tr>
            `;

            cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);
          });

          subtotalElement.textContent = `$${subtotal}`;
          totalElement.textContent = `$${subtotal + shippingCost}`;
        }
      }

      // Update product quantity
      cartItemsContainer.addEventListener("input", function (event) {
        if (event.target.classList.contains("quantity-input")) {
          const index = event.target.getAttribute("data-index");
          const newQuantity = event.target.value;

          if (newQuantity > 0) {
            cart[index].quantity = parseInt(newQuantity);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
          }
        }
      });

      // Remove product from cart
      cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
          const index = event.target.getAttribute("data-index");
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          displayCart();
        }
      });

      // Initialize cart display
      displayCart();
    })
    .catch((error) => console.error("Error fetching product data:", error));
});

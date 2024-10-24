document.addEventListener("DOMContentLoaded", function () {
    // Fetch products from inventory.json
    fetch('/json/inventory.json')
      .then(response => response.json())
      .then(data => {
        const productContainer = document.getElementById('product-container');
        let productsHTML = '';
  
        data.products.forEach(product => {
          productsHTML += `
            <div class="product-card">
              <img src="${product.img}" alt="${product.name}">
              <h4>${product.name}</h4>
              <p>${product.description}</p>
              <p class="price">$ ${product.price}</p>
              <a href="#" class="btn btn-primary">Add to Cart</a>
          
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
  
        // event listeners for show more button
        const toggleButtons = document.querySelectorAll('.toggle-details');
        toggleButtons.forEach(button => {
          button.addEventListener('click', function () {
            const additionalDetails = this.previousElementSibling;
            additionalDetails.classList.toggle('d-none');
            this.textContent = additionalDetails.classList.contains('d-none') ? 'Show More' : 'Show Less';
          });
        });
      })
      .catch(error => console.error('Error fetching product data:', error));
  });
  
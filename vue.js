const app = Vue.createApp({
  data() {
      return {
          products: [],
          categories: [],
          categoryImages: [
              { category: 'electronics', image: 'images/electronicacategoria.png' },
              { category: 'jewelery', image: 'images/joyeriacategoria.png' },
              { category: "men's clothing", image: 'images/hombrecategoria.png' },
              { category: "women's clothing", image: 'images/mujercategoria.png' },
          ],
          selectedCategory: null,
          selectedProduct: null,
          showLoginForm: false,
          showRegisterForm: false,
          cart: [],
          isCartVisible: false,
          totalItems: 0,
          sortBy: null,
      };
  },
  mounted() {
      this.fetchProducts();
      this.fetchCategories();
  },
  methods: {
      fetchProducts() {
          fetch('https://fakestoreapi.com/products')
              .then(response => response.json())
              .then(data => {
                  this.products = data;
              })
              .catch(error => {
                  console.error('Error fetching products:', error);
              });
      },
      fetchCategories() {
          fetch('https://fakestoreapi.com/products/categories')
              .then(response => response.json())
              .then(data => {
                  this.categories = data;
              })
              .catch(error => {
                  console.error('Error fetching categories:', error);
              });
      },
      selectCategory(category) {
        this.selectedCategory = category;
        this.filterProductsByCategory(category);
    },
      filterByCategory(category) {
          this.selectedCategory = category;
      },
      showDetail(product) {
          this.selectedProduct = product;
      },
      closeDetail() {
          this.selectedProduct = null;
      },
      toggleForms() {
          this.showLoginForm = !this.showLoginForm;
          this.showRegisterForm = !this.showRegisterForm;

          if (this.showLoginForm && this.showRegisterForm) {
              this.showForms();
          } else {
              this.hideForms();
          }
      },
      showForms() {
          document.getElementById('forms-container').style.display = 'grid';
      },
      hideForms() {
          document.getElementById('forms-container').style.display = 'none';
      },
      calculateTotal() {
          let total = 0;

          for (const item of this.cart) {
              const itemTotal = item.price * item.quantity || 0;
              total += itemTotal;
          }

          return total.toFixed(2);
      },
      updateQuantity(item) {
          if (item.quantity < 1) {
              item.quantity = 1;
          }

          this.calculateTotal();
      },
      addToCart(product) {
          const existingItem = this.cart.find(item => item.id === product.id);

          if (existingItem) {
              existingItem.quantity++;
          } else {
              this.cart.push({
                  id: product.id,
                  image: product.image,
                  title: product.title,
                  price: product.price,
                  quantity: 1,
              });
          }
          this.totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
      },
      removeFromCart(product) {
          const index = this.cart.findIndex(item => item.id === product.id);
          if (index !== -1) {
              this.cart.splice(index, 1);
              this.totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
          }
      },
      checkout() {
          this.cart = [];
      },
      toggleCartVisibility() {
          this.isCartVisible = !this.isCartVisible;
          const cartContainer = document.getElementById('carrito-container');
          cartContainer.style.display = this.isCartVisible ? 'grid' : 'none';
          this.showLoginForm = false;
          this.showRegisterForm = false;
      },
      sortProducts(criteria) {
          this.sortBy = criteria;
          const categoryProducts = this.selectedCategory
              ? this.products.filter(product => product.category === this.selectedCategory)
              : this.products;

          if (criteria === 'price') {
              categoryProducts.sort((a, b) => a.price - b.price);
          } else if (criteria === 'name') {
              categoryProducts.sort((a, b) => a.title.localeCompare(b.title));
          } else if (criteria === 'pricedesc') {
              categoryProducts.sort((a, b) => b.price - a.price);
          } else if (criteria === 'namedesc') {
              categoryProducts.sort((a, b) => b.title.localeCompare(a.title));
          }

          // Actualizar la lista de productos con el orden aplicado
          this.products = categoryProducts;
      },
  },
  computed: {
      filteredProducts() {
          return this.selectedCategory
              ? this.products.filter(product => product.category === this.selectedCategory)
              : this.products;
      },
  },
});

app.mount('#app');
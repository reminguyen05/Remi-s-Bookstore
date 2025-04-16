// Data for books (titles, book covers, genres, and prices)
const books = [
  {
    title: "The Hunger Games",
    imageURL: "https://m.media-amazon.com/images/I/71un2hI4mcL.jpg",
    genres: ["young adult", "dystopia", "fiction", "fantasy"],
    price: 8.78
  },
  {
    title: "Fourth Wing",
    imageURL: "https://m.media-amazon.com/images/I/71bXcusLgJL.jpg",
    genres: ["romance", "fantasy", "young adult"],
    price: 13.88
  },
  {
    title: "Pride and Prejudice",
    imageURL: "https://m.media-amazon.com/images/I/81a3sr-RgdL.jpg",
    genres: ["romance", "fiction", "historical fiction", "classic"],
    price: 7.97
  },
  {
    title: "The Book Thief",
    imageURL: "https://m.media-amazon.com/images/I/914cHl9v7oL.jpg",
    genres: ["young adult", "fiction", "historical fiction", "classic"],
    price: 8.24
  },
  {
    title: "Dark Matter",
    imageURL: "https://m.media-amazon.com/images/I/71BLt1LP9ML.jpg",
    genres: ["fantasy", "fiction", "science fiction", "thriller"],
    price: 9.16
  },
  {
    title: "The Song of Achilles",
    imageURL: "https://m.media-amazon.com/images/I/81msb6gUBTL.jpg",
    genres: ["fantasy", "historical fiction", "mythology", "lgbt"],
    price: 10.77
  },
  {
    title: "People We Meet on Vacation",
    imageURL: "https://m.media-amazon.com/images/I/71WsX3abgiL.jpg",
    genres: ["fiction", "contemporary", "romance"],
    price: 8.24
  },
  {
    title: "Six of Crows",
    imageURL: "https://m.media-amazon.com/images/I/91tK5sU9oOL.jpg",
    genres: ["fantasy", "young adult", "fiction"],
    price: 7.41
  },
  {
    title: "Pachinko",
    imageURL: "https://m.media-amazon.com/images/I/814EvRgiKpL.jpg",
    genres: ["historical fiction", "fiction"],
    price: 11.28
  },
  {
    title: "Circe",
    imageURL: "https://m.media-amazon.com/images/I/B1eAVSHxJ4L._AC_UF1000,1000_QL80_.jpg",
    genres: ["fantasy", "fiction", "mythology", "historical fiction"],
    price: 10.53
  },
  {
    title: "When Breath Becomes Air",
    imageURL: "https://m.media-amazon.com/images/I/61gwba1pQnL.jpg",
    genres: ["nonfiction", "memoir", "biography"],
    price: 10.97
  },
  {
    title: "Persuasion",
    imageURL: "https://m.media-amazon.com/images/I/71zikHaLT+L._AC_UF1000,1000_QL80_.jpg",
    genres: ["fiction", "classic", "historical fiction"],
    price: 7.40
  },
  {
    title: "All the Light We Cannot See",
    imageURL: "https://m.media-amazon.com/images/I/81RBTG28sCL.jpg",
    genres: ["historical fiction", "fiction"],
    price: 11.43
  },
  {
    title: "The Seven Husbands of Evelyn Hugo",
    imageURL: "https://m.media-amazon.com/images/I/71KcUgYanhL.jpg",
    genres: ["fiction", "historical fiction", "lgbt"],
    price: 9.49
  },
  {
    title: "Before the Coffee Gets Cold",
    imageURL: "https://m.media-amazon.com/images/I/81XuBDUvMaL._AC_UF1000,1000_QL80_.jpg",
    genres: ["fiction", "fantasy", "contemporary"],
    price: 11.09
  }
];

let currentFilter = "all";

document.addEventListener('DOMContentLoaded', function() {
  showCards(books); 
  setupEventListeners();
});

// Function to display books
function showCards(booksToDisplay) {
  const cardContainer = document.getElementById("card-container");
  if (!cardContainer) return;

  cardContainer.innerHTML = booksToDisplay.length === 0
    ? "<p>No books found.</p>"
    : booksToDisplay.map(book => `
        <div class="card">
          <img src="${book.imageURL}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p class="price">$${book.price.toFixed(2)}</p>
          <button class="add-to-cart" onclick="addToCart(${JSON.stringify(book).replace(/"/g, '&quot;')})">
            Add to Cart
          </button>
        </div>
      `).join("");
}

// Function to filter books by genre
function filterBooks(books, genre) {
  return genre === "all"
    ? books
    : books.filter(book => book.genres.includes(genre));
}

// Function to handle genre filtering
function filterGenres(genre) {
  currentFilter = genre;
  const filteredBooks = filterBooks(books, genre);
  showCards(filteredBooks);
}

// Set up event listeners 
function setupEventListeners() {
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(btn => 
        btn.classList.remove('active'));
      this.classList.add('active');
      filterGenres(button.dataset.genre);
    });
  });
}

let cart = [];

// Function to add books to cart
function addToCart(book) {
  const existingItem = cart.find(item => item.id === book.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...book,
      quantity: 1,
      id: book.title.toLowerCase().replace(/\s+/g, '-') 
    });
  }
  updateCartDisplay();
}

// Function to remove books from cart
function removeFromCart(bookId) {
  cart = cart.filter(item => item.id !== bookId);
  
  if (cart.length === 0) {
    document.getElementById('cart-items').innerHTML = "<p>Your cart is empty</p>";
    document.getElementById('cart-count').textContent = "0";
    document.getElementById('cart-total').textContent = "0.00";
  } else {
    updateCartDisplay();
  }
}

// Function to update cart on main page
function updateCartDisplay() {
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const cartItems = document.getElementById('cart-items');
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = totalPrice.toFixed(2);
  
  cartItems.innerHTML = cart.length === 0
    ? "<p>Your cart is empty</p>"
    : cart.map(item => `
        <div class="cart-item">
          <img src="${item.imageURL}" alt="${item.title}" width="50">
          <div>
            <h4>${item.title}</h4>
            <p>$${item.price.toFixed(2)} &times; ${item.quantity}</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
          </div>
        </div>
      `).join('');
}
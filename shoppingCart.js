// Define Flower class
class Flower {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

// Create shopping cart object
let cart = {
  items: [],

  addItem: function (flower) {
    this.items.push(flower);
    this.updateCart();
  },

  removeItem: function (flowerName) {
    this.items = this.items.filter((flower) => flower.name !== flowerName);
    this.updateCart();
  },

  changeQuantity: function (flowerName) {
    const quantityInput = document.getElementById("quantityInput");
    const newQuantity = parseInt(quantityInput.value);

    const flower = this.items.find((item) => item.name === flowerName);
    if (flower) {
      flower.quantity = newQuantity;
      this.updateCart();
    }
  },

  getCartItemCount: function () {
    const itemCount = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return itemCount;
  },

  getCartTotalSum: function () {
    const totalSum = this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return totalSum.toFixed(2);
  },

  applyDiscount: function (discountPercentage, thresholdAmount) {
    const totalSum = parseFloat(this.getCartTotalSum());
    if (totalSum >= thresholdAmount) {
      const discount = (totalSum * (discountPercentage / 100)).toFixed(2);
      return discount;
    } else {
      return "0.00";
    }
  },

  updateCart: function () {
    const itemCountElement = document.getElementById("itemCount");
    itemCountElement.textContent = "Item count: " + this.getCartItemCount();

    const totalSumElement = document.getElementById("totalSum");
    totalSumElement.textContent = "Total sum: $" + this.getCartTotalSum();

    const discountElement = document.getElementById("discount");
    const discountPercentage = 10; // Customize discount percentage
    const thresholdAmount = 100; // Customize threshold amount
    const discount = this.applyDiscount(discountPercentage, thresholdAmount);
    discountElement.textContent = "Discount: $" + discount;
  },
};

// Functions called from HTML buttons
function addToCart(flowerName, price) {
  const quantityInput = document.getElementById("quantityInput");
  const quantity = parseInt(quantityInput.value);

  const flower = new Flower(flowerName, price, quantity);
  cart.addItem(flower);
}

function removeFromCart(flowerName) {
  cart.removeItem(flowerName);
}

function changeQuantity(flowerName) {
  cart.changeQuantity(flowerName);
}

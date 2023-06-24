<template lang="pug">
div#app

  header
    h1 {{ appTitle }}
  
  .grid
    .col-sx
      .products
        h2 Products
        ul.products-list
          li.product(v-for="(prod, ind) in products" :key="'ind-' + ind")
            .box
              .image
              h3.title {{ prod.title }}
              p.price {{ prod.price | currency }}
              button(@click="addItem(prod)") Add to cart
      
    .col-dx
      .cart
        h2 Your Cart
        table.cart-list(v-if="cart.length")
          thead
            tr
              th.head-title Product
              th.head-price Price
              th.head-quantity Quantity
              th.head-total Total
          tbody
            tr.cart-item(v-for="(item, id) in cart" :key="'id-' + id")
              td: h4.title {{ item.title }}
              td: .price {{ item.price | currency }}
              td
                .quantity 
                  | {{ item.quantity }}
                  span.qty-handler
                    span(@click="add(item)") +
                    span(@click="sub(item)") -
                  
              td: .total {{ item.price * item.quantity | currency }}
          tfoot
            tr
              th(colspan="3"): h4.total-title Total
              th {{ total | currency }}
        
        .empty-contents(v-else)
          .draw
            .cactus
              .arm
              .arm
            .cactus
              .arm
              .arm
            .cactus
              .arm
              .arm
            .sky
              .montain
              .montain.two
              .sun
          
          p.no-items-text
            | Your cart is actually empty

</template>

<script>
/**************************************
    VUE INSTANCE
 **************************************/
new Vue({
  el: '#app',
  data() {
    return {
      appTitle: 'My Vue Shop',
      products: [
        { id: 1, title: 'Product One', price: 9.99 },
        { id: 2, title: 'Product Two', price: 12.99 },
        { id: 3, title: 'Product Three', price: 8.00 },
        { id: 4, title: 'Product Four', price: 10.50 }
      ],
      cart: [],
      total: 0
    };
  },
  methods: {
    addItem(prod){
      // Increment total price
      this.total += prod.price;
      
      let inCart = false; 
      // Update quantity if the item is already in the cart
      for(let i = 0; i < this.cart.length; i++){
        if(this.cart[i].id === prod.id){
          inCart = true;
          this.cart[i].quantity++;
          break;
        }
      }
      // Add item if not already in the cart
      if(! inCart){
        this.cart.push({
          id: prod.id,
          title: prod.title,
          price: prod.price,
          quantity: 1
        }); 
      }
    },
    add(item){
      this.total += item.price;
      item.quantity++;
    },
    sub(item){
      this.total -= item.price;
      if(item.quantity > 1){
        item.quantity--; 
      } else{
        for( let i = 0; i < this.cart.length; i++){
          if(this.cart[i].id === item.id){
            this.cart.splice(i, 1);
            break;
          }
        }
      }
    }
  },
  filters: {
    currency(price){
      return '€' + price.toFixed(2);
    }
  }
});
</script>


<style lang="scss">
//FONTS
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,700");
$main-font: "Open Sans", sans-serif;

// COLORS
$white: #fff;
$black: #000;

// GENERAL
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  font-family: $main-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  padding: 3rem;
  display: flex;
  justify-content: center;
}

// CART STYLES
#app {
  width: 100%;
  max-width: 70rem;
}

h1 {
  margin: 0 0 3rem;
  text-transform: uppercase;
  text-align: center;
  font-weight: 400;
}

.grid {
  display: flex;
  .col-sx,
  .col-dx {
    width: 50%;
  }
}

.products {
  padding: 0 1rem 0 0;
  h2 {
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    font-weight: 400;
    border-bottom: 1px solid #555;
  }
  .products-list {
    margin: 0.5rem 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    .product {
      margin: 0;
      list-style: none;
      width: 50%;
      &:nth-child(odd) {
        padding-right: 1rem;
      }
      &:nth-child(even) {
        padding-left: 1rem;
      }
      .box {
        margin-bottom: 2.15rem;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 0 3px 2px rgba($black, 0.15);
        &:nth-child(even) {
          margin-left: 0.5rem;
        }
        .image {
          display: block;
          width: 100%;
          height: 100px;
          background: #eee;
          margin-bottom: 1rem;
        }
        .title {
          margin-top: 0;
        }
        button {
          padding: 0.35rem 0.7rem 0.28rem;
          border: 0;
          text-transform: uppercase;
          font-size: 0.85em;
          color: $white;
          background: rgba($black, 0.5);
          box-shadow: 0 18px 10px -10px rgba($black, 0.25);
          transition: background 0.4s, box-shadow 0.4s;
          cursor: pointer;
          outline: none;
          &:hover,
          &:focus {
            background: $black;
            box-shadow: 0 18px 10px -10px rgba($black, 0);
          }
        }
      }
    }
  }
}

.cart {
  padding: 0 0 0 1rem;
  h2 {
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    font-weight: 400;
    text-align: right;
    border-bottom: 1px solid #555;
  }
  .cart-list {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 0 3px 2px rgba($black, 0.15);
    tr {
      &:nth-child(even) {
        td {
          background: #eee;
        }
      }
    }
    td,
    th {
      padding: 1rem;
      h3,
      h4 {
        margin: 0;
      }
    }
    th {
      font-size: 0.9em;
      text-transform: uppercase;
      text-align: left;

      &.head-quantity {
        text-align: center;
      }
      &.head-price,
      &:last-of-type {
        text-align: right;
      }
      .total-title {
        text-align: right;
      }
    }
    td {
      background: #f9f9f9;
      .title {
        font-weight: 400;
        font-size: 0.9em;
      }
      .price {
        text-align: right;
      }
      .quantity {
        position: relative;
        padding: 0 1rem;
        text-align: center;
        .qty-handler {
          position: absolute;
          top: 0;
          left: 1rem;
          right: 1rem;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          span {
            width: 1rem;
            height: 1rem;
            line-height: 16px;
            text-align: center;
            background: rgba($black, 0.5);
            color: $white;
            transition: background 0.4s;
            cursor: pointer;
            &:hover {
              background: $black;
            }
            &:last-of-type {
              line-height: 13px;
            }
          }
        }
      }
      .total {
        text-align: right;
      }
    }
  }
  .draw {
    position: relative;
    height: 300px;
    width: 300px;
    border-radius: 50%;
    margin: 4rem auto 2rem;
    background: #eaeaea;
    overflow: hidden;
    .cactus {
      z-index: 1;
      position: absolute;
      width: 1.2rem;
      height: 10rem;
      border-radius: 7px 7px 0 0;
      background: currentColor;
      &::before {
        content: "";
        position: absolute;
        left: 0px;
        bottom: -32px;
        width: 1.2rem;
        height: 2rem;
        transform: skew(40deg);
        transform-origin: top center;
        border-radius: 0 0 6px 6px;

        animation: lightAngle 8s linear infinite alternate;
      }
      &:nth-child(1) {
        bottom: 0;
        left: 50%;
        transform: transalteX(-50%);
        color: #aaa;
      }
      &:nth-child(2) {
        bottom: 4.5rem;
        left: 2rem;
        transform: scale(0.4);
        color: #dadada;
        &::before {
          background: darken(#dadada, 20%);
        }
      }
      &:nth-child(3) {
        bottom: 2.5rem;
        right: 2rem;
        transform: scale(0.6);
        color: #ccc;
        &::before {
          background: darken(#ccc, 20%);
        }
      }
      .arm {
        position: absolute;
        width: 3rem;
        height: 1rem;
        background: currentColor;
        &::before {
          position: absolute;
          bottom: 0;
          right: 0;
          content: "";
          width: 1rem;
          height: 3rem;
          background: currentColor;
          border-radius: 6px 6px 0 0;
        }
        &:first-of-type {
          top: 35%;
        }
        &:last-of-type {
          top: 55%;
          left: -1.8rem;
          &::before {
            right: auto;
            left: 0;
          }
        }
      }
    }
    .sky {
      position: absolute;
      width: 100%;
      height: 50%;
      background: #fcfcfc;
      overflow: hidden;
      .montain {
        position: absolute;
        left: 42%;
        bottom: -2rem;
        width: 4rem;
        height: 4rem;
        background: #d8d8d8;
        transform: rotate(45deg);
        border-radius: 8px 0 0 0;
        &.two {
          left: 27%;
          transform: rotate(45deg) scale(0.6);
          background: #d8d8d8;
        }
      }
      .sun {
        position: absolute;
        top: 20px;
        left: -2rem;
        width: 2rem;
        height: 2rem;
        background: #d4d4d4;
        border-radius: 50%;

        animation: sunWalk 8s linear infinite alternate;
      }
    }
  }
  .no-items-text {
    text-align: center;
    text-transform: uppercase;
    font-size: 0.9em;
    color: rgba($black, 0.7);
  }
}

// ANIMATIONS
@keyframes sunWalk {
  from {
    left: -2rem;
  }
  to {
    left: 100%;
  }
}
@keyframes lightAngle {
  0%,
  20% {
    transform: skew(40deg);
  }
  80%,
  100% {
    transform: skew(-40deg);
  }
}

// RESPONSIVE
@media all and (max-width: 768px) {
  body {
    padding: 3rem 1rem;
  }
  .grid {
    flex-direction: column;
    .col-sx,
    .col-dx {
      width: 100%;
    }
    .products,
    .cart {
      padding: 0;
    }
    .products {
      padding-bottom: 2rem;
    }
    .cart {
      h2 {
        text-align: left;
      }
    }
  }
}

</style>
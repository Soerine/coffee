

class Cart {


    static GrabCart() {
        if (localStorage['cart'] == undefined) {

            localStorage['cart'] = JSON.stringify([]);
        }
        return JSON.parse(localStorage['cart'])
    }

    static PutInCart(id, navn, pris, antal) {
        let new_product = true;

        let cart = Cart.GrabCart();

        cart.forEach(product => {
            if (product.id == id) {

                product.antal += parseInt(antal);
                new_product = false;
                console.log("opdater")
            }
        })
        if (new_product) {
            cart.push({
                'id': parseInt(id),
                'navn': navn,
                'pris': parseFloat(pris),
                'antal': parseInt(antal)
            })
            console.log("nyt")
        }

        Cart.SaveCart(cart);
    }

    static SaveCart(cart) {

        for (let i = cart.length - 1; i >= 0; i--) {
            if (cart[i].antal <= 0) {

                cart.splice(i, 1)
            }
        }
        localStorage['cart'] = JSON.stringify(cart)

    }

    static DeleteCart() {
        delete localStorage['cart']
    }

    static get Total() {
        let total = 0;
        Cart.GrabCart().forEach(produkt => {
            total += (produkt.pris * produkt.antal)
        })
        return total;
    }

    static RemoveProductFromCart(id) {
        let cart = Cart.GrabCart();
        for (let i = cart.length - 1; i >= 0; i--) {
            if (cart[i].id == id) {
                cart.splice(i, 1);
            }
        }
        Cart.SaveCart(cart);
    }

    static EditProduct(id, antal) {
        let cart = Cart.GrabCart();


        cart.forEach(produkt => {
            if (produkt.id == id) {
                produkt.antal = parseInt(antal)
            }
        });
        Cart.SaveCart(cart);
    }


}
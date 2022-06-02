let carts = document.querySelectorAll('.add-cart');
let cartArrayDisplay = [];


//product information
let products = [{
        name: 'WILL',
        price: 500,
        inCart: 0
    },
    {
        name: 'Atomic Habits',
        price: 400,
        inCart: 0
    },
    {
        name: 'Wish You Were Here',
        price: 450,
        inCart: 0
    },
    {
        name: 'RISE',
        price: 300,
        inCart: 0
    },
    {
        name: 'Diary of a Wimpy Kid',
        price: 250,
        inCart: 0
    },
]

//loop through the add to cart buttons and picks the [i]/one clicked on
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        //cart numbers to update number of products in cart
        cartNumbers(products[i]);
        //totalCost to pick out the price of item and update the total
        totalCost(products[i]);
    })

}

//the function below stores the productNumbers(no.of items in cart) in localStorage, so it isn't lost each time page is refreshed
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


//function below adds to cartNumbers each time a product is quick added to cart
//Changes cart icon at top
function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

//below function stores the product info to localstorage, updates the info to the cart and
//then re-stores the info to be displayed in string format
function setItems(product) {

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.name]: product
        }
    }

    cartArrayDisplay.push(JSON.stringify(cartItems));
    console.log(cartArrayDisplay);
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}


//function below calculates the total cost of the users cart
function totalCost(product) {
    //console.log('the products price is', product.price);
    let cartCost = localStorage.getItem("totalCost");


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", product.price + cartCost);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

    //alert that tells user total, each time item is added
    alert("New item added! Your total is R" + (product.price + cartCost));
}

/*CART PAGE */

let cartClicked = document.querySelectorAll('.cart');
cartClicked.addEventListener('click', function displayCart(product)
{
    let total = 0;
    let price = 0;
    let items = 0;
    let productname = "";
    let carttable = "";

    if (localStorage.productsInCart) {

        //loop over cart array
        for (i = 0; i < cartArrayDisplay.length; i++) {
            //convert each JSON product in array back into object
            let x = JSON.parse(cartArrayDisplay[i]);

            //get property value of price
            price = parseFloat(x.price.split('$')[1]);
            productname = x.name;

            //add price to total
            carttable += "<tr><td>" + productname + "</td><td>$" + price.toFixed(2) + "</td></tr>";
            total += price;


            //-----------------DELETE BUTTON--------------------------------

            // create a button to delete a product
            let dltButton = document.createElement('button')
            dltButton.innerHTML = "Delete"

            // EventListener will trigger if click on button
            //dlt button will be created for each song entry and dltSong() Function below will execute when button is clicked

            dltButton.addEventListener('click', function dltSong() {
                // splice(i) will delete the selected song
                art.splice(i, 1) //parameters 
                localStorage.productsInCart = JSON.stringify(cartArrayDisplay);
            });
        }

        //update total on website HTML
        document.getElementById("totalPaceholder").innerHTML = total.toFixed(2);
        //insert saved products to cart table
        document.getElementById("carttablePlaceholder").innerHTML = carttable;
        //update items in cart on website HTML
        document.getElementById("itemsquantityPlaceholder").innerHTML = items;

    }
});


onLoadCartNumbers();
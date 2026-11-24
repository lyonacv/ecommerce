const express = require('express');
const app = express();
const port = 3000;

// In-memory "database" for our to-do items
categories = [
    { id: 1, name: "men's clothing", description: "Clothing for men" },
    { id: 2, name: "jewelery", description: "Fine jewelry" },
    { id: 3, name: "electronics", description: "Gadgets and devices" },
    { id: 4, name: "women's clothing", description: "Clothing for women" }
];

products = [
        {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price : 109.95,
            description : "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: { id: 1, name: "men's clothing", description: "Clothing for men" },
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: { rate: 3.9, count: 120 }
        },
        {
            id: 2,
            title: "Mens Casual Premium Slim Fit T-Shirts ",
            price: 22.3,
            description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
            category: { id: 1, name: "men's clothing", description: "Clothing for men" },
            image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            rating: { rate: 4.1, count: 259 }
        },
        {
            id: 3,
            title: "Mens Cotton Jacket",
            price: 55.99,
            description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
            category: { id: 1, name: "men's clothing", description: "Clothing for men" },
            image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
            rating: { rate: 4.7, count: 500 }
        },
        {
            id: 4,
            title: "Mens Casual Slim Fit",
            price: 15.99,
            description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
            category: { id: 1, name: "men's clothing", description: "Clothing for men" },
            image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
            rating: { rate: 2.1, count: 430 }
        },
        {
            id: 5,
            title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            price: 695,
            description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
            category: { id: 2, name: "jewelery", description: "Fine jewelry" },
            image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
            rating: { rate: 4.6, count: 400 }
        },
        {
            id: 6,
            title: "Solid Gold Petite Micropave ",
            price: 168,
            description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
            category: { id: 2, name: "jewelery", description: "Fine jewelry" },
            image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
            rating: { rate: 3.9, count: 70 }
        }
    ];

// Use built-in middleware to parse URL-encoded data (form submissions)
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve the HTML form
/*
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
*/

// API category
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.get('/api/category/:id', (req, res) => {
    const category = categories.find(c => c.id == parseInt(req.params.id ));
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
});

app.post('/api/category', (req, res) => {
    const category = req.body;
    category.id = categories.length+1;
    categories.push(category);
    res.status(201).json(category)
});

app.put('/api/category', (req, res) => {
    const category = req.body;
    if (!category) return res.status(404).json({ message: 'Category not found' });
    categories = categories.flatMap((c) => (c.id === category.id ? category : c));
    res.status(201).json(category);
});


app.delete('/api/category/:id', (req, res) => {
    const index = categories.findIndex(c => c.id == parseInt(req.params.id ));
    if (index === -1 ) return res.status(404).json({ message: 'index not found' });
    const categoryDelete = categories.splice(index,1);
    res.status(200).json(categoryDelete[0]);
});

// API Product
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/product/:id', (req, res) => {
    const product = categories.find(p => p.id == parseInt(req.params.id ));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
});

app.post('/api/product', (req, res) => {
    const product = req.body;
    product.id = products.length+1;
    products.push(product);
    res.status(201).json(product);
});

app.put('/api/product', (req, res) => {
    const product = req.body;
    if (!product) return res.status(404).json({ message: 'Product not found' });
    products = products.flatMap((p) => (p.id === product.id ? product : p));
    res.status(201).json(product);
});


app.delete('/api/product/:id', (req, res) => {
    const index = products.findIndex(p => p.id == parseInt(req.params.id ));
    if (index === -1 ) return res.status(404).json({ message: 'index not found' });
    const productDelete = products.splice(index,1);
    res.status(200).json(productDelete[0]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
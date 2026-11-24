from flask import request, jsonify

# In-memory "database" for our to-do items
products = [
        {
            "id": 1,
            "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price" : 109.95,
            "description" : "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category": { "id": 1, "name": "men's clothing", "description": "Clothing for men" },
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "rating": { "rate": 3.9, "count": 120 }
        },
        {
            "id": 2,
            "title": "Mens Casual Premium Slim Fit T-Shirts ",
            "price": 22.3,
            "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
            "category": { "id": 1, "name": "men's clothing", "description": "Clothing for men" },
            "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            "rating": { "rate": 4.1, "count": 259 }
        },
        {
            "id": 3,
            "title": "Mens Cotton Jacket",
            "price": 55.99,
            "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
            "category": { "id": 1, "name": "men's clothing", "description": "Clothing for men" },
            "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
            "rating": { "rate": 4.7, "count": 500 }
        },
        {
            "id": 4,
            "title": "Mens Casual Slim Fit",
            "price": 15.99,
            "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
            "category": { "id": 1, "name": "men's clothing", "description": "Clothing for men" },
            "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
            "rating": { "rate": 2.1, "count": 430 }
        },
        {
            "id": 5,
            "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            "price": 695,
            "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
            "category": { "id": 2, "name": "jewelery", "description": "Fine jewelry" },
            "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
            "rating": { "rate": 4.6, "count": 400 }
        },
        {
            "id": 6,
            "title": "Solid Gold Petite Micropave ",
            "price": 168,
            "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
            "category": { "id": 2, "name": "jewelery", "description": "Fine jewelry" },
            "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
            "rating": { "rate": 3.9, "count": 70 }
        }
    ]


# Helper function to find a to-do by ID
def find(product_id):
    for product in products:
        if product["id"] == product_id:
            return product
    return None

# Get all to-dos
def get_all():
    return jsonify(products)

# Get a single to-do by ID
def get(product_id):
    product = find(product_id)
    if product is None:
        return jsonify({"error": "product not found"}), 404
    return jsonify(product)

# Create a new to-do
def create():
    if not request.json or 'title' not in request.json:
        return jsonify({"error": "title is required"}), 400
    new_id = max(product["id"] for product in products) + 1 if products else 1
    new_product = {
        "id": new_id,
        "title": request.json['title'],
        "description": request.json['description'],
        "category": request.json['category'],
        "image": request.json['image'],
        "price": request.json['price']
    }
    products.append(new_product)
    return jsonify(new_product), 201

# Update a to-do
def update():
    product_id = request.json["id"]
    product = find(product_id)
    if product is None:
        return jsonify({"error": "product not found"}), 404
    product["title"] = request.json.get('title', product["title"])
    product["description"] = request.json.get('description', request.json["description"])
    product["category"] = request.json.get('description', request.json['category']) 
    product["price"] = request.json.get('price', request.json['price'])
    return jsonify(product)

# Delete a to-do
def delete(product_id):
    global products
    product = find(product_id)
    if product is None:
        return jsonify({"error": "product not found"}), 404
    products = [t for t in products if t["id"] != product_id]
    return jsonify({"result": "Todo deleted"})
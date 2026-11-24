from flask import Flask, request
import category as c 
import product as p

app = Flask(__name__)

# API category
# Get all to-dos
@app.route('/api/categories', methods=['GET'])
def get_categories():
    return c.get_all()

# Get a single to-do by ID
@app.route('/api/category/<int:category_id>', methods=['GET'])
def get_category(category_id):
    return c.get(category_id)

# Create a new to-do
@app.route('/api/category', methods=['POST'])
def create_category():
    return c.create()

# Update a to-do
@app.route('/api/category', methods=['PUT'])
def update_category():
    return c.update()

# Delete a to-do
@app.route('/api/category/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    return c.delete(category_id)
# End API category

# Get all to-dos
@app.route('/api/products', methods=['GET'])
def get_products():
    return p.get_all()

# API product
# Get a single to-do by ID
@app.route('/api/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    return p.get(product_id)

# Create a new to-do
@app.route('/api/product', methods=['POST'])
def create_product():
    return p.create()

# Update a to-do
@app.route('/api/product', methods=['PUT'])
def update_product():
    return p.update()

# Delete a to-do
@app.route('/api/product/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    return p.delete(product_id)    
#End API product


if __name__ == '__main__':
    app.run(ssl_context='adhoc',debug=True)
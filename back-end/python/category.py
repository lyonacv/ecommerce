from flask import request, jsonify


# In-memory "database" for our to-do items
categories = [
    { "id": "1", "name": "men's clothing", "description": "Clothing for men" },
    { "id": "2", "name": "jewelery", "description": "Fine jewelry" },
    { "id": "3", "name": "electronics", "description": "Gadgets and devices" },
    { "id": "4", "name": "women's clothing", "description": "Clothing for women" }
]


# Helper function to find a to-do by ID
def find(category_id):
    for category in categories:
        if category["id"] == category_id:
            return category
    return None

# Get all to-dos
def get_all():
    return jsonify(categories)

# Get a single to-do by ID
def get(category_id):
    category = find(category_id)
    if category is None:
        return jsonify({"error": "category not found"}), 404
    return jsonify(category)

# Create a new to-do
def create():
    if not request.json or 'name' not in request.json:
        return jsonify({"error": "name is required"}), 400
    new_id = max(category["id"] for category in categories) + 1 if categories else 1
    new_category = {
        "id": new_id,
        "name": request.json['name'],
        "description": request.json['description']
    }
    categories.append(new_category)
    return jsonify(new_category), 201

# Update a to-do
def update():
    category_id = request.json["id"]
    category = find(category_id)
    if category is None:
        return jsonify({"error": "category not found"}), 404
    category["name"] = request.json.get('name', category["name"])
    category["description"] = request.json.get('description', category["description"])
    return jsonify(category)

# Delete a to-do
def delete(category_id):
    global categories
    category = find(category_id)
    if category is None:
        return jsonify({"error": "category not found"}), 404
    categories = [t for t in categories if t["id"] != category_id]
    return jsonify({"result": "Todo deleted"})
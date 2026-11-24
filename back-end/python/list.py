from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory "database" for our to-do items
todos = [
    {"id": 1, "task": "Learn Python", "done": False},
    {"id": 2, "task": "Build a REST API", "done": False}
]

categories = [
    { "id": 1, "name": "men's clothing", "description": "Clothing for men" },
    { "id": 2, "name": "jewelery", "description": "Fine jewelry" },
    { "id": 3, "name": "electronics", "description": "Gadgets and devices" },
    { "id": 4, "name": "women's clothing", "description": "Clothing for women" }
]

# Helper function to find a to-do by ID
def find_todo(todo_id):
    for todo in todos:
        if todo["id"] == todo_id:
            return todo
    return None

# Get all to-dos
@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

# Get a single to-do by ID
@app.route('/todos/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    todo = find_todo(todo_id)
    if todo is None:
        return jsonify({"error": "Todo not found"}), 404
    return jsonify(todo)

# Create a new to-do
@app.route('/todos', methods=['POST'])
def create_todo():
    if not request.json or 'task' not in request.json:
        return jsonify({"error": "Task is required"}), 400
    new_id = max(todo["id"] for todo in todos) + 1 if todos else 1
    new_todo = {
        "id": new_id,
        "task": request.json['task'],
        "done": False
    }
    todos.append(new_todo)
    return jsonify(new_todo), 201

# Update a to-do
@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    todo = find_todo(todo_id)
    if todo is None:
        return jsonify({"error": "Todo not found"}), 404
    todo["task"] = request.json.get('task', todo["task"])
    todo["done"] = request.json.get('done', todo["done"])
    return jsonify(todo)

# Delete a to-do
@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    global todos
    todo = find_todo(todo_id)
    if todo is None:
        return jsonify({"error": "Todo not found"}), 404
    todos = [t for t in todos if t["id"] != todo_id]
    return jsonify({"result": "Todo deleted"})

# Get categories
@app.route('/api/categories', methods=['GET'])
def get_categories():
    return jsonify(categories)

# Run the app
if __name__ == '__main__':
    app.run(ssl_context='adhoc',debug=True)
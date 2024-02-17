from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data to simulate CRUD operations
items = []

# Create operation
@app.route('/items', methods=['POST'])
def create_item():
    data = request.get_json()
    text = data.get('text')
    if text:
        item = {'id': len(items) + 1, 'text': text}
        items.append(item)
        return jsonify({'message': 'Item created successfully', 'item': item}), 201
    else:
        return jsonify({'error': 'Text field is required'}), 400

# Read operation
@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(items)

# Update operation
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    # data = request.get_json()
    # #TODO
    data = request.get_json()
    text = data.get('text')
    for item in items:
        if item['id'] == item_id:
            item['text'] = text
            return jsonify({'message': 'Item updated successfully', 'item': item})
    return jsonify({'error': 'Item not found'}), 404

# Delete operation
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    # global items
    # #TODO
    global items
    items = [item for item in items if item['id'] != item_id]
    return jsonify({'message': 'Item deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)

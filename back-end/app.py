from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define Item model
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(100), nullable=False)

# Create database tables based on defined models
def create_tables():
    with app.app_context():
        db.create_all()

# Create operation
@app.route('/items', methods=['POST'])
def create_item():
    data = request.get_json()
    text = data.get('text')
    if text:
        new_item = Item(text=text)
        db.session.add(new_item)
        db.session.commit()
        return jsonify({'message': 'Item created successfully', 'item': {'id': new_item.id, 'text': new_item.text}}), 201
    else:
        return jsonify({'error': 'Text field is required'}), 400

# Read operation
@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    items_list = [{'id': item.id, 'text': item.text} for item in items]
    return jsonify(items_list)

# Update operation
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()
    text = data.get('text')
    item = Item.query.get(item_id)
    if item:
        item.text = text
        db.session.commit()
        return jsonify({'message': 'Item updated successfully', 'item': {'id': item.id, 'text': item.text}})
    else:
        return jsonify({'error': 'Item not found'}), 404

# Delete operation
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Item.query.get(item_id)
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Item deleted successfully'})
    else:
        return jsonify({'error': 'Item not found'}), 404

if __name__ == '__main__':
    create_tables()  # Create database tables based on defined models
    app.run(debug=True)

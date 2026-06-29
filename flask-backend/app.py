from flask import Flask, request, jsonify, session
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = 'super-secret-key-change-me'

# 模拟数据库（存在内存里，重启后端数据就会丢失）
users = {
    'admin': '123456'
}

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': '用户名和密码不能为空'}), 400

    if username in users:
        return jsonify({'message': '用户名已存在'}), 400

    users[username] = password
    return jsonify({'message': '注册成功'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if users.get(username) == password:
        session['username'] = username
        return jsonify({'message': '登录成功', 'username': username}), 200
    else:
        return jsonify({'message': '用户名或密码错误'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({'message': '已登出'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
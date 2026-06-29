import { useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLogin, setIsLogin] = useState(true) // 切换登录/注册

  const handleSubmit = async () => {
    setMessage('') // 清空上次的提示
    const url = isLogin
      ? 'http://127.0.0.1:5000/api/login'
      : 'http://127.0.0.1:5000/api/register'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      setMessage(data.message)
    } catch (error) {
      setMessage('请求失败，请检查后端是否启动')
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>{isLogin ? '登录' : '注册'}</h2>
      <div>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button style={{ marginTop: 15 }} onClick={handleSubmit}>
        {isLogin ? '登录' : '注册'}
      </button>
      <p style={{ color: 'blue', cursor: 'pointer', marginTop: 10 }}
         onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
        {isLogin ? '没有账号？去注册' : '已有账号？去登录'}
      </p>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  )
}

export default App
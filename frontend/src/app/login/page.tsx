"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  // Estados para ambos os formulários
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState(""); // Apenas para o cadastro

  const { login, register } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(username, password, nome);
    // Limpar campos e voltar para a tela de login
    setUsername("");
    setPassword("");
    setNome("");
    setIsLoginView(true);
  };

  return (
    <div>
      {isLoginView ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label>Usuário:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Entrar</button>
          </form>
          <p>
            Não tem uma conta?{" "}
            <button onClick={() => setIsLoginView(false)}>Cadastre-se</button>
          </p>
        </>
      ) : (
        <>
          <h2>Cadastro</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div>
              <label>Nome Completo:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Usuário (Username):</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Cadastrar</button>
          </form>
          <p>
            Já tem uma conta?{" "}
            <button onClick={() => setIsLoginView(true)}>Faça o Login</button>
          </p>
        </>
      )}
    </div>
  );
}

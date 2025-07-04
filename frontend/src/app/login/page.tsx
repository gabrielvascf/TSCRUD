"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const { login, register } = useAuth();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(username, password, nome);
    setIsLoginView(true);
  };

  const inputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonClasses =
    "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  const switchButtonClasses = "font-medium text-blue-600 hover:text-blue-500";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {isLoginView ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Usuário
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
              <button type="submit" className={buttonClasses}>
                Entrar
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Não tem uma conta?{" "}
              <button
                onClick={() => setIsLoginView(false)}
                className={switchButtonClasses}
              >
                Cadastre-se
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Cadastro</h2>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Usuário (Username)
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
              <button type="submit" className={buttonClasses}>
                Cadastrar
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <button
                onClick={() => setIsLoginView(true)}
                className={switchButtonClasses}
              >
                Faça o Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

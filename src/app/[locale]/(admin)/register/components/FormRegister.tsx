'use client';

import { registerUser } from "@/actions/access/registerUser";
import { useState } from "react";
import Button from "@/components/buttons/Button";

export default function FormRegister() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleAction(formData: FormData) {
        try {
            setIsLoading(true);
            await registerUser(formData);
        } catch {
            console.log("Error en el form register: ");
        } finally {
            setIsLoading(false);
        }
    }

    const inputClasses = `
        w-full px-4 py-3 rounded-lg border border-primary-200 dark:border-primary-700 
        bg-white dark:bg-gray-700 text-foreground placeholder-gray-500 dark:placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
        transition-all duration-200
    `;

    return (
        <div className="space-y-6">
            <form action={handleAction} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre completo
                    </label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Tu nombre completo"
                        className={inputClasses}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Correo electrónico
                    </label>
                    <input
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        className={inputClasses}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Mínimo 8 caracteres"
                            className={inputClasses}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-700 transition-colors duration-200"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>

                <div className="pt-4">
                    <Button
                        type="action"
                        variant="primary"
                        size="lg"
                        text={isLoading ? "Registrando..." : "Crear cuenta"}
                        className="w-full justify-center"
                        onClick={() => { }}
                    />
                </div>
            </form>
        </div>
    );
}
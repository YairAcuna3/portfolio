"use client";

import { loginUser } from "@/actions/access/loginUser";
import { useState } from "react";
import Button from "@/components/buttons/Button";

export default function FormLogin() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        try {
            setIsLoading(true);
            setError("");
            const res = await loginUser(formData);
            if (!res.success) {
                setError(res.error || "Error al iniciar sesión");
            } else {
                window.location.href = "/";
            }
        } catch {
            setError("Error inesperado. Intenta de nuevo.");
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
            <form action={handleSubmit} className="space-y-4">
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
                    <input
                        name="password"
                        type="password"
                        placeholder="Tu contraseña"
                        className={inputClasses}
                        required
                    />
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                    </div>
                )}

                <div className="pt-4">
                    <Button
                        type="action"
                        variant="primary"
                        size="lg"
                        text={isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                        className="w-full justify-center"
                        onClick={() => { }}
                    />
                </div>
            </form>
        </div>
    );
}

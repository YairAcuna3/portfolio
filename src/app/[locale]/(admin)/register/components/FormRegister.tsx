'use client';

import { registerUser } from "@/actions/access/registerUser";
import { useState } from "react";

export default function FormRegister() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleAction(formData: FormData) {
        try {
            await registerUser(formData);
        } catch {
            console.log("Error en el form register: ");
        }
    }

    return (
        <div className="flex flex-col">
            <form
                action={handleAction}
                className="flex flex-col"
            >
                <input
                    name="name"
                    type="text"
                    placeholder="Nombre uwu"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="tuprima@fujimoto.ahegao"
                />
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="*****"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-700 transition-colors duration-200"
                >
                    {showPassword ? '🙈' : '👁️'}
                </button>
                <button
                    type="submit"
                    className=""
                >
                    Registrar xd
                </button>
            </form>
        </div>
    );
}
"use client";

import { loginUser } from "@/actions/access/loginUser";
import { useState } from "react";

export default function FormLogin() {
    const [error, setError] = useState("");

    async function handleSubmit(formData: FormData) {
        const res = await loginUser(formData);
        if (!res.success) {
            setError(res.error || "Error al iniciar sesión");
        } else {
            window.location.href = "/";
        }
    }

    return (
        <div>
            <form action={handleSubmit}>
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Contraseña" required />
                <button type="submit">Entrar</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>

    );
}

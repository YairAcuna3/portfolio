"use client";

import GreatAlert from "@/components/GreatAlert";
import YairAcunaIcon from "@/components/icons/IconYairAcuna";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useState } from "react";
import { contactLinks } from "./constants/contactLinks";

export default function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [isOk, setIsOk] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch("/api/resend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        if (data.success) {
            setIsOk(true);
            setForm({ name: "", email: "", subject: "", message: "" });
        } else {
            //TODO: Agregar algo para decir que salió mal
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col lg:flex-row md:pt-4 lg:pt-0 justify-center w-full lg:gap-6">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col self-center px-12 pt-10 pb-8 w-9/10 lg:w-1/2 gap-3 bg-labels-bg dark:bg-labels-bg-drk rounded-xl"
            >
                <h1 className="text-3xl sm:text-4xl xl:text-6xl mb-8 text-center">
                    ¡Contáctame!
                </h1>
                <div className="flex justify-between mb-8">
                    <div className="flex flex-col w-full md:w-2/3 lg:w-full xl:w-3/5 gap-3">
                        <h2>Tu nombre:</h2>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="border p-3 rounded"
                        />
                        <h2>Tu correo:</h2>
                        <input
                            type="email"
                            placeholder="Tu correo"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            className="border p-3 rounded"
                        />
                    </div>
                    <YairAcunaIcon
                        size={150}
                        lightColor="var(--color-primary-100)"
                        darkColor="white"
                        className="hidden md:block lg:hidden xl:block"
                    />
                </div>
                <h2>Deja aquí tu mensaje:</h2>
                <input
                    type="text"
                    placeholder="Asunto (opcional)"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full md:w-2/3 lg:w-full xl:w-4/5  border p-3 rounded"
                />
                <textarea
                    placeholder="Tu mensaje"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="border p-3 rounded min-h-[150px]"
                />
                <div className="flex items-end w-full">
                    <button
                        type="submit"
                        className="mt-4 w-full sm:w-1/4 ml-auto bg-btn hover:bg-btn-hover dark:bg-btn-drk dark:hover:bg-btn-drk-hover dark:text-white px-4 py-2 rounded text-lg"
                    >
                        Enviar
                    </button>
                </div>
            </form>

            <div className="self-center lg:self-start flex flex-col bg-labels-bg dark:bg-labels-bg-drk w-9/10 lg:w-3/10 xl:w-1/4 px-12 lg:px-8 xl:px-12 py-8 my-20 rounded-xl gap-2">
                <h2 className="text-3xl sm:text-4xl lg:text-2xl xl:text-4xl text-center mb-8">
                    Más información
                </h2>
                {contactLinks.map(({ id, href, label, icon: Icon }) => {
                    const baseClass = "flex gap-4 text-xl sm:text-2xl lg:text-lg xl:text-xl items-center";

                    return href ? (
                        <a
                            key={id}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={href}
                            className={baseClass}
                        >
                            <Icon
                                size={25}
                                lightColor="var(--color-primary-100)"
                                darkColor="white"
                            />
                            <p>{label}</p>
                        </a>
                    ) : (
                        <div key={id} className={baseClass}>
                            <Icon
                                size={25}
                                lightColor="var(--color-primary-100)"
                                darkColor="white"
                            />
                            <p>{label}</p>
                        </div>
                    )
                }
                )}
            </div>

            <LoadingOverlay isLoading={isLoading} />
            <GreatAlert
                isOpen={isOk}
                onClose={() => setIsOk(false)}
                title='¡Mensaje enviado correctamente!'
                text='Revisaré tu mensaje lo más pronto posible'
            />
        </div>
    );
}

import FormRegister from "./components/FormRegister";
import { Text } from "@/components/typography/Text";
import SeparatorLine from "@/components/SeparatorLine";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md mx-4">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <Text
                        segments={[
                            { text: "Crear", color: "text-primary-700 dark:text-primary-200", size: "text-4xl sm:text-5xl", breakAfter: true },
                            { text: "Nueva Cuenta", color: "text-foreground", size: "text-4xl sm:text-5xl" }
                        ]}
                        className="mb-4"
                        fontWeight="bold"
                    />
                    <p className="text-primary-600 dark:text-primary-300 text-lg">
                        Únete para gestionar tus proyectos
                    </p>
                </div>

                <SeparatorLine className="mb-8" />

                {/* Form Container */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-primary-100 dark:border-primary-800 p-8">
                    <FormRegister />
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        ¿Ya tienes cuenta?{" "}
                        <a
                            href="/login"
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                        >
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
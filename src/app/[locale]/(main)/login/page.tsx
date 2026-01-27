import FormLogin from "./components/FormLogin";
import { Text } from "@/components/typography/Text";
import SeparatorLine from "@/components/SeparatorLine";
import Link from "next/link";

export default async function LoginPage() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <Text
                        segments={[
                            { text: "Bienvenido", color: "text-primary-700 dark:text-primary-200", size: "text-4xl sm:text-5xl", breakAfter: true },
                            { text: "de Vuelta", color: "text-foreground", size: "text-4xl sm:text-5xl" }
                        ]}
                        className="mb-4"
                        fontWeight="bold"
                    />
                    <p className="text-primary-600 dark:text-primary-300 text-lg">
                        Accede a tu panel de administración
                    </p>
                </div>

                <SeparatorLine className="mb-8" />

                {/* Form Container */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-primary-100 dark:border-primary-800 p-8 lg:p-10 xl:p-12">
                    <FormLogin />
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        ¿No tienes cuenta?{" "}
                        <Link
                            href="/register"
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
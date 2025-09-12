import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import TopMenu from "@/components/topmenu/TopMenu";
import { NextIntlClientProvider } from "next-intl";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    if (!session) {
        redirect("/");
    }

    return (
        <NextIntlClientProvider>
            <div className="flex flex-col min-h-screen bg-gray-900 text-cyan-300">
                <TopMenu session={session} />
                <main className="flex-grow">
                    {children}
                </main>
            </div>
        </NextIntlClientProvider>
    )
}

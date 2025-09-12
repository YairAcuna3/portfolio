import TopMenu from "@/components/topmenu/TopMenu";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getSession } from "@/lib/getSession";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    return (
        <NextIntlClientProvider>
            <div className="flex flex-col min-h-screen">
                <TopMenu session={session} />
                <main className="flex grow w-full mt-18">
                    {children}
                </main>
                <Footer />
            </div>
        </NextIntlClientProvider>
    );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/ModeToggle";
import { ModeLogout } from "@/components/ModeLogout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen `}
            >
                <div className="flex justify-end border-b-2 border-gray-200 px-4">
                    <NavigationMenu className="py-1">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <ModeToggle />
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <ModeLogout />
                            </NavigationMenuItem>
                            {/* <NavigationMenuItem>
                            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem> */}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {children}
            </body>
        </html>
    );
}
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { logout } from "@/service/auth";
import { useRouter } from "next/navigation";


export function ModeLogout() {
    const router = useRouter(); // Mueve esto aquí

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await logout(token);
                localStorage.removeItem('token'); // Elimina el token del almacenamiento
                router.push('/'); // Redirige a la página de login
            } catch (err) {
                console.error('Logout failed', err);
            }
        }
    };

    return (
        <Button variant="destructive" onClick={handleLogout} >
            <LogOutIcon className="w-6 h-6" />
        </Button>
    )
}
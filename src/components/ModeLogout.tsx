"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { logout } from "@/service/auth";
import { useRouter } from "next/navigation";


export function ModeLogout() {
    const router = useRouter(); // Mueve esto aquí

    const handleLogout = async () => {
        try {
            await logout();
            // Redirigir o hacer algo después de cerrar sesión
            window.location.href = '/'; // Redirigir a la página de inicio de sesión
        } catch (err) {
            console.error('Error al cerrar sesión:', err);
        }
    };

    return (
        <Button variant="destructive" onClick={handleLogout} >
            <LogOutIcon className="w-6 h-6" />
        </Button>
    )
}
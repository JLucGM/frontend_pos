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
            // Aquí puedes manejar la redirección o el estado de la aplicación después del logout
            console.log('Logout exitoso');
            // Por ejemplo, redirigir a la página de inicio o a la página de login
            router.push('/'); // Cambia esto según tu ruta de login
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };
    return (
        <Button variant="destructive" onClick={handleLogout} >
            <LogOutIcon className="w-6 h-6" />
        </Button>
    )
}
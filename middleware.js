// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token'); // O donde almacenes el token

    // Verifica si el token existe
    if (!token) {
        // Redirige a la página de login si no hay token
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Si el token existe, permite que la solicitud continúe
    return NextResponse.next();
}

// Define las rutas donde quieres aplicar el middleware
export const config = {
    matcher: ['/pos/:path*'], // Aplica el middleware solo a las rutas que comienzan con /pos
};
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.SECRET_KEY || '16a91c59880c0387284be7beff8014c7ba034abf34718ff6725a7ca8292d39098acdf46b639c2e4ee6096790ab6cc890ad726374e822b8a0b1c8d6a46c48609a'; // Usa una clave segura desde las variables de entorno

export async function middleware(request) {
    // console.log('middleware ejecutado para:', request.nextUrl.pathname);
    // console.log('middleware');

    const jwt = request.cookies.get('myToken');
    // console.log('jwt', jwt);
    if (request.nextUrl.pathname.includes('/pos')) {
        // console.log('middleware ejecutado para:', request.nextUrl.pathname);

        if (!jwt) {
            return NextResponse.redirect(new URL('/', request.url)); // Redirige a la página de inicio
        }

        try {
            const {payload} = await jwtVerify(jwt.value, new TextEncoder().encode(SECRET_KEY));
            
            console.log(payload);

            return NextResponse.next(); // Asegúrate de devolver una respuesta

        }
        catch (error) {
            console.log(error);
            return NextResponse.redirect(new URL('/',
            request.url)); // Redirige a la página de inicio
        }

    }

    return NextResponse.next(); // Asegúrate de devolver una respuesta
}
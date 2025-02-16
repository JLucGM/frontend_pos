// app/pos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '../../service/apiConfig';
import { Product } from '@/types/Product'; // Asegúrate de que la ruta sea correcta
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus } from 'lucide-react';

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}products`); // Asegúrate de que la URL sea correcta
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const data = await response.json();
                console.log(data); // Verifica la respuesta

                // Ajusta esto según la estructura real de la respuesta
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data.products) {
                    setProducts(data.products); // Ajusta según la estructura de tu API
                } else {
                    console.error('La respuesta no contiene un array de productos');
                }
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchProducts();
    }, []);

    return (
        <div>
            <div className=" bg-slate-500s max-h-screen">
                <div className="grid grid-cols-3 px-5">

                    <div className="max-h-screen bg-red-400s col-span-full sm:col-span-2">
                        <ScrollArea className="h-full max-h-screen border-r-2 border-gray-200 bg-yellow-400d">
                            <div className="p-4  grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:gap-x-4">
                                <Input className=' col-span-full' type="text" placeholder='buscar producto (nombre, codigo de barra)' />
                                {products.map((product) => (
                                    <Card key={product.id}>
                                        <CardHeader className='p-0'>
                                            {product.media.length > 0 && (
                                                <div key={product.media[0].id}>
                                                    <img
                                                        src={product.media[0].original_url}
                                                        alt={product.media[0].name}
                                                        className="aspect-square w-full rounded-lg bsg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-60"
                                                    />
                                                </div>
                                            )}
                                        </CardHeader>
                                        <CardContent className='py-0'>
                                            <CardTitle className='text-xl'>{product.product_name}</CardTitle>
                                            <CardDescription>{product.product_barcode}</CardDescription>
                                        </CardContent>
                                        <CardFooter className='py-0 space-x-2'>
                                            {product.product_price_discount < product.product_price ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through' }}>
                                                        {product.product_price}
                                                    </span>
                                                    <span>
                                                        {product.product_price_discount}
                                                    </span>
                                                </>
                                            ) : (
                                                <span>
                                                    {product.product_price}
                                                </span>
                                            )}
                                        </CardFooter>
                                    </Card>
                                ))}

                            </div>
                        </ScrollArea>
                    </div>

                    <div className="max-h-screen col-span-full sm:col-span-1">
                        <ScrollArea className='h-1/2 max-h-1/2s bg-green-800s p-2'>
                            <div className="">

                                <div className="flex">
                                    <Input className=' col-span-full' type="text" placeholder='buscar cliente' />

                                    <Dialog>
                                        <DialogTrigger className={buttonVariants({ variant: "outline" })} >+</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form action="">
                                                <input type="text" name="name" />
                                                <input type="text" name="client_identification" />
                                                <input type="text" name="client_phone" />
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            
                            
                            <div className="flex items-center justify-center space-x-4 border rounded-lg p-1 my-1">
                                <img src="https://placehold.co/50x50" alt="" />
                                <div className="">

                                    <p>nombre largo del producto de prueba porque hay que probar todo bien</p>
                                </div>
                                <div className="">
                                    <p className='font-semibold text-destructive'>$41110.00</p>
                                <div className="flex items-center space-x-2">

                                <Button variant="default" size={"sm"}>
                                    <Minus />
                                </Button>
                                    <span>1</span>
                                <Button variant="default" size={"sm"}>
                                    <Plus />
                                </Button>
                                </div>
                                
                                </div>
                                <Button variant="destructive">X</Button>
                            </div>
                            <div className="flex items-center justify-center space-x-4 border rounded-lg p-1 my-1">
                                <img src="https://placehold.co/50x50" alt="" />
                                <div className="">

                                    <p>nombre largo del producto de prueba porque hay que probar todo bien</p>
                                </div>
                                <div className="">
                                    <p className='font-semibold text-destructive'>$41110.00</p>
                                <div className="flex items-center space-x-2">

                                <Button variant="default" size={"sm"}>
                                    <Minus />
                                </Button>
                                    <span>1</span>
                                <Button variant="default" size={"sm"}>
                                    <Plus />
                                </Button>
                                </div>
                                
                                </div>
                                <Button variant="destructive">X</Button>
                            </div>
                            <div className="flex items-center justify-center space-x-4 border rounded-lg p-1 my-1">
                                <img src="https://placehold.co/50x50" alt="" />
                                <div className="">

                                    <p>nombre largo del producto de prueba porque hay que probar todo bien</p>
                                </div>
                                <div className="">
                                    <p className='font-semibold text-destructive'>$41110.00</p>
                                <div className="flex items-center space-x-2">

                                <Button variant="default" size={"sm"}>
                                    <Minus />
                                </Button>
                                    <span>1</span>
                                <Button variant="default" size={"sm"}>
                                    <Plus />
                                </Button>
                                </div>
                                
                                </div>
                                <Button variant="destructive">X</Button>
                            </div>
                            <div className="flex items-center justify-center space-x-4 border rounded-lg p-1 my-1">
                                <img src="https://placehold.co/50x50" alt="" />
                                <div className="">

                                    <p>nombre largo del producto de prueba porque hay que probar todo bien</p>
                                </div>
                                <div className="">
                                    <p className='font-semibold text-destructive'>$41110.00</p>
                                <div className="flex items-center space-x-2">

                                <Button variant="default" size={"sm"}>
                                    <Minus />
                                </Button>
                                    <span>1</span>
                                <Button variant="default" size={"sm"}>
                                    <Plus />
                                </Button>
                                </div>
                                
                                </div>
                                <Button variant="destructive">X</Button>
                            </div>


                        </ScrollArea>

                        <ScrollArea className='h-1/2  max-h-1/2 bg-green-400s p-2'>
                            <div className="flex justify-end items-center space-x-1 mb-1">
                                <p className='font-semibold text-lg'>Tax:</p>
                                <p>0.00</p>
                            </div>
                            <div className="flex justify-end items-center space-x-1 mb-1">
                                <p className='font-semibold text-lg'>Cantidad total:</p>
                                <p>0</p>
                            </div>
                            <div className="flex justify-end items-center space-x-1 mb-1">
                                <p className='font-semibold text-lg'>Carga de envio:</p>
                                <p>0.00</p>
                            </div>
                            <div className="flex justify-end items-center space-x-1 mb-1">
                                <p className='font-semibold text-lg'>Descuento:</p>
                                <p>0.00</p>
                            </div>
                            <div className="flex justify-end items-center space-x-1 mb-1 border-t-4 border-t-red-600">
                                <p className='font-semibold text-lg'>Total:</p>
                                <p>0.00</p>
                            </div>
                            <div className="flex justify-end items-center space-x-1 mb-1">
                                <Button>Cancelar</Button>
                                <Button variant="destructive">Pagar</Button>

                            </div>
                        </ScrollArea>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
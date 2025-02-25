'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '../../service/apiConfig';
import { Product } from '@/types/Product'; // Asegúrate de que la ruta sea correcta
import { Client, PaymentMethod } from '@/types/Product'; // Asegúrate de que la ruta sea correcta
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Select, { SingleValue } from 'react-select';
import { Separator } from '@/components/ui/separator';

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]); // Estado para el carrito con cantidad
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState<SingleValue<{ value: number; label: string }> | null>(null); // Ajusta el tipo aquí
    const [clientOptions, setClientOptions] = useState<{ value: number; label: string }[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]); // Usar la interfaz PaymentMethod
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<SingleValue<PaymentMethod> | null>(null);
    const [paymentMethodDetails, setPaymentMethodDetails] = useState<any[]>([]);

    // Estado para el formulario del nuevo cliente
    const [newClient, setNewClient] = useState({
        client_name: '',
        client_identification: '',
        client_phone: ''
    });
    // Estado para el mensaje de éxito
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    // console.log(selectedClient)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}products`); // Asegúrate de que la URL sea correcta
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const data = await response.json();
                // console.log(data); // Verifica la respuesta

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

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`${API_URL}client`);
                const data = await response.json();
                // console.log(data);
                // Verifica si data.client es un array
                if (Array.isArray(data.client)) {
                    const options = data.client.map((client: Client) => ({
                        value: client.id,
                        label: `${client.client_name} - C.I: ${client.client_identification}` // Combina nombre e identificación
                    }));
                    setClientOptions(options);
                } else {
                    console.error('La respuesta no es un array:', data.client);
                }
            } catch (error) {
                console.error('Error al obtener los clientes:', error);
            }
        };

        fetchClients();
    }, []);

    // Nueva función para obtener métodos de pago
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await fetch(`${API_URL}payment-methods`);
                const data = await response.json();
                if (Array.isArray(data.paymentMethod)) {
                    const options: PaymentMethod[] = data.paymentMethod.map((method: { id: number; payment_method_name: string; details: any[] }) => ({
                        value: method.id,
                        label: method.payment_method_name,
                        details: method.details // Almacenar detalles aquí
                    }));
                    setPaymentMethods(options);
                } else {
                    console.error('La respuesta no contiene un array de métodos de pago');
                }
            } catch (error) {
                console.error('Error al obtener los métodos de pago:', error);
            }
        };

        fetchPaymentMethods();
    }, []);

    const handlePaymentMethodChange = (selectedOption: SingleValue<PaymentMethod>) => {
        setSelectedPaymentMethod(selectedOption);
        const selectedMethod = paymentMethods.find(method => method.value === selectedOption?.value);
        setPaymentMethodDetails(selectedMethod ? selectedMethod.details : []); // Establecer detalles
    };

    const fetchClients = async () => {
        try {
            const response = await fetch(`${API_URL}client`);
            const data = await response.json();
            if (Array.isArray(data.client)) {
                const options = data.client.map((client: Client) => ({
                    value: client.id,
                    label: client.client_name
                }));
                setClientOptions(options);
            } else {
                console.error('La respuesta no es un array:', data.client);
            }
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    };


    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.product.id === product.id);
            if (existingProduct) {
                // Si el producto ya está en el carrito, solo aumentamos la cantidad
                return prevCart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no está, lo agregamos con cantidad 1
                return [...prevCart, { product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter(item => item.product.id !== productId));
    };

    const increaseQuantity = (productId: number) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (productId: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.product.id === productId);
            if (existingProduct && existingProduct.quantity > 1) {
                return prevCart.map(item =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevCart.filter(item => item.product.id !== productId);
            }
        });
    };

    // Función para calcular el subtotal del carrito
    const calculateSubtotal = () => {
        return cart.reduce((subtotal, item) => {
            const price = parseFloat(item.product.product_price); // Usar el precio base
            return subtotal + price * item.quantity;
        }, 0).toFixed(2); // Formatear a dos decimales
    };

    // Función para calcular el total de descuentos
    const calculateTotalDiscounts = () => {
        return cart.reduce((totalDiscount, item) => {
            const discount = item.product.product_price_discount
                ? (parseFloat(item.product.product_price) - parseFloat(item.product.product_price_discount)) * item.quantity
                : 0;
            return totalDiscount + discount;
        }, 0).toFixed(2); // Formatear a dos decimales
    };

    // Función para calcular el total final
    const calculateTotal = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const totalDiscounts = parseFloat(calculateTotalDiscounts());
        return (subtotal - totalDiscounts).toFixed(2); // Formatear a dos decimales
    };

    // Filtrar productos según el término de búsqueda
    const filteredProducts = products.filter(product => {
        const productNameMatch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
        const productBarcodeMatch = product.product_barcode != null && product.product_barcode.toString().includes(searchTerm);
        return productNameMatch || productBarcodeMatch;
    });

    const handleNewClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewClient(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        try {
            const response = await fetch(`${API_URL}client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClient),
            });

            if (!response.ok) {
                throw new Error('Error al crear el cliente');
            }

            const createdClient = await response.json();
            // Limpiar el formulario
            setNewClient({ client_name: '', client_identification: '', client_phone: '' });
            // Limpiar la selección del cliente
            setSelectedClient(null); // Limpiar el campo de selección
            // Mostrar mensaje de éxito
            setSuccessMessage(`Cliente ${createdClient.client_name} creado exitosamente!`);
            // Limpiar el mensaje después de 3 segundos
            setTimeout(() => setSuccessMessage(null), 3000);

            // Volver a obtener la lista de clientes
            fetchClients(); // Llama a la función que obtiene los clientes
        } catch (error) {
            console.error('Error al crear el cliente:', error);
        }
    };

// Función para manejar el clic en el botón "Cancelar"
const handleCancel = () => {
    setCart([]); // Limpiar el carrito
    setSelectedClient(null); // Limpiar el cliente seleccionado
    setSelectedPaymentMethod(null); // Limpiar el método de pago seleccionado
    setPaymentMethodDetails([]); // Limpiar los detalles del método de pago
};

    return (
        <div>
            <div className=" bg-slate-500s max-h-screen">
                <div className="grid grid-cols-3 px-5">

                    <div className="max-h-screen bg-red-400s col-span-full sm:col-span-full md:col-span-full lg:col-span-2 ">
                        <ScrollArea className="h-screen max-h-screen border-r-2 border-gray-200 bg-yellow-400d">
                            <div className="p-4  grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-4">
                                <Input className='capitalize col-span-full' type="text" placeholder='buscar producto (nombre, codigo de barra)' onChange={(e) => setSearchTerm(e.target.value)} />
                                {products.filter(product => {
                                    const productNameMatch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
                                    const productBarcodeMatch = product.product_barcode != null && product.product_barcode.toString().includes(searchTerm);
                                    return productNameMatch || productBarcodeMatch;
                                }).map((product) => (
                                    <button key={product.id} onClick={() => addToCart(product)}>
                                        <Card className="h-full">
                                            <CardHeader className='p-0'>
                                                {product.media.length > 0 && (
                                                    <div key={product.media[0].id}>
                                                        <img
                                                            src={product.media[0].original_url}
                                                            alt={product.media[0].name}
                                                            className="aspect-square w-full max-h-48 rounded-lg bsg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-60"
                                                        />
                                                    </div>
                                                )}
                                            </CardHeader>
                                            <CardContent className='py-0'>
                                                <CardTitle className='capitalize text-md line-clamp-2'>{product.product_name}</CardTitle>
                                                <CardDescription>{product.product_barcode}</CardDescription>
                                            </CardContent>
                                            <CardFooter className='py-0 space-x-2 justify-center'>
                                                {product.product_price_discount ? (
                                                    <>
                                                        <span className="block">
                                                            ${product.product_price_discount}
                                                        </span>
                                                        <span className="block line-through text-sm">
                                                            ${product.product_price}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span>
                                                        ${product.product_price}
                                                    </span>
                                                )}

                                            </CardFooter>
                                        </Card>
                                    </button>
                                ))}

                            </div>
                        </ScrollArea>
                    </div>

                    <div className="max-h-screen col-span-full sm:col-span-full md:col-span-full lg:col-span-1 p-4">
                        <ScrollArea className='h-1/2 mb-8 '>
                            <div className="">

                                <div className="flex">
                                    <Select
                                        options={clientOptions}
                                        value={selectedClient}
                                        onChange={setSelectedClient}
                                        placeholder="Buscar cliente"
                                        className='capitalize w-full'
                                    />

                                    <Dialog>
                                        <DialogTrigger className={buttonVariants({ variant: "outline" })} >
                                            <Plus />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Crea un cliente nuevo</DialogTitle>
                                                <DialogDescription>
                                                    Ingresa los datos requeridos para crear el cliente
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleCreateClient}>
                                                <Input
                                                    type="text"
                                                    name="client_name"
                                                    placeholder="Nombre"
                                                    value={newClient.client_name}
                                                    onChange={handleNewClientChange}
                                                    required
                                                />
                                                <Input
                                                    type="text"
                                                    name="client_identification"
                                                    placeholder="Identificación"
                                                    value={newClient.client_identification}
                                                    onChange={handleNewClientChange}
                                                    required
                                                />
                                                <Input
                                                    type="text"
                                                    name="client_phone"
                                                    placeholder="Teléfono"
                                                    value={newClient.client_phone}
                                                    onChange={handleNewClientChange}
                                                />
                                                <Button type="submit">Crear Cliente</Button>
                                            </form>
                                            {successMessage && (
                                                <div className="mt-2 text-green-600">
                                                    {successMessage}
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            {cart.map((item) => (
                                <div key={item.product.id} className="flex items-center justify-between border rounded-lg p-1 my-1">
                                    <div className="max-w-[80px]">
                                        <img src={item.product.media[0]?.original_url || "https://placehold.co/50x50"} alt={item.product.product_name}
                                            className="aspect-square w-full border rounded-lg bsg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto min-w-[80px] max-h-[80px] h-20"
                                        />
                                    </div>
                                    <div >
                                        <p className='capitalize text-sm line-clamp-2 px-2'>{item.product.product_name}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className='font-semibold text-destructive'>
                                            {item.product.product_price_discount ? (
                                                <>
                                                    <span className="">
                                                        ${item.product.product_price_discount}
                                                    </span>
                                                    <span className="ms-2 line-through text-sm">
                                                        ${item.product.product_price}
                                                    </span>
                                                </>
                                            ) : (
                                                <span>
                                                    ${item.product.product_price}
                                                </span>
                                            )}                                        </p>
                                        <div className="flex items-center">
                                            <Button className='rounded-full' size={"sm"} variant="default" onClick={() => decreaseQuantity(item.product.id)}><Minus /></Button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <Button className='rounded-full' size={"sm"} variant="default" onClick={() => increaseQuantity(item.product.id)}><Plus /></Button>
                                            <Button className='ms-1 rounded-full' variant="destructive" onClick={() => removeFromCart(item.product.id)}>
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </ScrollArea>


                        <ScrollArea className='h-1/2'>
                            {/* <div className="flex justify-end items-center space-x-1 mb-1">
                                <p className='font-semibold text-lg'>Tax:</p>
                                <p>$0.00</p>
                            </div> */}
                            <div className="flex justify-end items-center space-x-1 mb-1">
                                <Select
                                    options={paymentMethods}
                                    value={selectedPaymentMethod}
                                    onChange={handlePaymentMethodChange}
                                    placeholder="Seleccionar método de pago"
                                    className='w-full capitalize'
                                />
                            </div>
                            {paymentMethodDetails.length > 0 && (
                                <div className="border-2 border-red-400 rounded-xl p-2">
                                    <h1>Detalles del Método de Pago:</h1>
                                    <ul>
                                        {paymentMethodDetails.map((detail, index) => (
                                            <li className='flex' key={index}>
                                                <p className='font-bold me-1'>{detail.payments_method_details_data_types}:</p> <p>{detail.payments_method_details_value}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex justify-end items-center space-x-1 mb-1">
                                <p className='font-semibold text-lg'>Subtotal:</p>
                                <p>${calculateSubtotal()}</p>
                            </div>
                            <div className="flex justify-end items-center space-x-1 mb-1">
                                <p className='font-semibold text-lg'>Total Descuentos:</p>
                                <p>${calculateTotalDiscounts()}</p>
                            </div>
                            <div className="flex justify-end items-center space-x-1 mb-1 border-t-4 border-t-red-600">
                                <p className='font-semibold text-lg'>Total:</p>
                                <p>${calculateTotal()}</p>
                            </div>
                            <div className="flex justify-end items-center space-x-1 mb-1">
                            <Button onClick={handleCancel}>Cancelar</Button> {/* Llama a la función handleCancel */}
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
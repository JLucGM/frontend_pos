// app/pos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '../../service/apiConfig';
import { Product } from '@/types/Product'; // Asegúrate de que la ruta sea correcta

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products`); // Asegúrate de que la URL sea correcta
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
            
            {/* {products.map((product) => (
          <li key={product.id}>
            <h2>{product.product_name}</h2>
            <p>{product.product_description}</p>
            <p>Precio: {product.product_price}</p>
            <p>Precio con descuento: {product.product_price_discount}</p>
            <p>Impuesto: {product.tax?.tax_name} ({product.tax?.tax_rate}%)</p>
            <p>Categorías:</p>
            <ul>
              {product.categories.map((category) => (
                <li key={category.id}>{category.category_name}</li>
              ))}
            </ul>
            <p>Stock disponible:</p>
            <ul>
              {product.stocks.map((stock) => (
                <li key={stock.id}>Cantidad: {stock.quantity}</li>
              ))}
            </ul>
            <p>Combinaciones:</p>
            <ul>
              {product.combinations.map((combination) => (
                <li key={combination.id}>
                  Precio de combinación: {combination.combination_price}
                  <ul>
                    {combination.combination_attribute_value.map((attrValue) => (
                      <li key={attrValue.id}>
                        {attrValue.attribute_value.attribute_value_name} - {attrValue.attribute_value.attribute.attribute_name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p>Imágenes:</p>
            <ul>
              {product.media.map((mediaItem) => (
                <li key={mediaItem.id}>
                  <img src={mediaItem.original_url} alt={mediaItem.name} width="100" />
                </li>
              ))}
            </ul>
          </li>
        ))} */}
            {/* <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                <div className="grid grid-cols-3">
                    <div className="bg-red-400 mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">

                        {products.map((product) => (
                            <div key={product.id} className="group relative">
                                {product.media.length > 0 && (
                                    <div key={product.media[0].id}>
                                        <img
                                            src={product.media[0].original_url}
                                            alt={product.media[0].name}
                                            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                        />
                                    </div>
                                )}
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href="#">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.product_name}
                                            </a>
                                        </h3>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.product_price}</p>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>

            </div> */}

            <div className="h-screen bg-slate-500">
                <div className="grid grid-cols-4 px-5">
                    <div className="bg-red-400 col-span-2">
                    <h1>Productos</h1>
                        <div className="p-4 mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">

                            {products.map((product) => (
                                <div key={product.id} className="group relative bg-white rounded-lg">
                                    {product.media.length > 0 && (
                                        <div key={product.media[0].id}>
                                            <img
                                                src={product.media[0].original_url}
                                                alt={product.media[0].name}
                                                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-60"
                                            />
                                        </div>
                                    )}
                                    <div className="px-2 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href="#">
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.product_name}
                                                </a>
                                            </h3>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900">{product.product_price}</p>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>

                    <div className="bg-green-400">
                        <h1>CArrito</h1>
                    </div>
                    <div className="bg-blue-400">
                        <h1>Datos de compra y usuario</h1>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
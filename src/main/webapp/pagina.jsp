<%-- 
    Document   : pagina
    Created on : 24/09/2024, 12:04:17 a. m.
    Author     : USUARIO
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="stylespro.css">
        <title>ZAPATERIA JM</title>
    </head>
    <body>
                <%
            // Verifica si la sesión tiene un atributo "nombres"
            if (session.getAttribute("nombres") == null) {
                // Si no lo tiene (el usuario no ha iniciado sesión), redirige al login
                response.sendRedirect("index.html");
                return; // Termina la ejecución de la página JSP
            }
        %>
        <header>
        <div class="navbar">
            <div class="logo">
                <img src="logos/logo.png" alt="Logo Zapatería JM">
                <h1>ZAPATERÍA JM</h1>
            </div>
            <div class="social-icons">
                <a href="#"><img src="logos/facebook.png" alt="Facebook"></a>
                <a href="#"><img src="logos/twitter.png" alt="Twitter"></a>
                <a href="#"><img src="logos/instagram.jpg" alt="Instagram"></a>
                <a href="#"><img src="logos/youtube.png" alt="Youtube"></a>
            </div>
            <div class="cart-summary">
                <button class="cart-icon-btn" onclick="window.location.href = 'carrito.html';">
                    <img src="logos/cart.png" alt="Carrito de Compras">
                    <span class="cart-count" id="cartTotalItems">0</span>
                </button>
                <p>Subtotal: $<span id="cartSubtotal">0.00</span></p>
            </div>
        </div>
        <nav class="navigation" role="navigation">
            <a href="hombres.html">Hombres</a>
            <a href="mujeres.html">Mujeres</a>
            <a href="niños.html">Niños</a>
            <a href="niñas.html">Niñas</a>
            <a href="ofertas.html">Ofertas</a>
        </nav>
    </header>
    <main role="main">
        <section class="filters-container">
            <button class="toggle-filters" id="toggleFiltersBtn">Mostrar/Ocultar Filtros</button>
            <div class="filters" id="filters" role="form" aria-label="Filtros de búsqueda">
                <label for="category">Categoría:</label>
                <select id="category" name="category">
                    <option value="">Todos</option>
                    <option value="casual">Casual</option>
                    <option value="deportivo">Deportivo</option>
                    <option value="urbana">Urbana</option>
                    <option value="botin">Botín</option>
                    <option value="sandalias">Sandalias</option>
                </select>
                <label for="color">Color:</label>
                <select id="color" name="color">
                    <option value="">Todos</option>
                    <option value="negro">Negro</option>
                    <option value="azul">Azul</option>
                    <option value="rojo">Rojo</option>
                    <option value="verde">Verde</option>
                    <option value="blanco">Blanco</option>
                </select>
                <label for="size">Talla:</label>
                <select id="size" name="size">
                    <option value="">Todos</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                </select>
                <label for="priceRange">Rango de Precio:</label>
                <input type="text" id="priceRange" name="priceRange" placeholder="Ej: 50000-100000">
                <button id="applyFiltersBtn">Aplicar Filtros</button>
            </div>
        </section>
        <section class="product-grid" id="productGrid" role="region" aria-label="Productos">
            <!-- Ejemplo de producto -->
            <div class="product-item" data-id="1">
                <img src="path/to/product-image.jpg" alt="Nombre del Producto">
                <div class="product-details">
                    <h3>Nombre del Producto</h3>
                    <p>Precio: $<span class="product-price">100.000</span></p>
                    <button class="add-to-cart-btn">Añadir al Carrito</button>
                </div>
            </div>
            <!-- Repite el bloque anterior para cada producto -->
        </section>
    </main>
    <footer>
        <p>Información: Excelente empresa... TI:(57)422343</p>
        <p>Desarrollado por: AlphaGroupII</p>
        <div class="social-icons">
            <a href="#"><img src="logos/facebook.png" alt="Facebook"></a>
            <a href="#"><img src="logos/twitter.png" alt="Twitter"></a>
            <a href="#"><img src="logos/instagram.jpg" alt="Instagram"></a>
            <a href="#"><img src="logos/youtube.png" alt="Youtube"></a>
        </div>
        <div class="newsletter">
            <a href="registro.html"><button>SUBSCRIBIRSE</button></a>
        </div>
    </footer>
    <script src="scriptspro.js"></script>
    </body>
</html>

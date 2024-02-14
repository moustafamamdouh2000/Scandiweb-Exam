<?php


require_once "./vendor/autoload.php";
require_once "./config/config.php";

use MyApp\controller\ProductController;

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $controller = new ProductController("GET");
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $controller = new ProductController("POST");
} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $controller = new ProductController("DELETE");
} else {
    echo "Error: 404 not found";
}
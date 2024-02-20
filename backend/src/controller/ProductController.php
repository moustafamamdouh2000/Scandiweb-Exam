<?php

namespace MyApp\controller;

use MyApp\models\Product;

class ProductController
{
    private $requestType;

    public function __construct($requestType)
    {
        $this->requestType = $requestType;
        switch ($requestType) {
            case "DELETE":
                $this->delete();
                break;
            case "POST":
                $this->post();
                break;
            case "GET":
                $this->get();
                break;
        }
    }
    private function get()
    {
        $products = Product::getAllData();
        $response = json_encode($products);
        header('Content-Type: application/json');
        echo $response;
    }
    private function post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        print_r($data);
        $productType = $data['type'];
        $pathToClass = "MyApp\\models\\" . $productType;
        $product = new $pathToClass($data);
        if ($product->addProduct($productType)) {
            echo "Success";
        }
    }
    public function delete()
    {
        $products_sku = json_decode(file_get_contents('php://input'), true);
        foreach ($products_sku as $product_sku) {
            if (!Product::deleteProduct($product_sku)) {
                echo "Error: failed to delete product ";
            }
        }
        echo "Sucess";
    }
}

<?php

namespace MyApp\models;

use MyApp\database\QueryHelper;

abstract class Product
{
    protected $sku;
    protected $name;
    protected $price;
    public function __construct($data)
    {
        $this->sku = $data['sku'];
        $this->name = $data['name'];
        $this->price = $data['price'];
    }
    public static function getAllData()
    {
        $query = new QueryHelper();
        $products = $query->getAllProducts();
        return $products;
    }
    public  static function deleteProduct($sku)
    {
        $query = new QueryHelper();
        if ($query->deleteProduct($sku)) {
            return true;
        }
    }
    abstract function addProduct();

    protected function validateData()
    {
        if (empty($this->sku) || empty($this->name) || empty($this->price)) {
            echo "Error: please fill up all the form fields! ";
            return false;
        }
        if (!preg_match('/^([A-Za-z0-9]+)$/', $this->sku) || !preg_match('/^([A-Za-z0-9]+)$/', $this->name) || !is_numeric($this->price)) {
            echo " Error:  the input data format is not correct ";
            return false;
        }
        return true;
    }
}

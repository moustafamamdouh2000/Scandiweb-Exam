<?php

namespace MyApp\models;

use MyApp\models\Product;
use MyApp\utility\Validator;
use MyApp\database\QueryHelper;

class Book extends Product implements Validator
{
    private $weight;
    public function __construct($data)
    {
        parent::__construct($data);
        $this->weight = $data['weight'];
    }
    public function addProduct()
    {
        $query = new QueryHelper();
        if ($query->checkProduct($this->sku)) {
            echo "Error: product already exists ";
            return false;
        }
        if (!$this->validateData()) {
            echo "Error: data validation error ";
            return false;
        } else {
            $query->addProduct("weight", $this->getData());
            return true;
        }
    }
    public function validateData()
    {
        if (parent::validateData()) {
            if (empty($this->weight)) {
                echo "Error: Check product attribute weight field ";
                return false;
            }
            preg_match('/^\d+/', $this->weight, $matches);
            $number = $matches[0];
            if (!is_numeric($number) || $number < 0) {
                echo "Error: Check product attribute weight field format ";
                return false;
            }
            return true;
        }
    }
    public function getData()
    {
        return array('sku' => $this->sku, 'name' => $this->name, 'price' => $this->price, 'weight' => $this->weight);
    }
}

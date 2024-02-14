<?php

namespace MyApp\models;

use MyApp\models\Product;
use MyApp\utility\Validator;
use MyApp\database\QueryHelper;

class Dvd extends Product implements Validator
{
    protected $size;
    public function __construct($data)
    {
        parent::__construct($data);
        $this->size = $data['size'];
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
            $query->addProduct("size", $this->getData());
            return true;
        }
    }
    public function validateData()
    {
        if (parent::validateData()) {
            if (empty($this->size)) {
                echo "Error: Check product attribute size field ";
                return false;
            }
            preg_match('/^\d+/', $this->size, $matches);
            $number = $matches[0];
            if (!is_numeric($number) || $number < 0) {
                echo "Error: Check product attribute size field format ";
                return false;
            }
            return true;
        }
    }
    public function getData()
    {
        return array('sku' => $this->sku, 'name' => $this->name, 'price' => $this->price, 'size' => $this->size);
    }
}

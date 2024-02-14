<?php

namespace MyApp\models;

use MyApp\models\Product;
use MyApp\utility\Validator;
use MyApp\database\QueryHelper;

class Furniture extends Product implements Validator
{
    private $dimensions;
    public function __construct($data)
    {
        parent::__construct($data);
        $this->dimensions = $data['dimensions'];
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
            $query->addProduct("dimensions", $this->getData());
            return true;
        }
    }
    public function validateData()
    {
        if (parent::validateData()) {
            if (empty($this->dimensions)) {
                echo "Error: Check product attribute field ";
                return false;
            }
            $dimension_array = explode("x", $this->dimensions);
            if ((!is_numeric($dimension_array[0]) || $dimension_array[0] < 0) ||
                (!is_numeric($dimension_array[1]) || $dimension_array[1] < 0) ||
                (!is_numeric($dimension_array[2]) || $dimension_array[2] < 0)
            ) {
                echo "Error: Check product attribute field format ";
                return false;
            }
            return true;
        }
    }
    public function getData()
    {
        return array('sku' => $this->sku, 'name' => $this->name, 'price' => $this->price, 'dimensions' => $this->dimensions);
    }
}

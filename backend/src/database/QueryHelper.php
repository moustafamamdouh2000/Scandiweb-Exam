<?php

namespace MyApp\database;

use MyApp\database\Database;
use PDO, PDOException;

class QueryHelper extends Database
{
    public function getAllProducts()
    {
        try {
            $connection = $this->getConnection();
            $sql = "SELECT id, sku, name, price,size,weight,dimensions FROM products;";
            $stmt = $connection->query($sql);
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $products;
        } catch (PDOException $e) {
            echo "Error:" . $e->getMessage();
        }
    }
    public function checkProduct($sku)
    {
        try {
            $connection = $this->getConnection();
            $sql = "SELECT * FROM products WHERE sku = ?";
            $stmt = $connection->prepare($sql);
            $stmt->execute([$sku]);
            return $stmt->rowCount();
        } catch (PDOException $e) {
            echo "Error:" . $e->getMessage();
        }
    }
    public function addProduct($type, $data)
    {
        try {
            $connection = $this->getConnection();
            $connection->beginTransaction();
            $sql = "INSERT INTO products(sku,name,price,$type) VALUES (?,?,?,?)";
            $stmt = $connection->prepare($sql);
            $stmt->execute([$data['sku'], $data['name'], $data['price'], $data[$type]]);
            $connection->commit();
        } catch (PDOException $e) {
            $connection->rollBack();
            echo "Error:" . $e->getMessage();
        }
    }
    public function deleteProduct($sku)
    {
        try {
            $connection = $this->getConnection();
            $connection->beginTransaction();
            $sql = " DELETE FROM products WHERE sku = ?;";
            $stmt = $connection->prepare($sql);
            $stmt->execute([$sku]);
            $connection->commit();
            return true;
        } catch (PDOException $e) {
            $connection->rollBack();
            echo "Error:" . $e->getMessage();
            return false;
        }
    }
}

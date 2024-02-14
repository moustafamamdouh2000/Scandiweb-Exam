<?php

namespace MyApp\database;

use PDO;

class Database
{
    private $DBHOST;
    private $DBNAME;
    private $DBUSER;
    private $DBPASSWORD;

    public function __construct()
    {
        $this->DBHOST = $_ENV["DB_HOST"];
        $this->DBNAME = $_ENV["DB_NAME"];
        $this->DBUSER = $_ENV["DB_USER"];
        $this->DBPASSWORD = $_ENV["DB_PASSWORD"];
    }
    private $dbc;
    private function connect()
    {
        $this->dbc = new PDO("mysql:host=$this->DBHOST;dbname=$this->DBNAME", $this->DBUSER, $this->DBPASSWORD);
        if ($this->dbc->errorCode()) {
            die("Connection Error: " . $this->dbc->errorInfo());
        }
    }
    public function getConnection()
    {
        if ($this->dbc === null) {
            $this->connect();
        }
        return $this->dbc;
    }
}

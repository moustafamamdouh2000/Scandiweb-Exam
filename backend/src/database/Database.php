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
        define("DBHOST", "localhost");
        define("DBUSER", "test_user");
        define("DBNAME", "scandiweb");
        define("DBPASSWORD", "1234");
        $this->DBHOST = DBHOST;
        $this->DBUSER = DBUSER;
        $this->DBNAME = DBNAME;
        $this->DBPASSWORD = DBPASSWORD;
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

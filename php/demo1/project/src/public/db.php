<?php

class DB {

    const HOST = 'localhost';
    const DBNAME = 'my_db';
    const USERNAME = 'admin';
    const PASSWORD = 'admin';

    private $pdo = null;

    public function __construct() {
        try {
            $sql = sprintf("mysql:host=%s;dbname=%s", self::HOST, self::DBNAME);
            $this->pdo = new PDO($sql, self::USERNAME, self::PASSWORD);
            echo "Connected to db successfully.";
        } catch (PDOException $pe) {
            die("Could not connect to the database:" . $pe->getMessage());
        }
    }

    public function getRows() {
        $stmt = $this->pdo->prepare('SELECT * FROM animal;');
        $succ = $stmt->execute();

        $rows = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while ($r = $stmt->fetch()) {
            array_push($rows, array('name' => $r['name'], 'feet' => $r['feet']));
        }

        echo count($rows);
        return $rows;
    }
}

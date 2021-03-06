<?php

class DB {

    const HOST = 'localhost';
    const DBNAME = 'my_db2';
    const USERNAME = 'admin';
    const PASSWORD = 'admin';

    private $pdo = null;

    public function __construct($db) {
        try {
            $sql = sprintf("mysql:host=%s;dbname=%s;charset=utf8mb4", self::HOST, $db);
            $this->pdo = new PDO($sql, self::USERNAME, self::PASSWORD);
            //echo "Connected to db successfully.";
        } catch (PDOException $pe) {
            die("Could not connect to the database:" . $pe->getMessage());
        }
    }

    public function getZoo() {
        $stmt = $this->pdo->prepare('SELECT * FROM animal;');
        $succ = $stmt->execute();

        $rows = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while ($r = $stmt->fetch()) {
            array_push($rows, array('name' => $r['name'], 'feet' => $r['feet']));
        }

        //echo count($rows);
        return $rows;
    }

    public function getCityList() {
        $sql = 'SELECT city.id, city.name, city.py1, province.name AS prov_name, city_house_price.house_price AS price '.
            'FROM city ' .
            'INNER JOIN province ON city.in_province=province.id ' .
            'INNER JOIN city_house_price ON city.id=city_house_price.city_id ' .
            'ORDER BY py1 limit 10';
        //$sql = 'SELECT * FROM city ORDER BY py1;';
        $stmt = $this->pdo->prepare($sql);
        $succ = $stmt->execute();

        $dict = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while ($r = $stmt->fetch()) {
            $idx = $r['py1'];
            if (!isset($dict[$idx])) {
                $dict[$idx] = [];
            }
            array_push($dict[$idx], array('id' => $r['id'], 'name' => $r['name'], 'province' => $r['prov_name'], 'house_price' => $r['price']));
        }

        return $dict;
    }
}

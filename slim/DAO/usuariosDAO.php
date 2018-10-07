<?php

class Usuarios {
    

    public function search() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("SELECT * FROM usuario");

        return json_encode($res);

    }
}

?>
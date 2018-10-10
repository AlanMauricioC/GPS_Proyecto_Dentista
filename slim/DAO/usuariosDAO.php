<?php

class Usuarios {
    

    public function search() {
        $conn = $GLOBALS['conn'];
        $consulta="SELECT * FROM usuario";
        $sentencia = $conn->stmt_init();
        if(!$sentencia->prepare($consulta))
        {
            print "Falló la preparación de la sentencia\n";
        }
        else
        {   
            $arrayRes = array();
            $sentencia->execute();
            $resultado = $sentencia->get_result();
            while ($fila = $resultado->fetch_array(MYSQLI_NUM))
            {
                $arrayRes[]=$fila;
                
            }
        }

        $sentencia->close();
        $conn->close();
        
        return json_encode($arrayRes);
    }
}

?>
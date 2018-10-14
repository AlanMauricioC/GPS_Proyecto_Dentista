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

    public function insert($ID_USUARIO,$ID_TIPODEUSUARIO,$NOMBRE,$APELLIDOS,$USUARIO,$CLAVE,$ID_PERFIL,$SUCURSAL,$ES_DENTISTA,$ESTADO,$RFC,$NUM_CEL,$NUM_TEL,$ID_PERMISOS){
        $conn = $GLOBALS['conn'];
        $consulta="INSERT INTO USUARIO(ID_USUARIO, ID_TIPODEUSUARIO, NOMBRE, APELLIDOS, USUARIO, CLAVE, ID_PERFIL, SUCURSAL, ES_DENTISTA, ESTADO, RFC, NUM_CEL, NUM_TEL, ID_PERMISOS) VALUES (".$ID_USUARIO.",".$ID_TIPODEUSUARIO.",'".$NOMBRE."','".$APELLIDOS."','".$USUARIO."','".$CLAVE."',".$ID_PERFIL.",".$SUCURSAL.",".$ES_DENTISTA.",".$ESTADO.",'".$RFC."',".$NUM_CEL.",".$NUM_TEL.",".$ID_PERMISOS.")";
        $sentencia = $conn->stmt_init();
        $status=array();
        if(!$sentencia->prepare($consulta))
        {
            print "Falló la preparación de la sentencia\n";
        }
        else
        {   
            $sentencia->bind_param("iissssiiiisiii", $ID_USUARIO,$ID_TIPODEUSUARIO,$NOMBRE,$APELLIDOS,$USUARIO,$CLAVE,$ID_PERFIL,$SUCURSAL,$ES_DENTISTA,$ESTADO,$RFC,$NUM_CEL,$NUM_TEL,$ID_PERMISOS);
            if (!$sentencia->execute()) {
                $status["status"]="error";
                $status["error"]=$sentencia->errno;
                return json_encode($status);
            }else{
                $status["status"]="ok";
                $status["error"]=false;
                return json_encode($status);
            } 
        }

        $sentencia->close();
        $conn->close();
        
        return json_encode(null);
    }
}

?>
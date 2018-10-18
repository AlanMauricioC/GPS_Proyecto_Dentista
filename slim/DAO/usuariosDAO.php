<?php

class Usuarios {
    

    public function search() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from usuarios";
        
        $array = array();
        $i=0;
         
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_USUARIO"] = $registro["ID_USUARIO"];
            $array[$i]["NOMBRE"] = utf8_decode(($registro["NOMBRE"]));
            $array[$i]["ID_TIPODEUSUARIO"] = $registro["ID_TIPODEUSUARIO"];
            $array[$i]["APELLIDOS"] = utf8_decode(($registro["APELLIDOS"]));
            $array[$i]["USUARIO"] = utf8_decode(($registro["USUARIO"]));
            $array[$i]["CLAVE"] = $registro["CLAVE"];
            $array[$i]["ID_PERFIL"] = $registro["ID_PERFIL"];
            $array[$i]["SUCURSAL"] = utf8_decode(($registro["SUCURSAL"]));
            $array[$i]["ES_DENTISTA"] = $registro["ES_DENTISTA"];
            $array[$i]["ESTADO"] = $registro["ESTADO"];
            $array[$i]["RFC"] = utf8_decode(($registro["RFC"]));
            $array[$i]["NUM_CEL"] = $registro["NUM_CEL"];
            $array[$i]["NUM_TEL"] = $registro["NUM_TEL"];
            $array[$i]["ID_PERMISOS"] = $registro["ID_PERMISOS"];
            $i++;
        }

        $conn->close();
        return json_encode($array);
    }

    public function consultaUsuario(){
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from usuarios where USUARIO = '".$_POST['usuario']."'";
        
        $array = array();
        $i=0;
         
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_USUARIO"] = $registro["ID_USUARIO"];
            $array[$i]["NOMBRE"] = utf8_decode(($registro["NOMBRE"]));
            $array[$i]["ID_TIPODEUSUARIO"] = $registro["ID_TIPODEUSUARIO"];
            $array[$i]["APELLIDOS"] = utf8_decode(($registro["APELLIDOS"]));
            $array[$i]["USUARIO"] = utf8_decode(($registro["USUARIO"]));
            $array[$i]["CLAVE"] = $registro["CLAVE"];
            $array[$i]["ID_PERFIL"] = $registro["ID_PERFIL"];
            $array[$i]["SUCURSAL"] = utf8_decode(($registro["SUCURSAL"]));
            $array[$i]["ES_DENTISTA"] = $registro["ES_DENTISTA"];
            $array[$i]["ESTADO"] = $registro["ESTADO"];
            $array[$i]["RFC"] = utf8_decode(($registro["RFC"]));
            $array[$i]["NUM_CEL"] = $registro["NUM_CEL"];
            $array[$i]["NUM_TEL"] = $registro["NUM_TEL"];
            $array[$i]["ID_PERMISOS"] = $registro["ID_PERMISOS"];
            $i++;
        }

        $conn->close();
        return json_encode($array);
    }

    public function consulta_tipo_usuario(){
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from catalogo_tipodeusuario");
        
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_TIPODEUSUARIO"] = $registro["ID_TIPODEUSUARIO"];
            $array[$i]["DESCRIPCION"] = utf8_decode(($registro["DESCRIPCION"]));
            $array[$i]["ADMIN_O_CLINICO"] = utf8_decode(($registro["ADMIN_O_CLINICO"]));
            $i++;
        }

        $conn->close();
        return json_encode($array);

    }

    public function consulta_catalogo_sucursales(){
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from catalogo_sucursales");
        
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_SUCURSAL"] = $registro["ID_SUCURSAL"];
            $array[$i]["DESCRIPCION"] = utf8_decode(($registro["DESCRIPCION"]));
            $i++;
        }

        $conn->close();
        return json_encode($array);

    }
    //consulta de los perfiles
    public function consulta_catalogo_perfiles(){
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from catalogo_perfiles");
        
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_PERFIL"] = $registro["ID_PERFIL"];
            $array[$i]["DESCRIPCION"] = utf8_decode(($registro["DESCRIPCION"]));
            $i++;
        }

        $conn->close();
        return json_encode($array);
        
    }

    public function eliminarUsuario(){
        $sql = "delete * from usuarios where usuario = '".$_POST['usuario']."'";
        //  $sql2 = "insert into agenda values (1241,10,11,'Jafet','Juan Pérez',12,2,23,3,2018-1-1);";

        try{
            if(mysqli_query($conn,$sql))
            echo "bien";
        else
            echo mysqli_error($conn);

        }catch(PDOException $e){
            echo $e->getMessage();
        }

        $conn->close();
        
        return json_encode(null);
    }

    public function modificarUsuario(){
        if (isset($_POST['esdentista']) && $_POST['esdentista'] == '1')
            $ES_DENTISTA = true;
        else
            $ES_DENTISTA = false;

        if (isset($_POST['estado']) && $_POST['estado'] == '1')
            $ES_DENTISTA = true;
        else
            $ES_DENTISTA = false;        

        $conn = $GLOBALS['conn'];

        $sql = "update USUARIO set ID_TIPODEUSUARIO = ".$_POST['sel1'].", NOMBRE = '".$_POST['name']."', APELLIDOS = '".$_POST['apellidos']."', CLAVE = '".$_POST['clave']."', ID_PERFIL = ".$_POST['perfil'].", SUCURSAL = ".$_POST['sucursal'].", ES_DENTISTA = ".$ES_DENTISTA.", ESTADO = ".$ESTADO.", RFC = '".$_POST['rfc']."', NUM_CEL = ".$_POST['cel'].", NUM_TEL = ".$_POST['phone'].", ID_PERMISOS = ".$_POST['permisos']." where USUARIO = '".$_POST['usuario2']."'";

        try{
            if(mysqli_query($conn,$sql))
            echo "bien";
        else
            echo mysqli_error($conn);

        }catch(PDOException $e){
            echo $e->getMessage();
        }

        $conn->close();
        
        return json_encode(null);
    }

    public function insert(){

        //Si el checkbox condiciones tiene valor y es igual a 1
        if (isset($_POST['esdentista']) && $_POST['esdentista'] == '1')
            $ES_DENTISTA = true;
        else
            $ES_DENTISTA = false;

        if (isset($_POST['estado']) && $_POST['estado'] == '1')
            $ES_DENTISTA = true;
        else
            $ES_DENTISTA = false;        

        $conn = $GLOBALS['conn'];

        $sql = "insert into USUARIO(ID_USUARIO, ID_TIPODEUSUARIO, NOMBRE, APELLIDOS, USUARIO, CLAVE, ID_PERFIL, SUCURSAL, ES_DENTISTA, ESTADO, RFC, NUM_CEL, NUM_TEL, ID_PERMISOS) VALUES (".$_POST['sel1'].",'".$_POST['name']."','".$_POST['apellidos']."','".$_POST['usuario']."','".$_POST['clave']."',".$_POST['perfil'].",".$_POST['sucursal'].",".$ES_DENTISTA.",".$ESTADO.",'".$_POST['rfc']."',".$_POST['cel'].",".$_POST['phone'].",".$_POST['permisos'].")";
        //  $sql2 = "insert into agenda values (1241,10,11,'Jafet','Juan Pérez',12,2,23,3,2018-1-1);";

        try{
            if(mysqli_query($conn,$sql))
            echo "bien";
        else
            echo mysqli_error($conn);

        }catch(PDOException $e){
            echo $e->getMessage();
        }

        $conn->close();
        
        return json_encode(null);
    }
}

?>
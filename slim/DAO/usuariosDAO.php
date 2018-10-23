<?php

class Usuarios {


    public function search() {
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from usuario");

        $array = array();
        $i=0;

        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_USUARIO"] = $registro["ID_USUARIO"];
            $array[$i]["NOMBRE"] = utf8_decode(($registro["NOMBRE"]));
            $array[$i]["ID_TIPODEUSUARIO"] = $registro["ID_TIPODEUSUARIO"];
            $array[$i]["APELLIDOS"] = utf8_decode(($registro["APELLIDOS"]));
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
        $res = $conn -> query("select * from usuario where ID_USUARIO = ".$_POST['usuario']."");

        $array = array();
        $i=0;

        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_USUARIO"] = $registro["ID_USUARIO"];
            $array[$i]["NOMBRE"] = utf8_decode(($registro["NOMBRE"]));
            $array[$i]["ID_TIPODEUSUARIO"] = $registro["ID_TIPODEUSUARIO"];
            $array[$i]["APELLIDOS"] = utf8_decode(($registro["APELLIDOS"]));
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

    public function consultaUsuarioByID($ID_USUARIO) {
      $conn = $GLOBALS['conn'];
      $consulta="SELECT * FROM usuario WHERE ID_USUARIO = ?";
      $sentencia = $conn->stmt_init();
      $arrayRes=array();
      $status=array();
      if(!$sentencia->prepare($consulta))
      {
          print "Falló la preparación de la sentencia\n";
          return $conn->error;
      }
      else
      {
          $sentencia->bind_param("i", $ID_USUARIO);
          if (!$sentencia->execute()) {
            $status["status"]="error";
            $status["errorNum"]=$sentencia->errno;
            $status["error"]=$conn->error;
            return json_encode($status);
          }else{
            $resultado = $sentencia->get_result();
            while ($fila = $resultado->fetch_array(MYSQLI_NUM))
            {
              $fila["ID_USUARIO"]=$fila[3];
              $arrayRes[]=$fila;
            }
            $status["data"]=$arrayRes;
            $status["status"]="ok";
            $status["error"]=false;
            return $status;
          }
      }

      //$sentencia->close();
      $conn->close();

      return json_encode(null);
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
    
    //consulta de los permisos
    public function consultaPermisosP(){
        $conn = $GLOBALS['conn'];
        $res = $conn -> query("select * from catalogo_perfil_permisos");

        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["ID_PERFILPERMISOS"] = $registro["ID_PERFILPERMISOS"];
            $array[$i]["DESCRIPCION"] = utf8_decode(($registro["DESCRIPCION"]));
            $array[$i]["PERFIL"] = utf8_decode(($registro["PERFIL"]));
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
        if ($_POST['esdentista'] == true)
            $ES_DENTISTA = "true";
        else
            $ES_DENTISTA = "false";

        if ($_POST['estado'] == true)
            $ESTADO = "true";
        else
            $ESTADO = "false";

        $conn = $GLOBALS['conn'];
        
        $sql = "update usuario set ID_TIPODEUSUARIO = ".$_POST['sel1'].", NOMBRE = '".$_POST['name']."', APELLIDOS = '".$_POST['apellidos']."', CLAVE = '".$_POST['clave']."', ID_PERFIL = ".$_POST['perfil'].", SUCURSAL = ".$_POST['sucursal'].", ES_DENTISTA = ".$ES_DENTISTA.", ESTADO = ".$ESTADO.", RFC = '".$_POST['rfc']."', NUM_CEL = ".$_POST['cel'].", NUM_TEL = ".$_POST['phone'].", ID_PERMISOS = ".$_POST['permisos']." where ID_USUARIO = ".$_POST['usuario2'].";";
        
        echo $sql;

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
        if (isset($_POST['esdentista']) && $_POST['esdentista'] == true)
            $ES_DENTISTA = true;
        else
            $ES_DENTISTA = false;

        if (isset($_POST['estado']) && $_POST['estado'] == true)
            $ESTADO = true;
        else
            $ESTADO = false;

        $conn = $GLOBALS['conn'];
        

        $sql = "INSERT INTO `usuario`(`ID_USUARIO`, `ID_TIPODEUSUARIO`, `NOMBRE`, `APELLIDOS`, `CLAVE`, `ID_PERFIL`, `SUCURSAL`, `ES_DENTISTA`, `ESTADO`, `RFC`, `NUM_CEL`, `NUM_TEL`, `ID_PERMISOS`) VALUES (".$_POST['usuario'].",".$_POST['sel1'].",'".$_POST['name']."','".$_POST['apellidos']."','".$_POST['clave']."',".$_POST['perfil'].",".$_POST['sucursal'].",".$ES_DENTISTA.",".$ESTADO.",'".$_POST['rfc']."',".$_POST['cel'].",".$_POST['phone'].",".$_POST['permisos'].")";
        //  $sql2 = "insert into agenda values (1241,10,11,'Jafet','Juan Pérez',12,2,23,3,2018-1-1);";
        
        echo $sql;

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

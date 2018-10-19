<?php

class Horarios {


    public function search($ID_USUARIO) {
      $conn = $GLOBALS['conn'];
      $consulta="SELECT * FROM catalogo_horario_dentista WHERE ID_USUARIO = ?";
      $sentencia = $conn->stmt_init();
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
    //HORA_INICIO HORA_TERMINO SILLONES_SIMULATANEOS DESCANSO INICIO_DESCANSO TERMINO_DESCANSO BOX_ATENCION NO_ATIENDE ID_USUARIO DIA
    public function insert($HORA_INICIO, $HORA_TERMINO, $SILLONES_SIMULATANEOS, $DESCANSO, $INICIO_DESCANSO, $TERMINO_DESCANSO, $BOX_ATENCION, $NO_ATIENDE, $ID_USUARIO, $DIA){
        $conn = $GLOBALS['conn'];
        $consulta="INSERT INTO catalogo_horario_dentista(HORA_INICIO, HORA_TERMINO,  SILLONES_SIMULTANEOS , DESCANSO, INICIO_DESCANSO, TERMINO_DESCANSO, BOX_ATENCION, NO_ATIENDE, ID_USUARIO, DIA) VALUES (?,?,?,?,?,?,?,?,?,?)";
        $sentencia = $conn->stmt_init();
        $status=array();
        if(!$sentencia->prepare($consulta))
        {
            print "Falló la preparación de la sentencia\n";
            return $conn->error;
        }
        else
        {
            $sentencia->bind_param("iiiiiisiis", $HORA_INICIO, $HORA_TERMINO,
            $SILLONES_SIMULATANEOS, $DESCANSO, $INICIO_DESCANSO, $TERMINO_DESCANSO,
            $BOX_ATENCION, $NO_ATIENDE, $ID_USUARIO, $DIA);
            if (!$sentencia->execute()) {
                $status["status"]="error";
                $status["errorNum"]=$sentencia->errno;
                $status["error"]=$conn->error;
                $status["dia"]=$DIA;
                return $status;
            }else{
                $status["status"]="ok";
                $status["error"]=false;
                return $status;
            }
        }

        //$sentencia->close();
        $conn->close();

        return json_encode(null);
    }


    public function getAll(){
        $conn = $GLOBALS['conn'];
        $consulta="SELECT h.ID_USUARIO, u.NOMBRE, u.APELLIDOS, u.ESTADO FROM catalogo_horario_dentista h INNER JOIN usuario u ON h.ID_USUARIO=u.ID_USUARIO GROUP BY h.ID_USUARIO ";
        $sentencia = $conn->stmt_init();
        $status=array();
        if(!$sentencia->prepare($consulta))
        {
            print "Falló la preparación de la sentencia\n";
            return $conn->error;
        }
        else
        {
            if (!$sentencia->execute()) {
                $status["status"]="error";
                $status["errorNum"]=$sentencia->errno;
                $status["error"]=$conn->error;
                return json_encode($status);
            }else{
              $resultado = $sentencia->get_result();
              while ($fila = $resultado->fetch_array(MYSQLI_NUM))
              {
                  $tmp["ID"]=$fila[0];
                  $tmp["nombre"]=$fila[1];
                  $tmp["apellidos"]=$fila[2];
                  $tmp["estado"]=$fila[3];
                  $dia=$this->search(  $tmp["ID"]);
                  foreach ($dia["data"] as $key => $value) {
                    $dias[]=$value[9];
                  }
                  $tmp["dias"]=$dias;
                  $dias=null;
                  $arrayRes[]=$tmp;

              }
                $status["status"]="ok";
                $status["error"]=false;
                $status["result"]=$arrayRes;
                return json_encode($status);
            }
        }

        //$sentencia->close();
        $conn->close();

        return json_encode(null);
    }


    public function delete($ID_USUARIO){

        $conn = $GLOBALS['conn'];
        $consulta="DELETE FROM catalogo_horario_dentista WHERE ID_USUARIO = ?";
        $sentencia = $conn->stmt_init();
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
                $status["status"]="ok";
                $status["error"]=false;
                $status["eliminado"]=$ID_USUARIO;
                return json_encode($status);
            }
        }

        //$sentencia->close();
        $conn->close();

        return json_encode(null);
    }

    public function habilitar($ID_USUARIO,$ESTADO){
        $ESTADO=(filter_var($ESTADO, FILTER_VALIDATE_BOOLEAN))? 1:0;
        $conn = $GLOBALS['conn'];
        $consulta="UPDATE usuario set ESTADO= ? WHERE ID_USUARIO = ? ";
        $sentencia = $conn->stmt_init();
        $status=array();
        if(!$sentencia->prepare($consulta))
        {
            print "Falló la preparación de la sentencia\n";
            return $conn->error;
        }
        else
        {
            $sentencia->bind_param("ii", $ESTADO,$ID_USUARIO);
            if (!$sentencia->execute()) {
                $status["status"]="error";
                $status["errorNum"]=$sentencia->errno;
                $status["error"]=$conn->error;
                return json_encode($status);
            }else{
                $status["status"]="ok";
                $status["error"]=false;
                $status["actualizado"]=$ID_USUARIO;
                $status["estado"]=$ESTADO;
                return json_encode($status);
            }
        }

        //$sentencia->close();
        $conn->close();

        return json_encode(null);
    }
}

?>

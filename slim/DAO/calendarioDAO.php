<?php
class Calendario {

  public function getAll($ID_USUARIO){

    $conn = $GLOBALS['conn'];
    $consulta="SELECT a.ID_USUARIO,HORA_INICIO,HORA_FIN,a.ID_PACIENTE,ID_USUARIO_DOCTOR,ID_ESTADO_CITA,ID_ESPECIALIDAD,a.ID_MOTIVO_ATENCION,FECHA,NOMBRE,APELLIDOS,DESCRIPCION, ID_AGENDA FROM agenda a INNER JOIN catalogo_motivo_atencion  c ON c.ID_MOTIVO_ATENCION=a.ID_MOTIVO_ATENCION INNER JOIN tabla_pacientes t on t.ID_PACIENTE=a.ID_PACIENTE WHERE ID_USUARIO_DOCTOR = ? ";//1 si es dentista
    $sentencia = $conn->stmt_init();
    $status=array();
    $arrayRes=array();
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
        $status["status"]="ok";
        $status["error"]=false;
        $status["calendario"]=$arrayRes;
        return json_encode($status);
      }
    }

    //$sentencia->close();
    $conn->close();

    return json_encode(null);
  }

  public function updateCalendario($ID_AGENDA,$ID_ESTADO_CITA){

    $conn = $GLOBALS['conn'];
    $consulta="UPDATE agenda SET  ID_ESTADO_CITA=? WHERE ID_AGENDA=? ";//1 si es dentista
    $sentencia = $conn->stmt_init();
    $status=array();
    $arrayRes=array();
    if(!$sentencia->prepare($consulta))
    {
      print "Falló la preparación de la sentencia\n";
      return $conn->error;
    }
    else
    {
      $sentencia->bind_param("ii",$ID_ESTADO_CITA, $ID_AGENDA);
      if (!$sentencia->execute()) {
        $status["status"]="error";
        $status["errorNum"]=$sentencia->errno;
        $status["error"]=$conn->error;
        return json_encode($status);
      }else{
        $resultado = $sentencia->get_result();
        /*while ($fila = $resultado->fetch_array(MYSQLI_NUM))
          {
            $arrayRes[]=$fila;
          }*/
        $status["status"]="ok";
        $status["error"]=false;
        $status["resultado"]=$resultado;
        return json_encode($status);
      }
    }

    //$sentencia->close();
    $conn->close();

    return json_encode(null);
  }
}

?>


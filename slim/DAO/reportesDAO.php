<?php

class Reporte {

    public function pacientesAtendidos() {

        $conn = $GLOBALS['conn'];

        $res = $conn -> query("select ID_AGENDA,FECHA,p.NOMBRE as NOMBRE,p.APELLIDOS as APELLIDOS,e.ID_ESTADO_CITA as ID_ESTADO from 
                                agenda a inner join tabla_pacientes p on a.ID_PACIENTE = p.ID_PACIENTE 
                                inner join catalogo_estado_de_cita e on a.ID_ESTADO_CITA = e.ID_ESTADO_CITA 
                                inner join usuario u on u.ID_USUARIO = a.ID_USUARIO_DOCTOR
                                WHERE 
                                ID_USUARIO_DOCTOR = ".$_GET['dentista'].";");
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["FECHA"] = utf8_decode($registro["FECHA"]);
            $array[$i]["NOMBRE"] = utf8_decode($registro["NOMBRE"]);
            $array[$i]["APELLIDOS"] = utf8_decode($registro["APELLIDOS"]);
            $array[$i]["ID_ESTADO"] = utf8_decode($registro["ID_ESTADO"]);


            $i++;
        }

        return json_encode($array);

    }


    //SELECT a.FECHA AS fecha, a.HORA_INICIO AS hora,tp.NOMBRE AS nombre_paciente ,tp.APELLIDOS AS apellidos_paciente, ce.DESCRIPCION AS especialidad,ma.DESCRIPCION AS motivo_de_atencion ,ec.DESCRIPCION AS estado_de_cita FROM agenda a INNER JOIN tabla_pacientes tp ON a.ID_PACIENTE =tp.ID_PACIENTE INNER JOIN catalogo_especialidades ce ON a.ID_ESPECIALIDAD=ce.ID_ESPECIALIDAD INNER JOIN catalogo_motivo_atencion ma ON a.ID_MOTIVO_ATENCION =ma.ID_MOTIVO_ATENCION INNER JOIN catalogo_estado_de_cita ec ON a.ID_ESTADO_CITA=ec.ID_ESTADO_CITA WHERE ID_USUARIO_DOCTOR=?


//SELECT a.FECHA AS fecha, a.HORA_INICIO AS hora,tp.NOMBRE AS nombre_paciente ,tp.APELLIDOS AS apellidos_paciente, a.comentarios AS comentarios,ma.DESCRIPCION AS motivo_de_atencion ,ec.DESCRIPCION AS estado_de_cita FROM agenda a INNER JOIN tabla_pacientes tp ON a.ID_PACIENTE =tp.ID_PACIENTE INNER JOIN catalogo_especialidades ce ON a.ID_ESPECIALIDAD=ce.ID_ESPECIALIDAD INNER JOIN catalogo_motivo_atencion ma ON a.ID_MOTIVO_ATENCION =ma.ID_MOTIVO_ATENCION INNER JOIN catalogo_estado_de_cita ec ON a.ID_ESTADO_CITA=ec.ID_ESTADO_CITA WHERE ID_USUARIO_DOCTOR=?

    
    public function getReporteAgenda($id_doctor)
    {
      $conn = $GLOBALS['conn'];
      $consulta="SELECT a.FECHA AS fecha, a.HORA_INICIO AS hora,tp.NOMBRE AS nombre_paciente ,tp.APELLIDOS AS apellidos_paciente, ce.DESCRIPCION AS especialidad,ma.DESCRIPCION AS motivo_de_atencion ,ec.DESCRIPCION AS estado_de_cita FROM agenda a INNER JOIN tabla_pacientes tp ON a.ID_PACIENTE =tp.ID_PACIENTE INNER JOIN catalogo_especialidades ce ON a.ID_ESPECIALIDAD=ce.ID_ESPECIALIDAD INNER JOIN catalogo_motivo_atencion ma ON a.ID_MOTIVO_ATENCION =ma.ID_MOTIVO_ATENCION INNER JOIN catalogo_estado_de_cita ec ON a.ID_ESTADO_CITA=ec.ID_ESTADO_CITA WHERE ID_USUARIO_DOCTOR=? ";
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

          $sentencia->bind_param("i", $id_doctor);
          if (!$sentencia->execute()) {
              $status["status"]="error";
              $status["errorNum"]=$sentencia->errno;
              $status["error"]=$conn->error;
              return json_encode($status);
          }else{

            $resultado = $sentencia->get_result();
            while ($fila = $resultado->fetch_array(MYSQLI_NUM))
            {
                $tmp["fecha"]=$fila[0];
                $tmp["hora"]=$fila[1].":00";
                $tmp["nombre_paciente"]=$fila[2];
                $tmp["apellidos_paciente"]=$fila[3];
                $tmp["especialidad"]=$fila[4];
                $tmp["motivo_de_atencion"]=$fila[5];
                $tmp["estado_de_cita"]=$fila[6];
                
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

    public function getReporteCitas($id_doctor)
    {
      $conn = $GLOBALS['conn'];
      $consulta="SELECT a.FECHA AS fecha, a.HORA_INICIO AS hora,tp.NOMBRE AS nombre_paciente ,tp.APELLIDOS AS apellidos_paciente,a.COMENTARIOS AS comentarios,ma.DESCRIPCION AS motivo_de_atencion ,ec.DESCRIPCION AS estado_de_cita FROM agenda a INNER JOIN tabla_pacientes tp ON a.ID_PACIENTE =tp.ID_PACIENTE INNER JOIN catalogo_motivo_atencion ma ON a.ID_MOTIVO_ATENCION =ma.ID_MOTIVO_ATENCION INNER JOIN catalogo_estado_de_cita ec ON a.ID_ESTADO_CITA=ec.ID_ESTADO_CITA WHERE ID_USUARIO_DOCTOR=? ";
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

          $sentencia->bind_param("i", $id_doctor);
          if (!$sentencia->execute()) {
              $status["status"]="error";
              $status["errorNum"]=$sentencia->errno;
              $status["error"]=$conn->error;
              return json_encode($status);
          }else{

            $resultado = $sentencia->get_result();
            while ($fila = $resultado->fetch_array(MYSQLI_NUM))
            {
                $tmp["fecha"]=$fila[0];
                $tmp["hora"]=$fila[1].":00";
                $tmp["nombre_paciente"]=$fila[2];
                $tmp["apellidos_paciente"]=$fila[3];
                $tmp["comentarios"]=$fila[4];
                $tmp["motivo_de_atencion"]=$fila[5];
                $tmp["estado_de_cita"]=$fila[6];
                
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

    public function getReporteCitascanceladas($id_doctor)
    {
      $conn = $GLOBALS['conn'];
      $consulta="SELECT a.FECHA AS fecha,tp.NOMBRE AS nombre_paciente ,tp.APELLIDOS AS apellidos_paciente,ma.DESCRIPCION AS motivo_de_atencion ,ec.DESCRIPCION AS estado_de_cita FROM agenda a INNER JOIN tabla_pacientes tp ON a.ID_PACIENTE =tp.ID_PACIENTE INNER JOIN catalogo_especialidades ce ON a.ID_ESPECIALIDAD=ce.ID_ESPECIALIDAD INNER JOIN catalogo_motivo_atencion ma ON a.ID_MOTIVO_ATENCION =ma.ID_MOTIVO_ATENCION INNER JOIN catalogo_estado_de_cita ec ON a.ID_ESTADO_CITA=ec.ID_ESTADO_CITA WHERE ID_USUARIO_DOCTOR=? ORDER BY a.FECHA";
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

          $sentencia->bind_param("i", $id_doctor);
          if (!$sentencia->execute()) {
              $status["status"]="error";
              $status["errorNum"]=$sentencia->errno;
              $status["error"]=$conn->error;
              return json_encode($status);
          }else{

            $resultado = $sentencia->get_result();
            while ($fila = $resultado->fetch_array(MYSQLI_NUM))
            {
                $tmp["fecha"]=$fila[0];
                $tmp["nombre_paciente"]=$fila[1];
                $tmp["apellidos_paciente"]=$fila[2];
                $tmp["motivo_de_atencion"]=$fila[3];
                $tmp["estado_de_cita"]=$fila[4];
                
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
}

?>
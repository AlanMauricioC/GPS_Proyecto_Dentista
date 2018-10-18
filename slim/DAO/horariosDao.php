<?php

class Horarios {


    public function search() {

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
                return json_encode($status);
            }
        }

        //$sentencia->close();
        $conn->close();

        return json_encode(null);
    }
}

?>

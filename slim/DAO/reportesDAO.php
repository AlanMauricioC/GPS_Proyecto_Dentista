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

    public function citasEstadosTipo() {

        $conn = $GLOBALS['conn'];

        $res = $conn -> query("select ID_AGENDA,FECHA,p.NOMBRE as NOMBRE,p.APELLIDOS as APELLIDOS, e.DESCRIPCION as ESTADO, m.DESCRIPCION as MOTIVO from 
                                agenda a inner join tabla_pacientes p on a.ID_PACIENTE = p.ID_PACIENTE 
                                inner join catalogo_estado_de_cita e on a.ID_ESTADO_CITA = e.ID_ESTADO_CITA 
                                inner join catalogo_motivo_atencion m on a.ID_MOTIVO_ATENCION = m.ID_MOTIVO_ATENCION
                                inner join usuario u on u.ID_USUARIO = a.ID_USUARIO_DOCTOR
                                WHERE 
                                ID_USUARIO_DOCTOR = ".$_GET['dentista'].";");
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["FECHA"] = utf8_decode($registro["FECHA"]);
            $array[$i]["NOMBRE"] = utf8_decode($registro["NOMBRE"]);
            $array[$i]["APELLIDOS"] = utf8_decode($registro["APELLIDOS"]);
            $array[$i]["ESTADO"] = utf8_decode($registro["ESTADO"]);
            $array[$i]["MOTIVO"] = utf8_decode($registro["MOTIVO"]);


            $i++;
        }

        return json_encode($array);

    }

    public function citasPorFecha() {

        $conn = $GLOBALS['conn'];

        $res = $conn -> query("select ID_AGENDA,FECHA,p.NOMBRE as NOMBRE,p.APELLIDOS as APELLIDOS, e.DESCRIPCION as ESTADO, m.DESCRIPCION as MOTIVO from 
                                agenda a inner join tabla_pacientes p on a.ID_PACIENTE = p.ID_PACIENTE 
                                inner join catalogo_estado_de_cita e on a.ID_ESTADO_CITA = e.ID_ESTADO_CITA 
                                inner join catalogo_motivo_atencion m on a.ID_MOTIVO_ATENCION = m.ID_MOTIVO_ATENCION
                                inner join usuario u on u.ID_USUARIO = a.ID_USUARIO_DOCTOR
                                WHERE 
                                ID_USUARIO_DOCTOR = ".$_GET['dentista']." ORDER BY FECHA DESC;");
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["FECHA"] = utf8_decode($registro["FECHA"]);
            $array[$i]["NOMBRE"] = utf8_decode($registro["NOMBRE"]);
            $array[$i]["APELLIDOS"] = utf8_decode($registro["APELLIDOS"]);
            $array[$i]["ESTADO"] = utf8_decode($registro["ESTADO"]);
            $array[$i]["MOTIVO"] = utf8_decode($registro["MOTIVO"]);


            $i++;
        }

        return json_encode($array);

    }

    public function citasPorEstado() {

        $conn = $GLOBALS['conn'];

        $res = $conn -> query("select ID_AGENDA,FECHA,p.NOMBRE as NOMBRE,p.APELLIDOS as APELLIDOS, e.DESCRIPCION as ESTADO, m.DESCRIPCION as MOTIVO from 
                                agenda a inner join tabla_pacientes p on a.ID_PACIENTE = p.ID_PACIENTE 
                                inner join catalogo_estado_de_cita e on a.ID_ESTADO_CITA = e.ID_ESTADO_CITA 
                                inner join catalogo_motivo_atencion m on a.ID_MOTIVO_ATENCION = m.ID_MOTIVO_ATENCION
                                inner join usuario u on u.ID_USUARIO = a.ID_USUARIO_DOCTOR
                                WHERE 
                                ID_USUARIO_DOCTOR = ".$_GET['dentista']." ORDER BY a.ID_ESTADO_CITA;");
        $array = array();
        $i=0;
        while ($registro = $res->fetch_array()) {
            $array[$i]["FECHA"] = utf8_decode($registro["FECHA"]);
            $array[$i]["NOMBRE"] = utf8_decode($registro["NOMBRE"]);
            $array[$i]["APELLIDOS"] = utf8_decode($registro["APELLIDOS"]);
            $array[$i]["ESTADO"] = utf8_decode($registro["ESTADO"]);
            $array[$i]["MOTIVO"] = utf8_decode($registro["MOTIVO"]);


            $i++;
        }

        return json_encode($array);

    }
    



}

?>
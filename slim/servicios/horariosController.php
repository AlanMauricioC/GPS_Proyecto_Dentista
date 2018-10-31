<?php

class horariosController {

    public function getHorarios($request, $response, $args) {
      $post = $request->getParsedBody();
      $horarios=new Horarios();
      return $horarios->getAll();
    }

    public function deleteHorarios($request, $response, $args) {
      $post = $request->getParsedBody();
      $horarios=new Horarios();
      return $horarios->delete($post["ID"]);
    }

    public function deshabilitarDentista($request, $response, $args) {
      $post = $request->getParsedBody();
      $horarios=new Horarios();
      return $horarios->habilitar($post["ID"],$post["estado"]);
    }

    public function insertHorarios($request, $response, $args) {
       //HORA_INICIO HORA_TERMINO SILLONES_SIMULATANEOS DESCANSO INICIO_DESCANSO TERMINO_DESCANSO BOX_ATENCION NO_ATIENDE ID_USUARIO DIA

        $post = $request->getParsedBody();
        $horarios=new Horarios();

        if (filter_var($post["LU"], FILTER_VALIDATE_BOOLEAN)) {
          $res[]= $horarios->insert($post["horaInicio"],$post["horaFin"],$post["sillon"],
          $post["descanso"],$post["descansoInicio"],$post["descansoFin"],
          $post["BOX_ATENCION"],$post["atiende"],$post["IDUsuario"],"LU");
        }
        if (filter_var($post["MA"], FILTER_VALIDATE_BOOLEAN)) {
          $res[]=$horarios->insert($post["horaInicio"],$post["horaFin"],$post["sillon"],
          $post["descanso"],$post["descansoInicio"],$post["descansoFin"],
          $post["BOX_ATENCION"],$post["atiende"],$post["IDUsuario"],"MA");
        }
        if (filter_var($post["MI"], FILTER_VALIDATE_BOOLEAN)) {
          $res[]=$horarios->insert($post["horaInicio"],$post["horaFin"],$post["sillon"],
          $post["descanso"],$post["descansoInicio"],$post["descansoFin"],
          $post["BOX_ATENCION"],$post["atiende"],$post["IDUsuario"],"MI");
        }
        if (filter_var($post["JU"], FILTER_VALIDATE_BOOLEAN)) {
          $res[]=$horarios->insert($post["horaInicio"],$post["horaFin"],$post["sillon"],
          $post["descanso"],$post["descansoInicio"],$post["descansoFin"],
          $post["BOX_ATENCION"],$post["atiende"],$post["IDUsuario"],"JU");
        }
        if (filter_var($post["VI"], FILTER_VALIDATE_BOOLEAN)) {
          $res[]=$horarios->insert($post["horaInicio"],$post["horaFin"],$post["sillon"],
          $post["descanso"],$post["descansoInicio"],$post["descansoFin"],
          $post["BOX_ATENCION"],$post["atiende"],$post["IDUsuario"],"VI");
        }
        if (filter_var($post["SA"], FILTER_VALIDATE_BOOLEAN)) {
          $res[]=$horarios->insert($post["horaInicio"],$post["horaFin"],$post["sillon"],
          $post["descanso"],$post["descansoInicio"],$post["descansoFin"],
          $post["BOX_ATENCION"],$post["atiende"],$post["IDUsuario"],"SA");
        }
        if (filter_var($post["DO"], FILTER_VALIDATE_BOOLEAN)) {
          $res[]=$horarios->insert($post["horaInicio"],$post["horaFin"],$post["sillon"],
          $post["descanso"],$post["descansoInicio"],$post["descansoFin"],
          $post["BOX_ATENCION"],$post["atiende"],$post["IDUsuario"],"DO");
        }
        if (empty($res)) {
         return json_encode("Error, sin dias de la semana");
       }else{

         return json_encode($res);
       }

    }

    public function searchHorarios($request, $response, $args)
    {
      $post = $request->getParsedBody();
      $horarios=new Horarios();
      return $horarios->searchHorarios($post["usuario"]);
    }

    public function getHorariosByID($request, $response, $args)
    {
      $post = $request->getParsedBody();
      $horarios=new Horarios();
      $res=$horarios->search($post["ID_USUARIO"]);
      $usuarios=new Usuarios();
      $usuario=$usuarios->consultaUsuarioByID($post["ID_USUARIO"]);
      $res["Nombre"]=$usuario;
      return json_encode($res);
    }

    public function printHorarios($request, $response, $args)
    {
      $post = $request->getParsedBody();
      $horarios=new Horarios();
      $res=$horarios->search($post["ID_USUARIO"]);
      $usuarios=new Usuarios();
      $usuario=$usuarios->consultaUsuarioByID($post["ID_USUARIO"]);
      $res["Nombre"]=$usuario;
      $print=new ImprimirHorario();
      return $print->generarPDF($res);
    }

    public function updateHorarios($request, $response, $args)
    {
      $post = $request->getParsedBody();
      $horarios=new Horarios();
      return json_encode($horarios->update($post["ID_USUARIO"],$post["HORA_INICIO"],$post["HORA_TERMINO"],$post["INICIO_DESCANSO"],$post["TERMINO_DESCANSO"],$post["BOX_ATENCION"],$post["DESCANSO"],$post["DIA"]));
    }
}

?>

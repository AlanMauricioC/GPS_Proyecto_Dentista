<?php
require 'DAO/horariosDAO.php';
class horariosController {

    public function getHorarios($request, $response, $args) {
      //falta implementar
    }

    public function deleteHorarios($request, $response, $args) {
      $post = $request->getParsedBody();
      $horarios=new Horarios();
      return $horarios->delete();
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
        return json_encode($res);

    }
}

?>

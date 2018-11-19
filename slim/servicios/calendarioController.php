<?php

class calendarioController {

    public function getCalendario($request, $response, $args) {
      $post = $request->getParsedBody();
      $horarios=new Calendario();
      return $horarios->getAll($post["ID"]);
    }

    public function updateCalendario($request, $response, $args) {
      $post = $request->getParsedBody();
      $horarios=new Calendario();
      return $horarios->updateCalendario($post["ID_AGENDA"],$post["ID_ESTADO_CITA"]);
    }
}

?>

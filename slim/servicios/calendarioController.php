<?php

class calendarioController {

    public function getCalendario($request, $response, $args) {
      $post = $request->getParsedBody();
      $horarios=new Calendario();
      return $horarios->getAll($post["ID"]);
    }

}

?>

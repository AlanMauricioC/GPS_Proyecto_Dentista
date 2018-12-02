<?php

class reportesController {

    public function getReporteAgenda($request, $response, $args) {
      $post = $request->getParsedBody();
      $horarios=new Reporte();
      return $horarios->getReporteAgenda($post["ID_USUARIO"]);
    }

    public function getReporteCitas($request, $response, $args) {
      $post = $request->getParsedBody();
      $horarios=new Reporte();
      return $horarios->getReporteCitas($post["ID_USUARIO"]);
    }


    public function getReporteCitascanceladas($request, $response, $args) {
      $post = $request->getParsedBody();
      $horarios=new Reporte();
      return $horarios->getReporteCitascanceladas($post["ID_USUARIO"]);
    }
}

?>

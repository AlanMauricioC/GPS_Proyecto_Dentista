<?php

require 'vendor/autoload.php';
require 'includes/conexion.php';
require 'servicios/servicios.php';

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];

$c = new Slim\Container($configuration);

$app = new Slim\App($c);


$app->get('/', function ($request, $response, $args) {
    $response->write("Hola Mundo");
    return $response;
});

$app->get('/ejemploGet', '\servicios:ejemploGet');

$app->get('/ejemploConsulta', '\servicios:ejemploConsulta');

$app->post("/ejemploPost", '\servicios:ejemploPost');

$app->run();

?>
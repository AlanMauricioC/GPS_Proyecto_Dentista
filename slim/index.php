<?php

require 'vendor/autoload.php';
require 'includes/conexion.php';
require 'servicios/servicios.php';
require 'servicios/userController.php';
require 'servicios/horariosController.php';

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




$app->get('/getUsuarios', '\userController:getUsuarios');

$app->post('/insertUsuarios', '\userController:insertUsuarios');

$app->get('/ejemploConsulta', '\servicios:ejemploConsulta');

$app->post('/consultaPerfiles', '\userController:consultaPerfiles');

$app->post('/consultaSucursales', '\userController:consultaSucursales');

$app->post('/consultaTipoUsuarios', '\userController:consultaTipoUsuarios');

$app->post('/consultaUsuario', '\userController:consultaUsuario');

$app->post('/consultaUsuarios', '\userController:consultaUsuarios');

$app->post('/eliminarUsuarios', '\userController:eliminarUsuarios');

$app->post('/modificarUsuario', '\userController:modificarUsuario');

//Alan<---
$app->post('/insertHorarios', '\horariosController:insertHorarios');




//Jafet <---
$app->get('/consultaAgenda', '\servicios:consultaAgenda');

$app->get('/consultaDentistaAgendar', '\servicios:consultaDentistaAgendar');

$app->get('/consultaHorarioAgendar', '\servicios:consultaHorarioAgendar');

$app->get('/consultaPacienteAgendar', '\servicios:consultaPacienteAgendar');

$app->get('/consultaEspecialidadAgendar', '\servicios:consultaEspecialidadAgendar');

$app->get('/insertAgenda', '\servicios:insertAgenda');
//--  -->
$app->post("/ejemploPost", '\servicios:ejemploPost');

$app->run();

?>

<?php

require 'vendor/autoload.php';
require 'includes/conexion.php';
require 'DAO/citasDAO.php';
require 'DAO/usuariosDAO.php';
require 'DAO/horariosDAO.php';
require 'servicios/servicios.php';
require 'servicios/userController.php';
require 'servicios/horariosController.php';
require 'servicios/pdf/ImprimirHorario.php';
//

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




$app->get('/getUsuarios', '\servicios:getUsuarios');

$app->post('/insertUsuarios', '\servicios:insertUsuarios');

$app->get('/ejemploConsulta', '\servicios:ejemploConsulta');

$app->get('/consultaPerfiles', '\servicios:consultaPerfiles');

$app->get('/consultaSucursales', '\servicios:consultaSucursales');

$app->get('/consultaTipoUsuarios', '\servicios:consultaTipoUsuarios');

$app->post('/consultaUsuario', '\servicios:consultaUsuario');

$app->post('/consultaUsuarios', '\servicios:consultaUsuarios');

$app->post('/eliminarUsuarios', '\servicios:eliminarUsuarios');

$app->post('/modificarUsuario', '\servicios:modificarUsuario');

$app->get('/consultaPermisos', '\servicios:consultaPermisos');

//Alan<---
$app->post('/insertHorarios', '\horariosController:insertHorarios');

$app->get('/getHorarios', '\horariosController:getHorarios');

$app->post('/getHorarios', '\horariosController:getHorariosByID');

$app->post('/updateHorarios', '\horariosController:updateHorarios');

$app->post('/deleteHorarios', '\horariosController:deleteHorarios');

$app->post('/deshabilitarDentista', '\horariosController:deshabilitarDentista');

$app->post('/searchHorarios', '\horariosController:searchHorarios');

$app->post('/printHorarios', '\horariosController:printHorarios');


//Jafet <---
$app->get('/consultaAgenda', '\servicios:consultaAgenda');

$app->get('/consultaDentistaAgendar', '\servicios:consultaDentistaAgendar');

$app->get('/consultaEstadoAgendar', '\servicios:consultaEstadoAgendar');

$app->get('/consultaHorarioAgendar', '\servicios:consultaHorarioAgendar');

$app->get('/consultaPacienteAgendar', '\servicios:consultaPacienteAgendar');

$app->get('/consultaEspecialidadAgendar', '\servicios:consultaEspecialidadAgendar');

$app->get('/consultaMotivoAtencionAgendar', '\servicios:consultaMotivoAtencionAgendar');

$app->get('/insertAgenda', '\servicios:insertAgenda');

$app->get('/updateAgenda', '\servicios:updateAgenda');

$app->get('/deleteAgenda', '\servicios:deleteAgenda');


//--  -->
$app->post("/ejemploPost", '\servicios:ejemploPost');

$app->run();

?>

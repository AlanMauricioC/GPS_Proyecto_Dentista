$(document).ready(function(){

  init();

})


function init(){
  calendario();
  $.ajax({
    url: 'http://localhost/slim/index.php/consultaDentistaAgendar',
    type : 'GET',
    data: null,
    dataType : 'json',
    success: function(response) {
      
      for (var i = 0; i < response.length; i++) {

        $("#usuario").append("<option value="+response[i].ID_USUARIO+"> "+response[i].NOMBRE+" "+response[i].APELLIDOS+" ID: "+response[i].ID_USUARIO+"</option>");

        
      }
      $("#usuario").change(cargarHorario);

    },
    error: function() {
      console.log("No se ha podido obtener la información de usuarios");
    }
  });
}

var eventos=[];
function cargarHorario() {
    var data={};

    data["ID"]=$(this).val();
    $.ajax({
    url: 'http://localhost/slim/index.php/getCalendario',
    type : 'POST',
    data: data,
    dataType : 'json',
    success: function(response) {
      for (var i = 0; i < response["calendario"].length; i++) {
        eventos.push(getEvent(response["calendario"][i]));
      }
      calendarioObj.modifyAttr('items',eventos);

      calendarioObj.reset();//limpia el div
      calendario();//vuelve a generar el calendario
      eventos=[];
    },
    error: function() {
      console.log("No se ha podido obtener la información de usuarios");
    }
  });
}

function getEvent(info) {
  //console.log(info[11].substring(6))
  console.log(info[8].substring(0,4));
  return {
    color: info[11].substring(6),
    content: info[9]+' ' +info[10],
    endDate: new Date(info[8].substring(0,4), info[8].substring(5,7), info[8].substring(8,10), info[2], 0),
    startDate: new Date(info[8].substring(0,4), info[8].substring(5,7),info[8].substring(8,10),info[3], 0)
  }
}


var calendarioObj;

function calendario() {
  YUI().use(
    'aui-scheduler',
    function(Y) {

      //console.log(events);

      var agendaView = new Y.SchedulerAgendaView();
      var dayView = new Y.SchedulerDayView();
    //       var myEventRecorder = Y.Component.create({
    //     EXTENDS: Y.SchedulerEventRecorder,

    //     NAME: 'scheduler-event-recorder',
    //     strings:{
    //             'delete': 'elimina',
    //             'description-hint': 'Nombre del paciente',
    //             cancel: 'Cancela',
    //             description: 'Descripción',
    //             edit: 'Edita',
    //             save: 'Guarda',
    //             when: 'Cuando'
    //           },

    //     prototype: {
    //         _getFooterToolbar: function() {
    //             var instance = this,
    //             event = instance.get('event'),
    //             strings = instance.get('strings'),
    //             children = [
    //                 {
    //                     label: strings['cancel'],
    //                     on: {
    //                         click: Y.bind(instance._handleCancelEvent, instance)
    //                     }
    //                 }
    //             ];

    //             var requestId = event && event.get('requestId');

    //             if (requestId) {
    //                 children.push({
    //                     label: strings['open_request'],
    //                     on: {
    //                         click: Y.bind(instance._handleOpenRequest, instance)
    //                     }
    //                 });
    //             }

    //             return [children];
    //         },

    //         _handleOpenRequest : function() {
    //             //console.log(arguments);
    //         }
    //     }
    // });

          var eventRecorder = new Y.SchedulerEventRecorder(
            {
              strings:{
                'delete': 'elimina',
                'description-hint': 'Nombre del paciente',
                cancel: 'Cancela',
                description: 'Descripción',
                edit: 'Edita',
                save: 'Guarda',
                when: 'Cuando'
              },
              on: {
                save: function(event) {
                    //alert('Save Event:' + this.isNew() + ' --- ' + this.getContentNode().val());
                },
                edit: function(event) {
                    //alert('Edit Event:' + this.isNew() + ' --- ' + this.getContentNode().val());
                },
                delete: function(event) {
                    //alert('Delete Event:' + this.isNew() + ' --- ' + this.getContentNode().val());
                },
                
'widget:contentUpdate': function(event) {
                    alert('Delete Event:' );
                }
              } 
            }
          );

       //var eventRecorder = new myEventRecorder();
      var monthView = new Y.SchedulerMonthView();
      var weekView = new Y.SchedulerWeekView();


      calendarioObj=new Y.Scheduler(
        {
          boundingBox: '#myScheduler',
          date: new Date(),
          eventRecorder: eventRecorder,
          items: eventos,
          render: true,
          views: [monthView,weekView,dayView ],
          strings:{
            agenda: 'Agenda',
            day: 'Dia',
            month: 'Mes',
            table: 'Tabla',
            today: 'Hoy',
            week: 'Semana',
            year: 'Año'
          }
        }
      );
    }
  );
}

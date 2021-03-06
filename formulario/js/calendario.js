$(document).ready(function(){

  init();

  $("#btn_guardar_cambios").click(guardar_cambios);

  $("#btn_borrar_comentario").click(borrar_comentario);

  $("#btn_modificar_comentario").click(modificar_comentario);

  $("#btn_insertar_comentario").click(modificar_comentario);



$("#print").click(function(argument) {


  
    var vistaActiva = calendarioObj.get('activeView')+'jeje';
    if(vistaActiva.indexOf('week')!= -1){
      
          var primer_dia = calendarioObj.get('viewDate').toISOString().slice(0,10);
          
          date = new Date();   
          var lastday = calendarioObj.get('viewDate').getDate() - (calendarioObj.get('viewDate').getDay() - 1) + 5;
          var ultimo_dia = new Date(date.setDate(lastday));
          var ultimo_dia_ymd = ultimo_dia.toISOString().slice(0,10);
          

          $.ajax({
                url: "../../slim/index.php/imprimirAgendaSemanal",
                type: "GET",
                async: true,
                data: "primer_dia="+primer_dia+"&&ultimo_dia="+ultimo_dia_ymd+"&&dentista="+$("#usuario").val() ,
                dataType: "json",
                success: function(response){
                  alert("PDF generado correctamente");
                  window.open('../../slim/'+response, '_blank');
                },
                error: function(error){
                    alert("no hay citas registradas en esta fecha");
                }
            });


    }

    if(vistaActiva.indexOf('month')!= -1){
      
          var mes = calendarioObj.get('viewDate').toISOString().slice(0,7);
         
          $.ajax({
                url: "../../slim/index.php/imprimirAgendaMensual",
                type: "GET",
                async: true,
                data: "mes="+mes+"&&dentista="+$("#usuario").val(),
                dataType: "json",
                success: function(response){
                  alert("PDF generado correctamente");
                  window.open('../../slim/'+response, '_blank');
                },
                error: function(error){
                    alert("no hay citas registradas en esta fecha");
                }
            });
            


    }

    if(vistaActiva.indexOf('day')!= -1){
      
          var dia = calendarioObj.get('viewDate').toISOString().slice(0,10);
         
          $.ajax({
                url: "../../slim/index.php/imprimirAgendaDiaria",
                type: "GET",
                async: true,
                data: "dia="+dia+"&&dentista="+$("#usuario").val(),
                dataType: "json",
                success: function(response){
                  alert("PDF generado correctamente");
                  window.open('../../slim/'+response, '_blank');
                },
                error: function(error){
                    alert("no hay citas registradas en esta fecha");
                }
            });
            


    }

      
  });


})

var cal;//en donde se guardan los eventos para su posterior cambio con el botón guardar
var cambios=[];
function init(){
  calendario();
  $.ajax({
    url: 'https://www.kimberly-clark-logistica.com/slim/index.php/consultaDentistaAgendar',
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
    var cambios=[];
    data["ID"]=$("#usuario").val();
    $.ajax({
    url: 'https://www.kimberly-clark-logistica.com/slim/index.php/getCalendario',
    type : 'POST',
    data: data,
    dataType : 'json',
    success: function(response) {
      $("#notificaciones").empty();
      $("#comentarios").empty();
      for (var i = 0; i < response["calendario"].length; i++) {
        eventos.push(getEvent(response["calendario"][i]));
        
      }
      cal=response["calendario"];
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
  var inicio=new Date(info[8].substring(0,4), parseInt(info[8].substring(5,7)-1),info[8].substring(8,10),info[3], 0);
  if (inicio>new Date()) {
    $("#notificaciones").append('<div style="border: 2px; bacgroud-color:cyan;">'+'cita con: '+info[9]+' ' +info[10]+' el '+inicio.getDate()+' de'+(inicio.getMonth()+1)+' del '+inicio.getFullYear()+'<br>a la(s) '+inicio.getHours()+'</div>')
  }
  return {
    color: info[11].substring(6),
    content: info[12]+"|"+info[9]+' ' +info[10],
    endDate: new Date(info[8].substring(0,4), parseInt(info[8].substring(5,7))-1, info[8].substring(8,10), info[2], 0),
    startDate: inicio
  }
}


function guardar_cambios() {
  var tmp;
  for(val in cambios){
    var data={
      'ID_AGENDA':val,
      'ID_ESTADO_CITA':cambios[val]
    };
    $.when(
      $.ajax({
        url: 'https://www.kimberly-clark-logistica.com/slim/index.php/udateCalendario',
        type : 'POST',
        data: data,
        dataType : 'json',
        success: function(response) {
          tmp=true;
        },
        error: function() {
          tmp=false;
          console.log("No se ha podido obtener la información de usuarios");
        }
      })
    ).then(function (argument) {
      if (tmp) {
        console.log("Cambios guardados correctamente");
        cargarHorario();
      }
    })
    
  }
  alert("cambios guardados correctamente");
}


var calendarioObj;

function calendario() {
  YUI().use(
    'aui-scheduler',
    function(Y) {

      //console.log(events);
      var es_ES_strings_allDay = { allDay: 'todo el dia' };
      var agendaView = new Y.SchedulerAgendaView({
                isoTime: true,
                strings: es_ES_strings_allDay
            });
      var dayView = new Y.SchedulerDayView({
                isoTime: true,
                strings: es_ES_strings_allDay
            });
      var myEventRecorder = Y.Component.create({

        ATTRS: {

          /**
           * Collection of strings used to label elements of the UI.
           * This attribute defaults to `{}` unless the attribute is set.
           * When this attribute is set, the passed value merges with a
           * pseudo-default collection of strings.
           *
           * @attribute strings
           * @default {}
           * @type {Object}
           */
          strings: {
              value: {},
              setter: function(val) {
                  return Y.merge({
                          'delete': 'Delete',
                          'description-hint': 'Ninguna cita para mostrar',
                          cancel: 'Cancel',
                          description: 'Description',
                          edit: 'Edit',
                          save: 'Save',
                          when: 'When'
                      },
                      val || {}
                  );
              },
          },
        },
        EXTENDS: Y.SchedulerEventRecorder,

        NAME: 'scheduler-event-recorder',
        

        prototype: {

            _getFooterToolbar: function() {
                var instance = this,
                event = instance.get('event'),
                strings = {
                  'delete': 'elimina',
                  'description-hint': 'Nombre del paciente',
                  cancel: 'cerrar',
                  description: 'Descripción',
                  edit: 'Edita',
                  save: 'cambiar estado',
                  comment: 'comentario', //------------------------ 
                  when: 'Cuando'
                },
                children = [];

              if (event) {
                  children.push(
                  {
                      label: strings.save,
                      on: {
                          click: Y.bind(instance._handleSaveEvent, instance)
                      }
                  },
                  {//--------------------------------------------------
                      label: strings.comment,
                      on: {
                          click: Y.bind(instance._handleCommentEvent, instance)
                      }
                  },//--------------------------------------------
                  {
                    label: strings.cancel,
                    on: {
                        click: Y.bind(instance._handleCancelEvent, instance)
                    }
                  });
              }

              return [children];
            },
            /**
             * Handles `save` events.
             *
             * @method _handleSaveEvent
             * @param {EventFacade} event
             * @protected
             */
            _handleSaveEvent: function(event) {
                var instance = this,
                    eventName = instance.get('event') ? 'edit' : 'save';
                
                var id=this.getContentNode().val().substr(0, this.getContentNode().val().indexOf('|'));
                for (var i = 0; i < cal.length; i++) {
                  if (cal[i][12]==id) {
                    var val=(cal[i][5]==1)?2:1;
                  }
                }
                cambios[id]=val;
                console.log(cambios);
                alert("Cambio de estado a "+((val==1)?'cancelada':'no cancelada'));
                instance.fire('cancel');
                if (event.domEvent) {
                    event.domEvent.preventDefault();
                }

                event.preventDefault();
            },
            _handleCommentEvent: function(event) {
                    var id=this.getContentNode().val().substr(0, this.getContentNode().val().indexOf('|'));
                    comentario(id);
                    this.fire('cancel');
            },
        },
    });

      var eventRecorder = new myEventRecorder();
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
          locale:"es-MX",
          strings:{
            agenda: 'Agenda',
            day: 'Dia',
            'description-hint': 'Nombre del paciente',
            month: 'Mes',
            table: 'Tabla',
            today: 'Hoy',
            week: 'Semana',
            year: 'Año'
          }
        }
      );
      console.log(monthView.set('locale',"es-MX"));
    }
  );
}

function borrar_comentario() {
   $.ajax({
                  url: "../../slim/index.php/deleteComentario",
                  type: "GET",
                  async: true,
                  data: "id_agenda="+$("#id_txt_comentario").val() ,
                  dataType: "json",
                  success: function(response){
                    $("#comentarios").text('');
                  },
                  error: function(error){
                  }
              });
}

function modificar_comentario() {
   $.ajax({
                  url: "../../slim/index.php/insertComentario",
                  type: "GET",
                  async: true,
                  data: "id_agenda="+$("#id_txt_comentario").val()+"&&comentario="+$("#comentarios").val() ,
                  dataType: "json",
                  success: function(response){

                  },
                  error: function(error){
                  }
              });
}

function comentario(id){  
  $.ajax({
                  url: "../../slim/index.php/selectComentario",
                  type: "GET",
                  async: true,
                  data: "id_agenda="+id ,
                  dataType: "json",
                  success: function(response){
                    $("#comentarios").val(response[0].COMENTARIO);
                    $("#id_txt_comentario").val(id);
                    if(response[0].COMENTARIO.length<1){
                      $("#btn_guardar_comentario").attr('data-target','#modal_insertar_comentario');
                    }else{
                      $("#btn_guardar_comentario").attr('data-target','#modal_modificar_confirmar');
                    }
                  },
                  error: function(error){
                  }
              });
}
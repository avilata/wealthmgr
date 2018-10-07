Ext.define('wealthmgr.model.Cursoformacion', {
	extend: 'Ext.data.Model',
	fields: [  // los campos se deben llamar igual que en la BD y si no hay que emplear 'mapping'
	         { name: 'id',  mapping:'ID',  type: 'int' ,persist:false},
	         { name: 'anyoPlanFormacion',  type: 'string' },
	         { name: 'nombre', mapping:'Nombre', type:'string'},
	         { name: 'contenidoCurso', mapping:'ContenidoCurso',type:'string'},
	         { name: 'dirigidoA', mapping:'DirigidoA', type: 'string'},
	         { name: 'evaluacionGeneral', mapping:'EvaluacionGeneral',type:'string'},
	         { name:'fechaInicio', mapping:'FechaInicio',type:'date', dateFormat:'Y-m-d H:i:s'}, 
	         { name:'fechaFin',mapping:'FechaFin',type:'date', dateFormat:'Y-m-d H:i:s'},
	         { name:'fechaMaxSuscripcion', mapping:'FechaMaxSuscripcion',type:'date', dateFormat:'Y-m-d'}, // JVILATA - dateformat sin hora ni timezone,
	         { name:'idCompetencia', type:'int'},
	         { name:'idEmpresaColaboradora', type:'int'},
	         { name:'profesorResponsable', mapping:'ProfesorResponsable',type:'string'}
	         ],
	proxy: {
		type: 'rest',
		url: 'php/cursosformacion/bd_cursos.php/findCursoFormacionFilter/',
		writer:{type:'mappedjson', nameProperty:'mapping'}, // para que no intente escribir los datos mapping
		listeners : {
					exception : function(proxy, response, operation) {
							Ext.Msg.alert('Atención',response.responseText);
							Ext.ComponentMgr.get('app-main').destroy();
							Ext.widget('login');
					}
				}
	}

});
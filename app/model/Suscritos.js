Ext.define('wealthmgr.model.Suscritos', {
	extend: 'Ext.data.Model',
	fields: [
	         { name: 'id',  type: 'int' ,persist:false},
	         { name: 'idCurso',  type: 'int'},
	         { name: 'idwealthmgr',  type: 'int'},
	         { name: 'nombre', type:'string',persist:false},
	         { name: 'fechaSuscripcion',  type: 'date', dateFormat:'Y-m-d H:i:s'},
	         { name: 'observacionesSuscriptor', type:'string'},
	         { name: 'observacionesDocente', type:'string'},
	         { name: 'aprovechamiento', type: 'bool'},
	         { name: 'realizado', type:'bool'}

	         ],
	proxy: {
		type: 'rest',
		url: 'php/cursosformacion/bd_suscritos.php/findSuscritosFilter/',
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
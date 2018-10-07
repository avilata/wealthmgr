Ext.define('wealthmgr.model.Attach', {
	extend: 'Ext.data.Model',
	proxy: {
		type: 'rest',
		url: 'php/attach/bd_attach.php/findAttachFilter/',
		writer:{type:'mappedjson', nameProperty:'mapping'}, // para que no intente escribir los datos mapping
		listeners : {
					exception : function(proxy, response, operation) {
							Ext.Msg.alert('Atención',response.responseText);
							Ext.ComponentMgr.get('app-main').destroy();
							Ext.widget('login');
					}
				}	},
	fields: [
	         { name: 'id', type: 'int',persist:false  },
	         { name: 'code', mapping:'idObjeto', type: 'int' },
	         { name: 'type', mapping:'tipoObjeto', type: 'string' },
	         { name: 'subject', mapping:'asunto', type: 'string' },
	         { name: 'attach', mapping:'nombreObjeto', type: 'string' },
	         { name: 'attachtype',mapping:'tipoAdjunto',  type: 'string' },
	         { name: 'date', mapping:'fecha', type: 'date', dateFormat: 'Y-m-d H:i:s' },
	         { name: 'user', type: 'string'   },
	         { name: 'ts', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	         ]
});

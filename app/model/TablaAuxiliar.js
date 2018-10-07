Ext.define('wealthmgr.model.TablaAuxiliar', {
	extend: 'Ext.data.Model',
	fields: [

	         { name: 'id',  type: 'int',persist:false },
	         { name: 'codTabla',type: 'int' },
	         { name: 'codElemento',type: 'string' },
	         { name: 'valor1', type: 'string' }
	         ],
	proxy: {
		type: 'rest',
		url: 'php/tablaAuxiliar/bd_tablaAuxiliar.php/findTablaAuxFilter/',
		listeners : {
					exception : function(proxy, response, operation) {
							Ext.Msg.alert('Atención',response.responseText);
							Ext.ComponentMgr.get('app-main').destroy();
							Ext.widget('login');
					}
				}
	}

});

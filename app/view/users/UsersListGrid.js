Ext.define('wealthmgr.view.users.UsersListGrid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.UsersListGrid',
	viewConfig: {
		loadMask: true
	},
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			store: me.buildStore()
		});
		me.callParent(arguments);
	},

	buildStore: function() {
		return Ext.create('wealthmgr.store.Users');
	},
	border: false,
	multiSelect: false,
	plugins:[
	           {
	               clicksToMoveEditor: 1,
	               autoCancel: false,
	               ptype: 'cellediting',
	               pluginId: 'cellediting',
	               saveBtnText : "Guardar"
	   				
	           }
	       ],  
   selModel: {
        selType: 'cellmodel'
    },	   
	columns: [{
					header: 'Id',
					dataIndex: 'id',
					width: 75
				},{
					header: 'Email',
					dataIndex: 'email',
					width: 300,
					editor:'textfield'
				},{
					header: 'User  Name',
					dataIndex: 'username',
					width: 220,
					editor:'textfield'
				},{
					header: 'User Rol',
					dataIndex: 'userRol',
					width: 150,
					editor:{
		    			xtype: 'combobox',
		    			store: new Ext.data.Store({
						    model: 'wealthmgr.model.TablaAuxiliar',
							proxy:{type:'rest',
								   url: 'php/tablaAuxiliar/bd_tablaAuxiliar.php/findTablaAuxFilter/',
							       extraParams:{codTabla:1}// roles de usuario
								  }
							}),
		    			displayField:'valor1',
		    			valueField: 'codElemento'
		    		}
				}
	]
});
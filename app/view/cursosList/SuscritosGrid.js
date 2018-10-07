Ext.define('wealthmgr.view.cursosList.SuscritosGrid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.SuscritosGrid',
//	layout: 'fit',
	viewConfig: {
		loadMask: true
	},
	multiSelect: false,
  
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			store: me.buildStore()
		});
		me.callParent(arguments);
	},

	buildStore: function(){
		return Ext.create('wealthmgr.store.Suscritos');
	},
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
					header: 'Alumno',
					dataIndex: 'nombre',
					width: 200
				},
				{
					header: 'Suscrito dia',
					dataIndex: 'fechaSuscripcion',
					renderer: Ext.util.Format.dateRenderer('d/m/Y'),
					width: 100
				},
				{
					xtype: 'checkcolumn',
					header: 'Aprovechamiento',
					dataIndex: 'aprovechamiento',
					editor:'checkbox',
					width: 100
				},
				{
					xtype: 'checkcolumn',
					header: 'Realizado',
					dataIndex: 'realizado',
					editor:'checkbox',
					width: 100
				} ,{
					header: 'Observaciones Suscriptor',
					dataIndex: 'observacionesSuscriptor',
					editor:{
						xtype:'textareafield',
						height:200
					},
					width: 200
				},{
					header: 'Observaciones Docente',
					dataIndex: 'observacionesDocente',
					editor:{
						xtype:'textareafield',
						height:200
					},
					width: 200
				}
	]
});
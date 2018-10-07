Ext.define("wealthmgr.view.mainMenu.MainMenu",  {
	extend: 'Ext.panel.Panel',
	alias: 'widget.MainMenu',
	controller: 'mainMenu',
	border: false,
	bodyBorder: false,
	items: [{ 
		tbar: {
			items: [{
				text: 'Plan de Formación',
				icons: 'icon-user',
				menu: {
					items: [{
						name: 'formPlanFormacion',
						text: 'Plan de Formación'
		//				iconCls: 'icon-user'
					},
					'-',
					{
						name: 'formOtros',
						text: 'Otros'
					}
					] // items-menu
				} // menu
			},
			{	text:'Administración',
				name:'menuAdministracion',
				iconCls: 'icon-user',
				menu: {
					items: [{
						name: 'formUsuarios',
						text: 'Usuarios'
						},{
						name: 'formTablaAuxiliar',
						text: 'Tabla Auxiliar'
						}
					] // items-menu
				} // menu			
			},
			{text:'Desconectar',
			 name:'desconectar'
			}
			] // items -tbar
		} /// tbar
	}] //Items
}); 
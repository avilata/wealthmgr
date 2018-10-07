Ext.define('wealthmgr.view.tablaAuxiliar.TablaAuxListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.TablaAuxListController',

    init: function() {
    	this.control({ // aqui definimos los objetos y eventos que vamos a controlar
        		
            	'TablaAuxListWest button[action=buscar]': {
            			click: this.cargarRegistros // llama a este metodo definido mas abajo
            	},
             	'TablaAuxListWest textfield': { // en cualquier campo de este formulario si pulsas intro busca
            			keypress: this.onKeyPress
            	},
            	'TablaAuxListCenter button[action=nuevo]': {
            			click: this.doNew
            	},
            	'TablaAuxListCenter button[action=delete]': {
            			click: this.doDelete
            	},
            	'TablaAuxListCenter button[action=refresh]': {
            			click: this.cargarRegistros
            	},
             	'TablaAuxListCenter button[action=cancel]': {
            			click: this.doCancel
            	},
            	'TablaAuxNew button[action=submit]': {
            			click: this.doRegistrarTablaAux
            	},
				'TablaAuxNew button[action=cancel]': {
					click: this.formNewTablaAuxCancel
				}
     	})
    },
	
	
	
	/**
	 * 
	 */
	onKeyPress: function(component, event) {
		if (event.getKey() === Ext.EventObject.ENTER) {
			if (component.up('TablaAuxListWest')!=null) this.cargarRegistros(component);
		}
	},
	/**
   	 * 
   	 */
   	doCancel: function(component) {
		Ext.ComponentMgr.get('mainTabs').remove(component.up('TablaAuxList')); // elimina el tab de cursos panel tab
   	},
    
   /*
    * 
    */
     cargarRegistros: function(component) {
    	if (component==null) return;
		this.doLoad(component.up('TablaAuxList')); // el padre de TablaAuxListtWest es TablaAuxListt
	},
	
	/*
	 * 
	 */
	doLoad: function(panel) { // se supone que panel siempre va a ser TablaAuxListt
		var form = panel.down('TablaAuxListWest'),
			maxrec = form.down('FilterMaxRec');
	
		if (maxrec.getValue() === null || maxrec.getValue() === 0) maxrec.setValue(1000); // carga maxima de registros por defecto 1000
		
		var grid = panel.down('TablaAuxListGrid'),
			record = form.getForm().getValues(), // en record tendremos los campos del formulario filtro y sus valores
			params = wealthmgr.app.getController('generalController').params(record), // copia record a params
			ctrl = this;
		


		params.sort = Ext.encode(grid.getStore().sorters.items);
		
		grid.getSelectionModel().deselectAll();
		grid.getStore().load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					panel.setTitle('Registros [' + records.length + '] ' );
					panel.tab.setIcon(''); // resetea icono por si esta el de grabar todavía
				}
			}
		});
	},
	
	
 
	/*
	 * 
	 */
	doNew: function(component) {
		var panel = component.up('TablaAuxList'),
			main = wealthmgr.app.getController('generalController');
		
    	main.goDialog('TablaAuxNew', { 
    		ctrl: this,
    		bttn: component.up('TablaAuxList').down('button[action=refresh]')
    	});
				
	},
	
	/*
	 * 
	 */
	doDelete: function(component) { // component será el panel TablaAuxListtCenter
		var grid = component.up('TablaAuxList').down('TablaAuxListGrid');
        var sm = grid.getSelectionModel();
  		
		for (var i = 0; i < sm.getSelected().length; i++) { // por si seleccionamos más de 1 
			var id = sm.getSelected().getAt(i).get('id');
			
			if (id !== null) {
			       Ext.Msg.confirm("ATENCIÓN","Desea borrar registro  de "+sm.getSelected().getAt(i).get('codElemento')+"?", 
				        function(e){
						  if(e == 'yes'){
							grid.getStore().remove(sm.getSelection());
							grid.getStore().sync();// si al store se le pone autosync nos evitamos esto
							if (grid.getStore().getCount() > 0) {sm.select(0); }
						  }
						}
					)
			}
		}
	},
	
	/*
	*
	*/
	doRegistrarTablaAux: function(component) {
	  var panel = component.up('TablaAuxNew'),
		form = panel.getForm(),
		main = wealthmgr.app.getController('generalController'),
		ctrl=this,
		thisApp=wealthmgr.app; // asi quedan registrados los datos del login en datosLogin
 
		form.submit({
			url: 'php/tablaAuxiliar/bd_tablaAuxiliar.php/guardarBD/',
			//params:{action:'registrar'},
			success: function(c,obj) {

				panel.ctrl.doLoad(panel.ctrl.getView()); // TablaAuxListt
				// Remove New Window
				ctrl.getView().up('window').close();
			},
			failure: function(c,obj) {
				Ext.Msg.alert('Atencion', obj.result.failure);
			}
		});
		
	},
	
	/**
	 *
	 */
	formNewTablaAuxCancel: function(button) {
		button.up('window').close();
	}
	
	
 
});

Ext.define('wealthmgr.view.users.UsersListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.UsersListController',

    init: function() {
    	this.control({ // aqui definimos los objetos y eventos que vamos a controlar
        		
            	'UsersListWest button[action=buscar]': {
            			click: this.cargarRegistros // llama a este metodo definido mas abajo
            	},
             	'UsersListWest textfield': { // en cualquier campo de este formulario si pulsas intro busca
            			keypress: this.onKeyPress
            	},
            	'UsersListCenter button[action=nuevo]': {
            			click: this.doNew
            	},
            	'UsersListCenter button[action=delete]': {
            			click: this.doDelete
            	},
            	'UsersListCenter button[action=refresh]': {
            			click: this.cargarRegistros
            	},
				'UsersListCenter button[action=cambiarpwd]': {
            			click: this.cambiarPwd
            	},
             	'UsersListCenter button[action=cancel]': {
            			click: this.doCancel
            	},
            	'UsersNew button[action=submit]': {
            			click: this.doRegistrarUsuario
            	},
				'UsersNew button[action=cancel]': {
					click: this.formNewUserCancel
				}
     	})
    },
	
	
	
	/**
	 * 
	 */
	onKeyPress: function(component, event) {
		if (event.getKey() === Ext.EventObject.ENTER) {
			if (component.up('UsersListWest')!=null) this.cargarRegistros(component);
		}
	},
	/**
   	 * 
   	 */
   	doCancel: function(component) {
		Ext.ComponentMgr.get('mainTabs').remove(component.up('UsersList')); // elimina el tab de cursos panel tab
   	},
    
   /*
    * 
    */
     cargarRegistros: function(component) {
    	if (component==null) return;
		this.doLoad(component.up('UsersList')); // el padre de UsersListWest es UsersList
	},
	
	/*
	 * 
	 */
	doLoad: function(panel) { // se supone que panel siempre va a ser UsersList
		var form = panel.down('UsersListWest'),
			maxrec = form.down('FilterMaxRec');
	
		if (maxrec.getValue() === null || maxrec.getValue() === 0) maxrec.setValue(1000); // carga maxima de registros por defecto 1000
		
		var grid = panel.down('UsersListGrid'),
			record = form.getForm().getValues(), // en record tendremos los campos del formulario filtro y sus valores
			params = wealthmgr.app.getController('generalController').params(record), // copia record a params
			ctrl = this;
		


		params.sort = Ext.encode(grid.getStore().sorters.items);
		
		grid.getSelectionModel().deselectAll();
		grid.getStore().load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					panel.setTitle('Usuarios [' + records.length + '] ' );
					panel.tab.setIcon(''); // resetea icono por si esta el de grabar todavía
				}
			}
		});
	},
	
	
 
	/*
	 * 
	 */
	doNew: function(component) {
		var panel = component.up('UsersList'),
			main = wealthmgr.app.getController('generalController');
		
    	main.goDialog('UsersNew', { 
    		username: 'nuevo',
    		email: 'nuevo@nuevo.com',
    		ctrl: this,
    		bttn: component.up('UsersList').down('button[action=refresh]')
    	});
				
	},
	
	/*
	 * 
	 */
	doDelete: function(component) { // component será el panel UsersListCenter
		var grid = component.up('UsersList').down('UsersListGrid');
        var sm = grid.getSelectionModel();
  		
		for (var i = 0; i < sm.getSelected().length; i++) { // por si seleccionamos más de 1 
			var id = sm.getSelected().getAt(i).get('id');
			
			if (id !== null) {
			       Ext.Msg.confirm("ATENCIÓN","Desea borrar registro curso de "+sm.getSelected().getAt(i).get('nombre')+"?", 
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
	doRegistrarUsuario: function(component) {
	  var panel = component.up('UsersNew'),
		form = panel.getForm(),
		main = wealthmgr.app.getController('generalController'),
		ctrl=this,
		thisApp=wealthmgr.app; // asi quedan registrados los datos del login en datosLogin
 
		form.submit({
			url: 'php/users/users.php/',
			params:{action:'registrar'},
			success: function(c,obj) {

				panel.ctrl.doLoad(panel.ctrl.getView()); // UsersList
				// Remove New Window
				ctrl.getView().up('window').close();
				//ctrl.formNewUserCancel(panel.bttn);
			},
			failure: function(c,obj) {
				Ext.Msg.alert('Atencion', obj.result.failure);
			}
		});
		
	},
	
	/*
	*
	*/
	cambiarPwd: function(component) {
		var grid = component.up('UsersList').down('UsersListGrid');
        var sm = grid.getSelectionModel();
 		var email = sm.getSelected().getAt(0).get('email');
	  
	  // Prompt for user data and process the result using a callback:
		Ext.Msg.prompt('Atención', 'Introduzcca nueva password:', function(btn, text){
			if (btn == 'ok'){
			    vuser={};
				vuser.password = text;
				vuser.email = email;
				vuser.action='reset';
				 Ext.Ajax.request({
					url: 'php/users/users.php/',
					params: vuser,
					success: function(response, opts) {
						var result = Ext.decode(response.responseText);
						if(result.success === 'ok') {
							//     Ext.Msg.alert('Aviso','Mail enviado '+result.resultado);
						} else {
							 Ext.Msg.alert('Aviso','No se ha enviado mail: '+result.success);
			
						}    
					   },
					failure: function(response, opts){
						 Ext.Msg.alert('Aviso','No se ha enviado mail: '+response.responseText);
					}
				});
			}
		});
	  
	},
	
	/**
	 *
	 */
	formNewUserCancel: function(button) {
		button.up('window').close();
	}
	
	
 
});

Ext.define('wealthmgr.view.mainMenu.MainMenuController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.mainMenu',

    init: function() {
    	this.control({ // aqui definimos los objetos y eventos que vamos a controlar
        		
            	'menuitem[name=formPlanFormacion]': {
            			click: this.abrirPlanFormacion // llama a este metodo definido mas abajo
            	},
            	'menuitem[name=formUsuarios]': {
            			click: this.abrirUsuarios // llama a este metodo definido mas abajo
            	},
				'menuitem[name=formTablaAuxiliar]': {
            			click: this.abrirTablaAuxiliar // llama a este metodo definido mas abajo
            	},
              	'[name=desconectar]': {
            			click: this.doDesconectar 
            	}
   	})
    },
	
    listen: {
	    controller: {
	    	'*':{
				cargarPermisos:function () {
					 this.doCargarPermisos();
				}
				}
			} 	
 	},  

 	/**
	 * 
	 */
	doCargarPermisos: function() {
		var main=wealthmgr.app.getController('generalController'),
			app=wealthmgr.app,
			form=this.getView();
	    
		if   (app.datosLogin.userRol!='1') { // si no es superuser (0 normal, 1 superuser
		   form.down('[name=menuAdministracion]').setDisabled(true) // incluso mejor hidden()
		} else form.down('[name=menuAdministracion]').setDisabled(false)
		
	},
			 
	/*
	*
	*/
	doDesconectar: function() {
     // Remove the localStorage key/value,
        localStorage.removeItem('UserLoggedIn');

        // Remove Main View
        this.getView().up('app-main').destroy();

        // Add the Login Window
        Ext.widget('login');

    },

	/*
    * 
    */
   abrirPlanFormacion: function() {
		var main = wealthmgr.app.getController('generalController'); 
	    	

		main.goTab('CursosList','CursosList');

	},
	/*
    * 
    */
   abrirUsuarios: function() {
		var main = wealthmgr.app.getController('generalController'); 
	    	

		main.goTab('UsersList','UsersList');

	},
	/*
    * 
    */
   abrirTablaAuxiliar: function() {
		var main = wealthmgr.app.getController('generalController'); 
	    	

		main.goTab('TablaAuxList','TablaAuxList');

	}
	

 
    
});

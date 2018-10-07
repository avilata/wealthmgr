Ext.define('wealthmgr.controller.generalController', {
    extend: 'Ext.app.Controller',
	alias:'controller.generalController',
	// se ejecuta al cargar este controlador, es decir al principio de la aplicacion
	onLaunch: function() {
    	
		// aquí cargaremos el usuario si está integrado con el Apache o tendremos que pedir login
    },

   /*
     * duplica un objeto
    */
    params: function(obj) {
    	var param = new Object();
    	if (obj == null) return param;
    	for (var key in obj)
    		if (obj[key] !== null)
        		if (obj[key] !== '')
        			param[key] = obj[key];
    	return param;
    },
    
     /**
     * muestro texto en la barra de estado
     */
    status: function(success, title, msg) {
    	var text = '';
    	if (success) {
    		if (typeof title !== 'undefined' && title !== null && title !== '') text += title;
			Ext.ComponentMgr.get('mainStatus').setStatus({
				text: 'Ready - ' + text,
				iconCls: 'icon-status-ok',
				clear: true
			});
    	} else {
    		if (typeof title !== 'undefined' && title !== null && title !== '') text += title;
    		if (typeof msg !== 'undefined' && msg !== null && msg !== '') text += ' - ' + msg;
			Ext.ComponentMgr.get('mainStatus').setStatus({
				text: 'Fail - ' + text,
				iconCls: 'icon-status-error',
				clear: true
			});
			Ext.MessageBox.show({
				title: 'Error en Operación',
				msg: 'Ocurrió un error en la operación:<br><br><b>' + text + '</b>',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
    	}
    },
	
	/*
	* goTab. Abre un formulario en el taba principal
	*/
	 goTab: function(xtype, token, load) {
		var tabs = Ext.ComponentMgr.get('mainTabs'); // Busca el componente con id mainTabs
		tab = null;
		// Buscamos si existe el tab y lo activamos
		if (typeof token !== 'undefined' && token !== null) {
			for (var i = 0; i < tabs.items.items.length; i++) {
				var t = tabs.items.items[i];
				if (t !== null)
					if (t.token === token) {
						tab = t;
						break;
					}
			}
		}
		
		// Si no existe el tab lo creamos
		if (tab === null && xtype !== null && xtype !== '') {
			// Si no tiene token generamos uno aleatorio
			if (typeof token === 'undefined' || token === null)
				token = 'tab' + Math.floor(Math.random() * 999999999);
			
			// Creamos un tab y le asignamos el token
			tab = Ext.widget(xtype, { deferredRender: true}); // busca un formulario con ese xtype y lo carga en la variable tab
			tab.token = token;
			tabs.add(tab); // Añadimos el new tab al tabPanel
			// Lanzamos el método load del controller del formulario que acabamos de cargar
			if (load) this.fireEvent(xtype ,tab); // lanza un evento con el mismo nombre que el formulario. Se supone que allí llamaremos a doLoad, sabiendo que en tab.token tenemos datos
		}
		
		tabs.setActiveTab(tab);
		
		return tab;
	},
	
	    /**
     * 
     */
    goDialog: function(xtype, config) {
        var panel = Ext.widget(xtype, {
                padding: 5,
                preventHeader: true
            }),
            win = Ext.widget('window', {
                title: panel.title,
                iconCls: panel.iconCls,
                modal: true,
                resizable: true,
                layout: 'fit',
                bodyBorder: false,
                height: (typeof panel.height === 'undefined' ? '80%' : panel.height),
                width: (typeof panel.width === 'undefined' ? '80%' : panel.width),
                items: panel
            });
        
        if (config !== null) Ext.apply(panel, config);
        win.show();
    },

    /*
     * Abrir Ventana con parametros Post
     */
    newPostWindow: function(url,nom_p1,val_p1,nom_p2,val_p2,nomListado,fieldSizes) {
		var form = document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("action", url);
		
		form.setAttribute("target", "view");
		
		var hiddenField = document.createElement("input"); 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", nom_p1);
		hiddenField.setAttribute("value", val_p1);
		form.appendChild(hiddenField);
		var hiddenField = document.createElement("input"); 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", nom_p2);
		hiddenField.setAttribute("value", val_p2);
		form.appendChild(hiddenField);

		var hiddenField = document.createElement("input"); 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "nompdf");
		hiddenField.setAttribute("value", nomListado);
		form.appendChild(hiddenField);
		var hiddenField = document.createElement("input"); 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "fieldSizes");
		hiddenField.setAttribute("value", fieldSizes);
		form.appendChild(hiddenField);


		document.body.appendChild(form);
		
		window.open('', 'view');
		
		form.submit();
    },
	
	/**
     * 
     */
    goUrl: function(url) {
        window.open(url, '_blank');
        window.focus();
    },
	
    /**
	 *  enviarmail
	 **/
	enviarMail: function(pfrom, pto, pasunto, ptexto,phtml,preplyto) {
		var vmail = {"to":"edicom@edicom.es","from":"edicom@edicom.es","subject":"asunto","body":"texto"};
//		pto="jvilata@edicomgroup.com";// eliminar para produccion
		vmail.to = pto;vmail.from = pfrom;vmail.subject=pasunto;vmail.body=ptexto;
		if (preplyto!=null) vmail.replyto=preplyto;
		if (phtml!=null)  vmail.html=phtml;
		vmail.action='send';
		 Ext.Ajax.request({
	        url: 'php/lib/sendmail.php/',
	        params: vmail,
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
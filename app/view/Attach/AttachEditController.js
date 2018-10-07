Ext.define('wealthmgr.view.Attach.AttachEditController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.attachEdit',

	init: function() {
		this.control({
			'AttachEdit [name=id]': {
				render: this.renderId
			},
			'AttachEdit [name=asunto]': {
				render: this.renderAsunto
			},
			'AttachEdit [name=tipoAdjunto]': {
				render: this.renderTipo
			},
			'AttachEdit button[action=submit]': {
				click: this.formSubmit,
				render: this.onLock
			},
			'AttachEdit button[action=cancel]': {
				click: this.formCancel
			}
		});
	},

	/**
	 *
	 */
	formCancel: function(button, record) {
		button.up('window').close();
	},

	/**
	 *
	 */
	formSubmit: function(button, record) {
		var panel = button.up('AttachEdit'),
			model = panel.model,
			form = panel.getForm(),
			main = wealthmgr.app.getController('generalController');

		if (!form.isValid()) return;

		model.set('subject', panel.down('[name=asunto]').getValue());
		model.set('attachtype', panel.down('[name=tipoAdjunto]').getValue());
		model.set('usr','edicom');
		model.set('ts',new Date());

		model.save({
			callback: function(record, operation, success) {
				main.status(success, 'Editar Adjunto', operation.request._proxy.reader.rawData.msg);
				if (!success) return;
				button.up('window').close();
				panel.ctrl.doAttachRefresh(panel.bttn);
			}
		});
	},

	/**
	 *
	 */
	renderId: function(component) {
		var panel = component.up('AttachEdit');
		component.setValue(panel.model.get('id'));
	},

	/**
	 *
	 */
	renderAsunto: function(component) {
		var panel = component.up('AttachEdit');
		component.setValue(panel.model.get('subject'));
	},

	/**
	 *
	 */
	renderTipo: function(component) {
		var panel = component.up('AttachEdit');
		component.setValue(panel.model.get('attachtype'));
	},

	/**
	 *
	 */
	onLock: function(component) {
		var panel = component.up('AttachEdit'),
			main = wealthmgr.app.getController('generalController');
	}

});

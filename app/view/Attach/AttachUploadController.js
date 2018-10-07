Ext.define('wealthmgr.view.Attach.AttachUploadController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.attachUpload',

	init: function() {
		this.control({
			'AttachUpload [name=asunto]': {
				afterrender: function(t) {t.setValue('dummy');}
			},
			'AttachUpload [name=file]': {
				change: this.doChange
			},
			'AttachUpload button[action=submit]': {
				click: this.formSubmit
//				render: this.onLock
			},
			'AttachUpload button[action=cancel]': {
				click: this.formCancel
			}

		});
	},

	/**
	 *
	 */
	doChange: function(component) {
		
		var form = component.up('AttachUpload');
		if (form.down('[name=file]').getValue() === null || form.down('[name=file]').getValue() === '') {
			var asunto = form.down('[name=file]').getValue();
			asunto = asunto.substring(asunto.lastIndexOf('\\') + 1);
			form.down('[name=asunto]').setValue(asunto);
		}
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
		var panel = button.up('AttachUpload'),
			form = panel.getForm(),
			main = wealthmgr.app.getController('generalController');

//		if (!form.isValid()) return;

		form.submit({
			url: 'php/attach/bd_attach.php/addAttachment/',
			params:{code:panel.code,
					type:panel.type},
			success: function() {
				main.status(true, 'FileUpload', null);
				panel.ctrl.doAttachRefresh(panel.bttn);
				button.up('window').close();
			},
			failure: function() {
				main.status(false, 'FileUpload', null);
			}
		});
	}



});

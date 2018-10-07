Ext.define('wealthmgr.widget.BaseDate',{
	extend: 'Ext.form.field.Date',
	alias: 'widget.BaseDate',
	labelAlign: 'right',
	labelWidth: 90,
	startDay: 1,
	format: 'd/m/Y',
	submitFormat: 'Y-m-d H:i:s'
});
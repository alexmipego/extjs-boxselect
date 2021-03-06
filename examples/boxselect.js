/*

This file contains example usages of the Ext.ux.form.field.BoxSelect component, and is based on the
examples of comboboxes provided in Ext JS 4.

*/
Ext.require([
    'Ext.ux.form.field.BoxSelect'
]);

Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();

    /**
     * Configuration options that are used throughout these examples, unless
     * overridden in the specific examples
     */
    var baseExampleConfig = {
        fieldLabel: 'Select multiple states',
        displayField: 'name',
        valueField: 'abbr',
        width: 500,
        labelWidth: 130,
        emptyText: 'Pick a state, any state',
        store: 'States',
        queryMode: 'local'
    };


    /**
     * Basic BoxSelect using the data store, initialized with multiple values
     */
    var basicBoxselect = Ext.create('Ext.ux.form.field.BoxSelect', Ext.applyIf({
        renderTo: 'basicBoxselect',
		value: ['TX', 'CA']
    }, baseExampleConfig));


    /**
     * Basic BoxSelect using the data store, initialized with a single value
     */
    var basicBoxselect2 = Ext.create('Ext.ux.form.field.BoxSelect', Ext.applyIf({
        fieldLabel: 'More States',
        renderTo: 'basicBoxselect',
		value: 'WA'
    }, baseExampleConfig));


    /**
     * Example of more advanced template configurations
     */
    var templateConfigs = Ext.create('Ext.ux.form.field.BoxSelect', Ext.applyIf({
        renderTo: 'templateConfigs',

        delimiter: ', ', // Default, reiterated for showing use in concat'd value
        value: 'AZ, CA, NC',

        // Customized label display for selected values
        labelTpl: '<img src="{flagUrl}" style="height: 25px; vertical-align: middle; margin: 2px;" /> {name} ({abbr})',

        // This tpl config is part of the native ComboBox and is used to control
        // the display of the BoundList (picker), and is only included here for reference
        listConfig: {
            tpl: Ext.create('Ext.XTemplate',
                '<ul><tpl for=".">',
                    '<li role="option" class="' + Ext.baseCSSPrefix + 'boundlist-item' + '"' +
                        ' style="background-image:url({flagUrl}); background-repeat: no-repeat; background-size: 25px; padding-left: 30px;">' +
                        '{name}: {slogan}</li>',
                '</tpl></ul>'
            )
        }
    }, baseExampleConfig));


	/**
     * Example of multiSelect: false
     */
    var singleSelect = Ext.create('Ext.ux.form.field.BoxSelect', Ext.applyIf({
        fieldLabel: 'Select a state',
        renderTo: 'singleSelect',
		multiSelect: false
    }, baseExampleConfig));


    /**
     * Example of:
     * - Using a remote store and automatically querying for unknown values.
     * - Changing the default delimiter 
     * - Initializing with multiple values via concat'd string
     * - Modifying click behavior (triggerOnClick)
     * - Modifying templates used for selected values (labelTpl)
     * - Modifying templates used for dropdown list (part of the default ComboBox behavior, listConfig.tpl)
     */
    var autoQuery = Ext.create('Ext.ux.form.field.BoxSelect', Ext.applyIf({
        fieldLabel: 'With Remote Store',

        // Remote store things
        renderTo: 'autoQuery',
        store: 'RemoteStates',
        pageSize: 25,
        queryMode: 'remote',

        // Value delimiter examples
        delimiter: '|',
		value: 'NC|VA|ZZ',

        // Click behavior
        triggerOnClick: false,

        // Display template modifications
        labelTpl: '{name} ({abbr})',
        listConfig: {
            tpl: Ext.create('Ext.XTemplate',
                '<ul><tpl for=".">',
                    '<li role="option" class="' + Ext.baseCSSPrefix + 'boundlist-item' + '">{name}: {slogan}</li>',
                '</tpl></ul>'
            )
        }
    }, baseExampleConfig));


    /**
     * Example of multi-select email address field using:
     * - forceSelection false to allow new entries to be added
     * - createNewOnEnter/createNewOnBlur to allow for new entries to be
     *   created for different user interactions
     * - filterPickList true to hide existing selections from the dropdown picker
     *
     * Note, does not use the baseExampleConfig from this example page.
     */
    var emails = [
		'test@example.com', 'somebody@somewhere.net', 'johnjacob@jingleheimerschmidts.org',
		'rumpelstiltskin@guessmyname.com', 'fakeaddresses@arefake.com', 'bob@thejoneses.com'
	];
	var emailSuggest = Ext.create('Ext.ux.form.field.BoxSelect', {
		fieldLabel: 'Enter multiple email addresses',
		renderTo: 'emailSuggest',
		width: 500,
        growMin: 75,
        growMax: 120,
		labelWidth: 130,
		store: emails,
		queryMode: 'local',
		forceSelection: false,
		createNewOnEnter: true,
		createNewOnBlur: true,
        filterPickList: true
	});


	/**
     * Example of stacked, pinList, triggerOnClick and other configuration options
     */
    var otherConfigs = Ext.create('Ext.ux.form.field.BoxSelect', {
        fieldLabel: 'Select multiple states',
        renderTo: 'otherConfigs',
        displayField: 'name',
        width: 500,
        labelWidth: 130,
        store: 'States',
        queryMode: 'local',
		valueField: 'abbr',
		value: 'WA, TX',
		stacked: true,
		pinList: false,
        triggerOnClick: false,
        filterPickList: true
    });


    /**
     * Example of value setting, retrieving and value events, and layout managed height
     */
	var valuesSelect;
	var valuesExample = Ext.create('Ext.panel.Panel', {
		width: 500,
		bodyPadding: 5,
		renderTo: 'valueSetting',
		layout: {
			type: 'anchor'
		},
		defaults: {
			anchor: '100%',
			border: false
		},
		items: [{
            xtype: 'container',
            defaultType: 'button',
            items: [{
                text: 'Disable',
                enableToggle: true,
                toggleHandler: function(field, state) {
                    valuesSelect.setDisabled(state);
                }
			},{
				text: 'getValue()',
				handler: function() {
					window.alert(valuesSelect.getValue());
				}
			},{
				text: 'getValueRecords().length',
				handler: function() {
					window.alert('# of records: ' + valuesSelect.getValueRecords().length);
				}
			},{
                text: 'getSubmitData() - (default)',
                handler: function() {
                    valuesSelect.encodeSubmitValue = false;
                    window.alert(Ext.encode(valuesSelect.getSubmitData()));
                }
            },{
                text: 'getSubmitData() - encodeSubmitValue',
                handler: function() {
                    valuesSelect.encodeSubmitValue = true;
                    window.alert(Ext.encode(valuesSelect.getSubmitData()));
                }
            },{
				text: 'setValue("NY, NJ")',
				handler: function() {
					valuesSelect.setValue("NY, NJ");
				}
			},{
				text: 'addValue("CA")',
				handler: function() {
					valuesSelect.addValue("CA");
				}
			},{
				text: 'removeValue("NJ")',
				handler: function() {
					valuesSelect.removeValue("NJ");
				}
			}]
        },{
            xtype: 'container',
            itemId: 'layoutExampleContainer',
            height: 100,
            layout: {
                type: 'fit'
            }
        },{
			xtype: 'component',
			itemId: 'eventMessages',
			autoEl: {
				tag: 'div',
				html: 'Messages:'
			}
		}]
	});
	var messagesBlock = valuesExample.down('#eventMessages');
	var addMessage = function(msg) {
		messagesBlock.update(messagesBlock.el.dom.innerHTML + '<br />' + msg);
	};
    valuesSelect = valuesExample.down('#layoutExampleContainer').add({
        xtype: 'boxselect',
        itemId: 'valuesSelect',
        fieldLabel: 'Select multiple states',
        displayField: 'name',
        hidden: true,
        labelWidth: 130,
        store: 'States',
        queryMode: 'local',
        valueField: 'abbr',
        value: 'WA, TX',
        listeners: {
            'change': function(field, newValue, oldValue) {
                addMessage('[Change event] ' +
                    'New value is "' + newValue + '" ' +
                    '(Old was "' + oldValue + '") ' +
                    field.getValueRecords().length + ' records selected.');
            },
            'select': function(field, records) {
                addMessage('[Select event] ' + records.length + ' records selected.');
            }
        }
	});
	addMessage('[Init] Initialized with string "WA, TX"');
    valuesSelect.show();
	// End example of value setting, retrieving and value events

});
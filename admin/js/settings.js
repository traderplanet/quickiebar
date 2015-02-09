jQuery(document).ready(function($){
		
	function ViewModel() {
		var self = this;
		
		self.syncingDataWithServer = ko.observable(true);
		self.savingSettings = ko.observable(false);
		self.subscribing = ko.observable(false);
		self.deletingPlugin = ko.observable(false);
		
		self.settings = {
			attribution: ko.observable(),
			visibility: ko.observable(),
			email: ko.observable(),
			subscribed: ko.observable(),
			fixed_compatibility: ko.observable(),
			debug_mode: ko.observable()
		}
		self.settings.cache = {
			attribution: ko.observable(),
			visibility: ko.observable(),
			email: ko.observable(),
			fixed_compatibility: ko.observable(),
			debug_mode: ko.observable()
		}
		
		self.settings.cacheCurrentSettings = function(){
			
			self.settings.cache.attribution(self.settings.attribution());
			self.settings.cache.visibility(self.settings.visibility());
			self.settings.cache.email(self.settings.email());
			self.settings.cache.fixed_compatibility(self.settings.fixed_compatibility());
			self.settings.cache.debug_mode(self.settings.debug_mode());
			
		}
		
		self.settings.dirty = ko.computed(function(){
			
			if(self.settings.attribution() != self.settings.cache.attribution() ||
				self.settings.visibility() != self.settings.cache.visibility() ||
				self.settings.email() != self.settings.cache.email() ||
				self.settings.fixed_compatibility() != self.settings.cache.fixed_compatibility() ||
				self.settings.debug_mode() != self.settings.cache.debug_mode()
			){
				return true;
			}
			else{
				return false;
			}
			
		});
		
		self.settings.dirty.subscribe(function(newValue){
			if(newValue){
				self.dismissNotification();
			}
		});
		
		
		self.notification = ko.observable(false);
		self.pushNotification = function(text, type){
			self.notification({
				text: text,
				status: type
			});
		}
		self.dismissNotification = function(){
			self.notification(false);
		}
		
		self.destroyPluginData = function(){
			
			$.ajax({
				type: "POST",
				url: ajaxurl,
				data: {
					action: 'qb_admin_ajax',
					endpoint: 'destroy_plugin_data',
					qb_admin_nonce: QB_GLOBALS.QB_ADMIN_NONCE
				},
				success: function(response){
					
					//navigate up a directory - not sure exactly how well this works but we have to do something...
					document.location.href="../";
					
				},
				dataType: 'json'
			});
			
		}
		
		self.saveSettings = function(callback){
			if(self.savingSettings()){
				return;
			}
			
			self.savingSettings(true);
			
			$.ajax({
				type: "POST",
				url: ajaxurl,
				data: {
					action: 'qb_admin_ajax',
					endpoint: 'update_quickiebar_settings',
					qb_admin_nonce: QB_GLOBALS.QB_ADMIN_NONCE,
					settings: {
						attribution: self.settings.attribution(),
						visibility: self.settings.visibility(),
						email: self.settings.email(),
						subscribed: self.settings.subscribed(),
						fixed_compatibility: self.settings.fixed_compatibility(),
						debug_mode: self.settings.debug_mode()
					}
				},
				success: function(response){
					
					self.pushNotification('Settings updated', 'success');
					self.settings.cacheCurrentSettings();
					
					self.savingSettings(false);
					
					if(typeof callback == 'function'){
						callback();
					}
				},
				dataType: 'json'
			});
		}
		
		self.subscribe = function(){
			//Get value current saved in email field
			$email_address = self.settings.email();
			
			if(self.subscribing()){
				return;
			}
			
			self.subscribing(true);
			
			//POST subscirbe form to mailchimp servers and handle response by updating page
			$.ajax({
				type: "POST",
				url: "//philbaylog.us6.list-manage.com/subscribe/post-json?u=e551001469dd03b8e20452a24&id=37c10f22db&c=?",
				data: {
					EMAIL: $email_address,
					FNAME: qb_settings.fname,
					WEBSITE: qb_settings.website
				},
				success: function(response){
					
					if(response.result == 'success'){
						
						//save subscribed status & current email address (if changed) to quickiebar
						self.settings.subscribed(true);
						
						self.saveSettings(function(){
							$('#subscribe-success-text').show();
							self.subscribing(false);
						});
						
					}
					else{
						self.pushNotification('Couldn\'t subscribe at this time', 'failure');
					}
					
				},
				dataType: 'json'
			});
		}
		
		self.syncData = function(){
			self.syncingDataWithServer(true);
			
			//get settings straight from php localization
			self.settings.attribution(qb_settings.attribution);
			self.settings.visibility(qb_settings.visibility);
			self.settings.email(qb_settings.email);
			self.settings.subscribed(qb_settings.subscribed);
			self.settings.fixed_compatibility(qb_settings.fixed_compatibility);
			self.settings.debug_mode(qb_settings.debug_mode);
			
			self.settings.cacheCurrentSettings();
			
			self.syncingDataWithServer(false);
			
		}
		
		self.init = function(){
			
		}
		
	}
	
	//initialize the view model
	viewModel = new ViewModel();
	ko.applyBindings(viewModel);
	
	viewModel.init();
	
	viewModel.syncData();
	
});
// Create the session store called "locationstore"
if (!CQ_Analytics.LocationStoreMgr ) {

    // Create the session store as a JSONStore
    CQ_Analytics.LocationStoreMgr = CQ_Analytics.PersistedJSONStore.registerNewInstance("locationstore");

	//CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION = "Delhi";

    // Function to load the data for the current user
    CQ_Analytics.LocationStoreMgr.loadData = function() {
        console.info("Loading LocationStoreMgr data");
        console.info('CQ_Analytics.LocationStoreMgr.initialized : '+CQ_Analytics.LocationStoreMgr.initialized);
        //if ( CQ_Analytics.LocationStoreMgr.initialized ) {
			console.log("Temperature is initialized");
            var currLocName = CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION;
			var locName = "Delhi";
            if(currLocName){
				locName = CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION;
            }
            var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=' + locName + '&units=metric&appid=519dd4cfe51d4e65be72974fbea0ae3e';

            try {
				$.getJSON(weatherAPI, function(response) {

                    if (response.main) { 
                        CQ_Analytics.LocationStoreMgr.data.CURRENT_TEMPERATURE = ""+response.main.temp;
                        console.log("Temperature at "+locName+" is "+CQ_Analytics.LocationStoreMgr.data.CURRENT_TEMPERATURE+" Deg Celsius");
                    }
            	});

            } catch(error) {
                console.log("Error", error);
            }
			//CQ_Analytics.LocationStoreMgr.setProperty("CURRENT_LOCATION1", locName)
			CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION = locName;
        //}
        CQ_Analytics.LocationStoreMgr.persist();

    };  

    CQ_Analytics.CCM.addListener("configloaded", function() {

        CQ_Analytics.ProfileDataMgr.addListener("update", function() {
            console.log("ProfileDataMgr's Update Event Triggered")
			this.loadData();
            this.fireEvent("update");
        }, CQ_Analytics.LocationStoreMgr);

	}, CQ_Analytics.LocationStoreMgr);

    CQ_Analytics.LocationStoreMgr.addListener("initialize", function() {
		this.loadData();
    });

    CQ_Analytics.LocationStoreMgr.initialized = false;

    CQ_Analytics.LocationStoreMgr.init();

    CQ_Analytics.LocationStoreMgr.updateLocation = function() {
        var locName = $('#locName').val();
        if(locName){
        	CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION = locName ;
        }
        var currTemp=CQ_Analytics.LocationStoreMgr.data.CURRENT_TEMPERATURE;
        if(currTemp){
		CQ_Analytics.LocationStoreMgr.loadData();
        	$('#location-store-data').text("Temperature at "+CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION+" is "+currTemp+" Deg Celsius");
        }
        return false;
    }

    $( document ).ready(function() {
   	 	CQ_Analytics.LocationStoreMgr.updateLocation()
	});
}

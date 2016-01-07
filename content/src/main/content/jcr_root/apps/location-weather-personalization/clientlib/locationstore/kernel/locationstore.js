// Create the session store called "locationstore"
if (!CQ_Analytics.LocationStoreMgr) {

    // Create the session store as a JSONStore
    CQ_Analytics.LocationStoreMgr = CQ_Analytics.PersistedJSONStore.registerNewInstance("locationstore");

    //CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION = "Delhi";

    // Function to load the data for the current user
    CQ_Analytics.LocationStoreMgr.loadData = function() {
        console.info("Loading LocationStoreMgr data");

        var currLocName = CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION;

        var locName = "";
        var weatherAPI = "";
        if (currLocName && currLocName != "") {
            weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=' + currLocName + '&units=metric&appid=519dd4cfe51d4e65be72974fbea0ae3e';
            updateTemperature(weatherAPI);
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + pos.lat + '&lon=' + pos.lng + '&units=metric&appid=519dd4cfe51d4e65be72974fbea0ae3e';
                    updateTemperature(weatherAPI);

                });

            }
        }
        //...
        CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION = currLocName;

        CQ_Analytics.LocationStoreMgr.persist();

    };

    function updateTemperature(weatherAPI) {
        try {
            $.getJSON(weatherAPI, function(response) {

                if (response.main) {
                    CQ_Analytics.LocationStoreMgr.data.CURRENT_TEMPERATURE = "" + response.main.temp;
                    var location=CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION;
                    if(location=="undefined"){
						location="current location"
                    }
                    $('.location-store-data').text("Temperature at " + location + " is " + CQ_Analytics.LocationStoreMgr.data.CURRENT_TEMPERATURE + " Deg Celsius");     
                }
            });

        } catch (error) {
            console.log("Error", error);
        }
    }


    //CQ_Analytics.CCM.addListener("configloaded", function() {

        CQ_Analytics.ProfileDataMgr.addListener("update", function() {
            console.log("ProfileDataMgr's Update Event Triggered")
            this.loadData();
            this.fireEvent("update");
        }, CQ_Analytics.LocationStoreMgr);

    //}, CQ_Analytics.LocationStoreMgr);

    CQ_Analytics.LocationStoreMgr.addListener("initialize", function() {
        this.loadData();
    });

    CQ_Analytics.LocationStoreMgr.initialized = false;

    CQ_Analytics.LocationStoreMgr.init();

    CQ_Analytics.LocationStoreMgr.updateLocation = function(location) {
        var locName = $('#locName').val();
        if (location) {
            locName = location;
        }

        if (locName) {
            CQ_Analytics.LocationStoreMgr.data.CURRENT_LOCATION = locName;
        }

        CQ_Analytics.LocationStoreMgr.loadData();
        return false;
    }

    $(document).ready(function() {
        CQ_Analytics.LocationStoreMgr.updateLocation();
        $(".location-form").submit(function() {
            CQ_Analytics.LocationStoreMgr.updateLocation($('#locName').val());
        });
    });


}
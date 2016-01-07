if (CQ_Analytics.LocationStoreMgr ) {

    // HTML template
    CQ_Analytics.LocationStoreMgr.template = 
        "<form class='cc-location-form' onsubmit='return false'>"
        +"<label for='cc-locName'>Enter Your location:</label>"
        +"<br/>"
        +"<input type='text' id='cc-locName' class='locName'>"
        +"<br/>"
        +"<input type='submit'>"
        +"</form>"
        +"<div class='location-store-data' />";


    CQ_Analytics.LocationStoreMgr.renderer = function(store, divId) {

		console.log("Renderer Method")

		$CQ("#" + divId).children().remove(); 

 		$CQ("#" + divId).append(CQ_Analytics.LocationStoreMgr.template);

        $(".cc-location-form").submit(function(){
			CQ_Analytics.LocationStoreMgr.updateLocation($('#cc-locName').val());;
        });

    }

}
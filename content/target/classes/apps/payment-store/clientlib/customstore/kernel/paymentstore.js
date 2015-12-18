// Create the session store called "paymentstore"
if (!CQ_Analytics.PaymentStoreMgr ) {

    // TODO: Register a New Session Storeas a JSONStore


    // Function to load the data for the current user
    CQ_Analytics.PaymentStoreMgr.loadData = function() {

        console.info("Loading PaymentStoreMgr data");

        if ( CQ_Analytics.PaymentStoreMgr.initialized ) {
			console.log("Data is initialized");

            //TODO: Get JSON Data from servlet registered on path "/bin/clientcontext/paymentstore",
            // using CQ.shared.HTTP.eval() and insert that JSON into 'data' of current store


        }
    };  

    CQ_Analytics.ProfileDataMgr.addListener("update", function() {
        console.log("ProfileDataMgr's Update Event Triggered")

        //TODO: Load the required data

    }, CQ_Analytics.PaymentStoreMgr);

    CQ_Analytics.PaymentStoreMgr.addListener("initialize", function() {

        //TODO: Load the data for the first time

    });

    CQ_Analytics.PaymentStoreMgr.initialized = false;


}
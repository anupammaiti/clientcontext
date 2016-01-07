// Create the session store called "customstore"
if (!CQ_Analytics.PaymentStoreMgr ) {

    // Create the session store as a JSONStore
    CQ_Analytics.PaymentStoreMgr = CQ_Analytics.JSONStore.registerNewInstance("paymentstore");

    // Function to load the data for the current user
    CQ_Analytics.PaymentStoreMgr.loadData = function() {

        console.info("Loading PaymentStoreMgr data");

        if ( CQ_Analytics.PaymentStoreMgr.initialized ) {
			console.log("Data is initialized");

            try { 
                var object = CQ.shared.HTTP.eval("/bin/clientcontext/paymentstore");
                if (object) { this.data = object; }
            } catch(error) {
                console.log("Error", error);
            }
        }
    };  

    CQ_Analytics.ProfileDataMgr.addListener("update", function() {
        console.log("ProfileDataMgr's Update Event Triggered")
        //TODO: Load the required data
        this.loadData();
       // this.fireEvent("update");
    }, CQ_Analytics.PaymentStoreMgr);

    CQ_Analytics.PaymentStoreMgr.addListener("initialize", function() {
        //TODO: Load the data for the first time
        this.loadData();
    });

    CQ_Analytics.PaymentStoreMgr.initialized = false;


}
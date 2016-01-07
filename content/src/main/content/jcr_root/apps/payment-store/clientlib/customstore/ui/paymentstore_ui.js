if (CQ_Analytics.PaymentStoreMgr ) {

    // HTML template
    CQ_Analytics.PaymentStoreMgr.template = 
        "<input class='paymentstore-input' type='checkbox' id='paymentstore-input-ONLINEPAYMENT' "
        +"name='ONLINEPAYMENT' value='ONLINEPAYMENT' %checked%>"
        +"<label for='paymentstore-input-ONLINEPAYMENT' class='%checkedClass%'>"
        +"<div class='toggle'>"
        +"<div class='green'/>"
        +"<div class='red'/>"
        +"</div>Online payment</label>";

    CQ_Analytics.PaymentStoreMgr.templateRenderer = function(value) {
        console.log("Template Prepared")
         var checkedString = ""; var checkedClass = "";
         if (value==="true") {
             checkedString = "checked='checked'";
             checkedClass  = "checked";
         }
         var template = CQ_Analytics.PaymentStoreMgr.template;
         return template.replace(/%checked%/g, checkedString)
             .replace(/%checkedClass%/g, checkedClass);
     }


    CQ_Analytics.PaymentStoreMgr.renderer = function(store, divId) {

        $CQ("#" + divId).children().remove();
        $CQ("#" + divId).addClass("cq-cc-paymentstore");

        var templateRenderer = CQ_Analytics.PaymentStoreMgr.templateRenderer;           



        // TODO : Get current store's JSON data and append checkbox for each object by calling the templateRenderer() method
        var data=CQ_Analytics.PaymentStoreMgr.data;
        if(data){
            $CQ("#"+divId).append(templateRenderer(data.ONLINEPAYMENT));
        }

        $CQ(".paymentstore-input").change(function(){
            console.log("Change In Input Detected")
            var value = false;

            //TODO: Get store's data ONLINEPAYMENT value, toggle the value and set the new value to the checkbox and again back to store's data
            var data = CQ_Analytics.PaymentStoreMgr.data;

            var currValue = data.ONLINEPAYMENT;
            var newValue = (currValue === "true")?false:true;
            $CQ("#paymentstore-input-ONLINEPAYMENT").prop('checked', newValue);
            CQ_Analytics.PaymentStoreMgr.data.ONLINEPAYMENT=""+newValue;
        });         

    }

}
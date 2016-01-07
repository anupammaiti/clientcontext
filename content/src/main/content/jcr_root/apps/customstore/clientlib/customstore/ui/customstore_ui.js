if (CQ_Analytics.CustomStoreMgr ) {

    // HTML template
    CQ_Analytics.CustomStoreMgr.template = 
        "<input class='customstore-input' type='checkbox' id='customstore-input-%key%' name='%key%' value='%key%' %checked%>" +
        "<label for='customstore-input-%key%' class='%checkedClass%'>" +
        "<div class='toggle'><div class='green'/><div class='red'/></div>" +
        "%label%</label>";

    CQ_Analytics.CustomStoreMgr.templateRenderer = function(key, label, value) {
		console.log("Template Prepared")
         var checkedString = ""; var checkedClass = "";
         if (value==="true") {
             checkedString = "checked='checked'";
             checkedClass  = "checked";
         }
         var template = CQ_Analytics.CustomStoreMgr.template;
         return template.replace(/%label%/g, label)
             .replace(/%key%/g, key)
             .replace(/%checked%/g, checkedString)
             .replace(/%checkedClass%/g, checkedClass);
     }


    CQ_Analytics.CustomStoreMgr.renderer = function(store, divId) {

		console.log("Renderer Method")

		$CQ("#" + divId).children().remove();
        $CQ("#" + divId).addClass("cq-cc-customstore");

		var name = CQ_Analytics.ProfileDataMgr.getProperty("formattedName");
		var templateRenderer = CQ_Analytics.CustomStoreMgr.templateRenderer;

		var div = $CQ("<div>").html(name + " services");
		$CQ("#" + divId).append(div);           

		var data = this.getJSON();

        if (data) {
            for (var i in data) {
                if (typeof data[i] === 'object') {
                    var temp=templateRenderer(data[i].key,data[i].label,data[i].value)
                    $CQ("#" + divId).append(temp);
                }
            }
        }

		$CQ(".customstore-input").change(function(){
            console.log("Change In Input Detected")
            var value = false;
        	if ($CQ(this).attr("checked")) {
            	value = true;
        	}
        	var key = $CQ(this).attr("name");
            var newValue = (value === true)?"false":"true";

			CQ_Analytics.CustomStoreMgr.setTraitValue(key,newValue);
        	CQ_Analytics.ProfileDataMgr.fireEvent("update");
    	});         

    }

    CQ_Analytics.CustomStoreMgr.setTraitValue = function(key, newValue) {
		console.log("Key's New Value Being Set in Data")
        var data = CQ_Analytics.CustomStoreMgr.data;
        if (data) {
            data[key + '/value'] = newValue;
        }
    };


	//CQ_Analytics.ClickstreamcloudMgr.register(CQ_Analytics.CustomStoreMgr);

}
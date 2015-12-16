<%@include file="/libs/foundation/global.jsp" %>
<%@taglib prefix="personalization" uri="http://www.day.com/taglibs/cq/personalization/1.0" %>

    
<form onsubmit="return CQ_Analytics.LocationStoreMgr.updateLocation()">
    <label for='locName'>Enter Your location:</label>
    <br/>
    <input type="text" id="locName">
    <br/>
    <input type="submit">
</form>

<div id="location-store-data" />

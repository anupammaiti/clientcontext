<%@include file="/libs/foundation/global.jsp"%>
<%@page session="false" %>
<cq:include script="/libs/wcm/core/components/init/init.jsp"/>
<cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext"/>
</div>
<html>
	<head>		
	</head>
	<body>
        <div style="float: left; width: 50%">
            <cq:include path="contentPar" resourceType="foundation/components/parsys"/>
        </div>
        <div style="float: right; width: 50%">
            <cq:include path="par2" resourceType="foundation/components/parsys"/>
        </div>
	</body>
</html>

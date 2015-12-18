package com.clientcontext.customstore.servlets;

import java.io.IOException;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Servlet registered on path /bin/clientcontext/paymentstore to provide dummy
 * data to the custom client-context store component
 */
@SlingServlet(label = "Payment Store Data Servlet",
              description = "This is a dummy servlet that returns Dummy Payment data as JSON Response",
              generateComponent = false, paths = { "/bin/clientcontext/paymentstore" }, methods = { "GET", "POST" })
@Component(label = "Payment Store Data Servlet",
           description = "This is a dummy servlet that returns Dummy Payment data as JSON Response", immediate = true,
           metatype = false, enabled = true)
public class PaymentStoreDataServlet extends SlingAllMethodsServlet {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(PaymentStoreDataServlet.class);
    
    @Override
    protected void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
            throws javax.servlet.ServletException, java.io.IOException {
	doGet(request, response);
    }
    
    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) {
	try {
	    response.setContentType("application/json");
	    response.setCharacterEncoding("utf-8");
	    
	    final JSONObject jsonObject = new JSONObject();
	    
	    //	    jsonObject.put("ONLINEPAYMENT/key", "ONLINEPAYMENT");
	    //	    jsonObject.put("ONLINEPAYMENT/label", "Online payment");
	    jsonObject.put("ONLINEPAYMENT", "true");

	    //Returnning the Dummy JSON Object.
	    response.getWriter().print(jsonObject.toString());
	    
	} catch (
	
	final JSONException e)
	
	{
	    LOGGER.error("Json Exception occured in DummyDataServlet while adding data ", e);
	} catch (
	
	final IOException e)
	
	{
	    LOGGER.error("", e);
	}
    }
}

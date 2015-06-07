/**
 * 
 */
package io.floop.web.util;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

/**
 * @author Derek Reynolds
 *
 */
public class WebUtil {

	/**
	 * Retrieve the clients ip address
	 * @param request
	 * @return the client ip address
	 */
	public static String getClientIpAddress(HttpServletRequest request) {
		
        String ip = request.getHeader("X-Forwarded-For");
        
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip))  
            ip = request.getHeader("Proxy-Client-IP");  
          
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip))  
            ip = request.getHeader("WL-Proxy-Client-IP");  
          
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) 
            ip = request.getHeader("HTTP_CLIENT_IP");  
          
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip))  
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
          
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip))  
            ip = request.getRemoteAddr();  
          
        return ip;  
    }  
	
}

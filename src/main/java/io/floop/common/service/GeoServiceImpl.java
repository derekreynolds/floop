/**
 * 
 */
package io.floop.common.service;

import java.net.InetAddress;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.model.CityResponse;

/**
 * @author Derek Reynolds
 *
 */
@Service
public class GeoServiceImpl implements GeoService {
		
	private DatabaseReader reader;
	
	@Autowired
	public GeoServiceImpl(final ResourceLoader resourceLoader) throws Exception {
		reader = new DatabaseReader.Builder(resourceLoader.getResource("classpath:geo/GeoLite2-City.mmdb").getFile()).build();
	}
	
	public Optional<CityResponse> getIpAddressLocation(String clientIpAddress) {
	
		CityResponse cityResponse = null;
			
		try {	  

		   cityResponse = reader.city(InetAddress.getByName(clientIpAddress));
	  
		} catch(Exception exception) {
		   
		}
	   
		return Optional.ofNullable(cityResponse);
	}
}

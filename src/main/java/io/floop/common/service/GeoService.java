/**
 * 
 */
package io.floop.common.service;

import java.util.Optional;

import com.maxmind.geoip2.model.CityResponse;

/**
 * @author Derek Reynolds
 *
 */
public interface GeoService {

	public Optional<CityResponse> getIpAddressLocation(String clientIpAddress);
	
}

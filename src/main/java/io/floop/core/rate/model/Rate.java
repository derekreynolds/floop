/**
 * 
 */
package io.floop.core.rate.model;

import io.floop.core.common.model.Geo;
import io.floop.domain.AbstractAuditingEntity;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Derek Reynolds
 *
 */
@Document(collection = "RATE")
public class Rate extends AbstractAuditingEntity {

	@DBRef
	private RateTemplate rateTemplate;

	private Geo geo;
	
	/**
	 * @return the rateTemplate
	 */
	public RateTemplate getRateTemplate() {
		return rateTemplate;
	}

	/**
	 * @return the geo
	 */
	public Geo getGeo() {
		return geo;
	}

	/**
	 * @param geo the geo to set
	 */
	public void setGeo(Geo geo) {
		this.geo = geo;
	}

	/**
	 * @param rateTemplate the rateTemplate to set
	 */
	public void setRateTemplate(RateTemplate rateTemplate) {
		this.rateTemplate = rateTemplate;
	}
	
	
	
}

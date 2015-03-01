/**
 * 
 */
package io.floop.rate.model;

import io.floop.domain.AbstractAuditingEntity;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author reno
 *
 */
@Document(collection = "RATE")
public class Rate extends AbstractAuditingEntity implements Serializable {

    @Id
    private String id;
	
}

/**
 * 
 */
package io.floop.common.model;

import java.io.Serializable;

import io.floop.core.common.model.Option;
import io.floop.domain.AbstractAuditingEntity;

import javax.validation.constraints.Size;

import org.joda.time.DateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * @author Derek Reynolds
 *
 */
@Document(collection = "FEEDBACK_TEMPLATE")
public abstract class FeedbackTemplate extends AbstractAuditingEntity implements Serializable  {

    @Id
    private String id;
    
    @Size(min = 1, max = 1000)
    @Field("title")
    private String title;
    
    @Size(min = 1, max = 5000)
    @Field("description")
    private String description;
    
    @Field("start_date")
    private DateTime startDate;
    
    @Field("end_date")
    private DateTime endDate;    
    
    @Field("option")
    private Option option;
    
	/**
	 * @return the option
	 */
	public Option getOption() {
		return option;
	}

	/**
	 * @param option the option to set
	 */
	public void setOption(Option option) {
		this.option = option;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the startDate
	 */
	public DateTime getStartDate() {
		return startDate;
	}

	/**
	 * @param startDate the startDate to set
	 */
	public void setStartDate(DateTime startDate) {
		this.startDate = startDate;
	}

	/**
	 * @return the endDate
	 */
	public DateTime getEndDate() {
		return endDate;
	}

	/**
	 * @param endDate the endDate to set
	 */
	public void setEndDate(DateTime endDate) {
		this.endDate = endDate;
	}
	
}

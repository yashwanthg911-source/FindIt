package com.findit.dto;
import com.findit.entity.ReportType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ItemRequest {
	    @NotBlank(message = "Item name is required") 
	    @Size(max = 100, message = "Item name cannot exceed 100 characters")
	    private String itemName;
	    
	    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
	    private String description;
	    
	    @Size(max = 200, message = "Location cannot exceed 200 characters")
	    @NotBlank(message = "Location is required")
	    private String location;
	    
	    @NotNull(message = "Report type is required")
	    private ReportType reportType;
	    @Size(max = 50, message = "Color cannot exceed 50 characters")
	    private String color;

	    public String getItemName() {
	        return itemName;
	    }

	    public void setItemName(String itemName) {
	        this.itemName = itemName;
	    }

	    public String getDescription() {
	        return description;
	    }

	    public void setDescription(String description) {
	        this.description = description;
	    }

	    public String getLocation() {
	        return location;
	    }

	    public void setLocation(String location) {
	        this.location = location;
	    }
	    
	    public ReportType getReportType() {
	        return reportType;
	    }

	    public void setReportType(ReportType reportType) {
	        this.reportType = reportType;
	    }
	    
	    public String getColor() {
	    	return color;
	    }
	    public void setColor(String color) {
	    	this.color = color;
	    }
}

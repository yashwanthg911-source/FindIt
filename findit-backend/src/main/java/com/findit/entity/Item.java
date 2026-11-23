package com.findit.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String itemName;
	private String description;
	private String location;
	private String color;
	@Enumerated(EnumType.STRING)
	private ReportType reportType;
	
	@Enumerated(EnumType.STRING)
	private ItemStatus status = ItemStatus.ACTIVE;
	
	private LocalDateTime createdAt;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	public Item() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public ReportType getReportType() {
	    return reportType;
	}

	public void setReportType(ReportType reportType) {
	    this.reportType = reportType;
	}
	public ItemStatus getItemStatus() {
		return status;
	}
	public void setItemStatus(ItemStatus status) {
		this.status = status;
	}
	
	@PrePersist
	public void setCreatedAt() {
	    this.createdAt = LocalDateTime.now();
	}
	
	public LocalDateTime getCreatedAt() {
	    return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
	    this.createdAt = createdAt;
	}
	public User getUser() {
	    return user;
	}

	public void setUser(User user) {
	    this.user = user;
	}
}

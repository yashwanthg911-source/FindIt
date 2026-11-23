package com.findit.dto;

import java.time.LocalDateTime;

import com.findit.entity.ClaimStatus;

public class ClaimResponse {
	private Long id;
	private Long itemId;
	private String itemName;
	private Long userId;
	private String userName;
	private String verificationDetails;
	private ClaimStatus status;
	private LocalDateTime createdAt;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getItemId() {
		return itemId;
	}
	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getVerificationDetails() {
		return verificationDetails;
	}
	public void setVerificationDetails(String verificationDetails) {
		this.verificationDetails = verificationDetails;
	}
	public ClaimStatus getStatus() {
		return status;
	}
	public void setStatus(ClaimStatus status) {
		this.status = status;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
}

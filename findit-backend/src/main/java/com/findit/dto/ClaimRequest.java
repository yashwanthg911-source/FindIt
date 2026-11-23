package com.findit.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
public class ClaimRequest {
	@NotBlank(message = "Verification details are required")
	@Size(max = 1000, message = "Verification details cannot exceed 1000 characters")
	private String verificationDetails;

	public String getVerificationDetails() {
		return verificationDetails;
	}

	public void setVerificationDetails(String verificationDetails) {
		this.verificationDetails = verificationDetails;
	}
}

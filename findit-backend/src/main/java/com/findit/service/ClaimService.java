package com.findit.service;
import org.springframework.stereotype.Service;


import com.findit.dto.ClaimRequest;
import com.findit.dto.ClaimResponse;
import com.findit.repository.ClaimRepository;
import com.findit.repository.ItemRepository;
import com.findit.repository.UserRepository;
import com.findit.entity.Claim;
import com.findit.entity.ClaimStatus;
import com.findit.entity.Item;
import com.findit.entity.ReportType;
import com.findit.entity.User;
import com.findit.entity.ItemStatus;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.transaction.annotation.Transactional;
@Service
public class ClaimService {
	 private final ClaimRepository claimRepository;
	    private final ItemRepository itemRepository;
	    private final UserRepository userRepository;

	    public ClaimService(
	            ClaimRepository claimRepository,
	            ItemRepository itemRepository,
	            UserRepository userRepository) {

	        this.claimRepository = claimRepository;
	        this.itemRepository = itemRepository;
	        this.userRepository = userRepository;
	    }
	    
	    public ClaimResponse submitClaim(
	            Long itemId,
	            Long userId,
	            ClaimRequest request) {
	    	Item item = itemRepository.findById(itemId)
	    	        .orElseThrow(() -> new ResponseStatusException(
	    	                HttpStatus.NOT_FOUND,
	    	                "Item not found"
	    	        ));
	    	if (item.getReportType() != ReportType.FOUND) {
	    	    throw new ResponseStatusException(
	    	            HttpStatus.BAD_REQUEST,
	    	            "Claims can only be submitted for found items"
	    	    );
	    	}
	    	if (item.getUser() == null) {
	    	    throw new ResponseStatusException(
	    	            HttpStatus.CONFLICT,
	    	            "This item does not have an owner"
	    	    );
	    	}

	    	if (item.getUser().getId().equals(userId)) {
	    	    throw new ResponseStatusException(
	    	            HttpStatus.FORBIDDEN,
	    	            "You cannot claim your own reported item"
	    	    );
	    	}
	    	boolean alreadyClaimed =
	    	        claimRepository.existsByItem_IdAndUser_IdAndStatus(
	    	                itemId,
	    	                userId,
	    	                ClaimStatus.PENDING
	    	        );

	    	if (alreadyClaimed) {
	    	    throw new ResponseStatusException(
	    	            HttpStatus.CONFLICT,
	    	            "You already have a pending claim for this item"
	    	    );
	    	}
	    	if (item.getItemStatus() != ItemStatus.ACTIVE) {
	    	    throw new ResponseStatusException(
	    	            HttpStatus.CONFLICT,
	    	            "This item is no longer available for claiming"
	    	    );
	    	}
	    	User user = userRepository.findById(userId)
	    	        .orElseThrow(() -> new ResponseStatusException(
	    	                HttpStatus.NOT_FOUND,
	    	                "User not found"
	    	        ));
	    	
	    	Claim claim = new Claim();

	    	claim.setItem(item);
	    	claim.setUser(user);
	    	claim.setVerificationDetails(request.getVerificationDetails());
	    	Claim savedClaim = claimRepository.save(claim);
	    	ClaimResponse response = new ClaimResponse();

	    	response.setId(savedClaim.getId());
	    	response.setItemId(savedClaim.getItem().getId());
	    	response.setItemName(savedClaim.getItem().getItemName());
	    	response.setUserId(savedClaim.getUser().getId());
	    	response.setUserName(savedClaim.getUser().getName());
	    	response.setVerificationDetails(savedClaim.getVerificationDetails());
	    	response.setStatus(savedClaim.getStatus());
	    	response.setCreatedAt(savedClaim.getCreatedAt());
	    	return response;
	    }
	    
	    public List<ClaimResponse> getMyClaims(Long userId) {

	        List<Claim> claims = claimRepository.findByUser_Id(userId);

	        return claims.stream()
	                .map(claim -> {
	                    ClaimResponse response = new ClaimResponse();

	                    response.setId(claim.getId());
	                    response.setItemId(claim.getItem().getId());
	                    response.setItemName(claim.getItem().getItemName());
	                    response.setUserId(claim.getUser().getId());
	                    response.setUserName(claim.getUser().getName());
	                    response.setVerificationDetails(claim.getVerificationDetails());
	                    response.setStatus(claim.getStatus());
	                    response.setCreatedAt(claim.getCreatedAt());

	                    return response;
	                })
	                .toList();
	    }
	    
	    public List<ClaimResponse> getClaimsForItem(
	            Long itemId,
	            Long userId) {

	        Item item = itemRepository.findById(itemId)
	                .orElseThrow(() -> new ResponseStatusException(
	                        HttpStatus.NOT_FOUND,
	                        "Item not found"
	                ));

	        if (item.getUser() == null ||
	                !item.getUser().getId().equals(userId)) {

	            throw new ResponseStatusException(
	                    HttpStatus.FORBIDDEN,
	                    "Only the item owner can view its claims"
	            );
	        }

	        List<Claim> claims = claimRepository.findByItem_Id(itemId);

	        return claims.stream()
	                .map(claim -> {
	                    ClaimResponse response = new ClaimResponse();

	                    response.setId(claim.getId());
	                    response.setItemId(claim.getItem().getId());
	                    response.setItemName(claim.getItem().getItemName());
	                    response.setUserId(claim.getUser().getId());
	                    response.setUserName(claim.getUser().getName());
	                    response.setVerificationDetails(claim.getVerificationDetails());
	                    response.setStatus(claim.getStatus());
	                    response.setCreatedAt(claim.getCreatedAt());

	                    return response;
	                })
	                .toList();
	    }
	    
	    
	    @Transactional
	    public ClaimResponse decideClaim(
	            Long claimId, Long userId, ClaimStatus decision) {
	    	Claim claim = claimRepository.findById(claimId)
	    	        .orElseThrow(() -> new ResponseStatusException(
	    	                HttpStatus.NOT_FOUND, "Claim not found"));
	    	Item item = claim.getItem();

	    	if (item.getUser() == null ||
	    	        !item.getUser().getId().equals(userId)) {

	    	    throw new ResponseStatusException(
	    	            HttpStatus.FORBIDDEN,
	    	            "Only the item owner can decide claims");
	    	}
	    	if (claim.getStatus() != ClaimStatus.PENDING) {

	    	    throw new ResponseStatusException(
	    	            HttpStatus.CONFLICT,
	    	            "This claim has already been decided");
	    	}
	    	if (decision != ClaimStatus.APPROVED &&
	    	        decision != ClaimStatus.REJECTED) {

	    	    throw new ResponseStatusException(
	    	            HttpStatus.BAD_REQUEST,
	    	            "Invalid claim decision");
	    	}
	    	if (decision == ClaimStatus.APPROVED) {

	    	    claim.setStatus(ClaimStatus.APPROVED);

	    	    item.setItemStatus(ItemStatus.CLAIMED);

	    	    List<Claim> otherClaims =
	    	            claimRepository.findByItem_IdAndStatus(
	    	                    item.getId(), ClaimStatus.PENDING);

	    	    for (Claim otherClaim : otherClaims) {

	    	        if (!otherClaim.getId().equals(claim.getId())) {
	    	            otherClaim.setStatus(ClaimStatus.REJECTED);
	    	        }
	    	    }
	    	}else {
	    	    claim.setStatus(ClaimStatus.REJECTED);
	    	}
	    	return mapToClaimResponse(claim);
	    }
	    private ClaimResponse mapToClaimResponse(Claim claim) {

	        ClaimResponse response = new ClaimResponse();

	        response.setId(claim.getId());
	        response.setItemId(claim.getItem().getId());
	        response.setItemName(claim.getItem().getItemName());
	        response.setUserId(claim.getUser().getId());
	        response.setUserName(claim.getUser().getName());
	        response.setVerificationDetails(claim.getVerificationDetails());
	        response.setStatus(claim.getStatus());
	        response.setCreatedAt(claim.getCreatedAt());

	        return response;
	    }
}

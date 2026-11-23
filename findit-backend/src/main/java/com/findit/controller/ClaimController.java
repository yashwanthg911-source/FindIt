package com.findit.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.findit.dto.ClaimRequest;
import com.findit.dto.ClaimResponse;
import com.findit.entity.ClaimStatus;
import com.findit.service.ClaimService;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
@RestController
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping("/api/items/{itemId}/claims")
    public ResponseEntity<ClaimResponse> submitClaim(
            @PathVariable Long itemId,
            @Valid @RequestBody ClaimRequest request,
            @AuthenticationPrincipal Jwt jwt) {

        Long userId = Long.valueOf(jwt.getSubject());

        ClaimResponse response =
                claimService.submitClaim(itemId, userId, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping("/api/claims/my-claims")
    public ResponseEntity<List<ClaimResponse>> getMyClaims(
            @AuthenticationPrincipal Jwt jwt) {

        Long userId = Long.valueOf(jwt.getSubject());

        List<ClaimResponse> claims = claimService.getMyClaims(userId);

        return ResponseEntity.ok(claims);
    }
    
    @GetMapping("/api/items/{itemId}/claims")
    public ResponseEntity<List<ClaimResponse>> getClaimsForItem(
            @PathVariable Long itemId,
            @AuthenticationPrincipal Jwt jwt) {

        Long userId = Long.valueOf(jwt.getSubject());

        List<ClaimResponse> claims =
                claimService.getClaimsForItem(itemId, userId);

        return ResponseEntity.ok(claims);
    }
    @PatchMapping("/api/claims/{claimId}/approve")
    public ResponseEntity<ClaimResponse> approveClaim(
            @PathVariable Long claimId,
            @AuthenticationPrincipal Jwt jwt) {

        Long userId = Long.valueOf(jwt.getSubject());

        ClaimResponse response = claimService.decideClaim(
                claimId, userId, ClaimStatus.APPROVED);

        return ResponseEntity.ok(response);
    }
    
    @PatchMapping("/api/claims/{claimId}/reject")
    public ResponseEntity<ClaimResponse> rejectClaim(
            @PathVariable Long claimId,
            @AuthenticationPrincipal Jwt jwt) {

        Long userId = Long.valueOf(jwt.getSubject());

        ClaimResponse response = claimService.decideClaim(
                claimId, userId, ClaimStatus.REJECTED);

        return ResponseEntity.ok(response);
    }
}
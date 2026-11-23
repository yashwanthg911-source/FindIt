package com.findit.service;

import com.findit.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.findit.dto.ItemRequest;
import com.findit.entity.Item;
import com.findit.entity.ReportType;
import com.findit.entity.User;
import com.findit.repository.ItemRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.findit.dto.ItemResponse;
@Service
public class ItemService {
	private final ItemRepository itemRepository;
	private final UserRepository userRepository;
	public ItemService(
	        ItemRepository itemRepository,
	        UserRepository userRepository) {

	    this.itemRepository = itemRepository;
	    this.userRepository = userRepository;
	}
	
	public ItemResponse saveItem(ItemRequest request, Long userId) {

	    Item item = new Item();
	    item.setItemName(request.getItemName());
	    item.setDescription(request.getDescription());
	    item.setLocation(request.getLocation());
	    item.setReportType(request.getReportType());
	    item.setColor(request.getColor());

	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.NOT_FOUND,
	                    "User not found"
	            ));

	    item.setUser(user);

	    Item savedItem = itemRepository.save(item);

	    return mapToItemResponse(savedItem);
	}
	
	public List<ItemResponse> getAllItems() {

	    List<Item> items = itemRepository.findAll();

	    return items.stream()
	            .map(this::mapToItemResponse)
	            .toList();
	}
	
	public ItemResponse getItemById(Long id) {

	    Item item = itemRepository.findById(id)
	            .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.NOT_FOUND,
	                    "Item not found with id: " + id
	            ));

	    return mapToItemResponse(item);
	}
	
	public ItemResponse updateItem(
	        Long id, ItemRequest request, Long userId) {

	    Item item = itemRepository.findById(id)
	            .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.NOT_FOUND,
	                    "Item not found with id: " + id
	            ));

	    if (item.getUser() == null ||
	            !item.getUser().getId().equals(userId)) {

	        throw new ResponseStatusException(
	                HttpStatus.FORBIDDEN,
	                "You are not allowed to update this item"
	        );
	    }

	    item.setItemName(request.getItemName());
	    item.setDescription(request.getDescription());
	    item.setLocation(request.getLocation());
	    item.setColor(request.getColor());
	    item.setReportType(request.getReportType());

	    Item updatedItem = itemRepository.save(item);

	    return mapToItemResponse(updatedItem);
	}
	public void deleteItem(Long id,Long userId) {
	    Item item = itemRepository.findById(id)
	            .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.NOT_FOUND,
	                    "Item not found with id: " + id
	            ));
	    if (item.getUser() == null ||
	            !item.getUser().getId().equals(userId)) {

	        throw new ResponseStatusException(
	                HttpStatus.FORBIDDEN,
	                "You are not allowed to delete this item"
	        );
	    }
	    itemRepository.delete(item);
	}
	
	public List<ItemResponse> searchByReportType(ReportType reportType) {

	    List<Item> items = itemRepository.findByReportType(reportType);

	    return items.stream()
	            .map(this::mapToItemResponse)
	            .toList();
	}
	
	public List<ItemResponse> searchByItemName(String itemName) {

	    List<Item> items =
	            itemRepository.findByItemNameContainingIgnoreCase(itemName);

	    return items.stream()
	            .map(this::mapToItemResponse)
	            .toList();
	}
	public List<ItemResponse> searchByLocation(String location) {

	    List<Item> items =
	            itemRepository.findByLocationContainingIgnoreCase(location);

	    return items.stream()
	            .map(this::mapToItemResponse)
	            .toList();
	}
	public List<ItemResponse> searchByItemNameAndLocation(
	        String itemName, String location) {

	    List<Item> items =
	            itemRepository
	                    .findByItemNameContainingIgnoreCaseAndLocationContainingIgnoreCase(
	                            itemName, location);

	    return items.stream()
	            .map(this::mapToItemResponse)
	            .toList();
	}
	
	public List<ItemResponse> searchByItemNameAndLocationAndReportType(
	        String itemName, String location, ReportType reportType) {

	    List<Item> items =
	            itemRepository.findByItemNameContainingIgnoreCaseAndLocationContainingIgnoreCaseAndReportType(
	                    itemName, location, reportType);

	    return items.stream()
	            .map(this::mapToItemResponse)
	            .toList();
	}
	
	public List<ItemResponse> searchByItemNameAndReportType(
	        String itemName, ReportType reportType) {

	    List<Item> items =
	            itemRepository.findByItemNameContainingIgnoreCaseAndReportType(
	                    itemName, reportType);

	    return items.stream()
	            .map(this::mapToItemResponse)
	            .toList();
	}
	
	public List<ItemResponse> searchByLocationAndReportType(
	        String location, ReportType reportType) {

	    List<Item> items =
	            itemRepository.findByLocationContainingIgnoreCaseAndReportType(
	                    location, reportType);

	    return items.stream()
	            .map(this::mapToItemResponse)
	            .toList();
	}
	
	
	public Page<ItemResponse> getAllItems(Pageable pageable) {

	    Page<Item> items = itemRepository.findAll(pageable);

	    return items.map(this::mapToItemResponse);
	}
	
	public List<ItemResponse> getItemsSortedByDate() {

	    List<Item> items = itemRepository.findAll(
	            Sort.by("createdAt").descending()
	    );

	    return items.stream()
	            .map(this::mapToItemResponse)
	            .toList();
	}
	public Page<ItemResponse> getItemsByReportType(
	        ReportType reportType, Pageable pageable) {

	    Page<Item> items =
	            itemRepository.findByReportType(reportType, pageable);

	    return items.map(this::mapToItemResponse);
	}
	
	public Page<ItemResponse> searchItems(
	        String itemName,
	        String location,
	        ReportType reportType,
	        Pageable pageable) {

	    Page<Item> items = itemRepository.searchItems(
	            itemName,
	            location,
	            reportType,
	            pageable
	    );

	    return items.map(this::mapToItemResponse);
	}
	public List<ItemResponse> getMyReports(Long userId) {

	    List<Item> items = itemRepository.findByUser_Id(userId);

	    return items.stream()
	            .map(this::mapToItemResponse)
	            .toList();
	}
	
	private ItemResponse mapToItemResponse(Item item) {

	    ItemResponse response = new ItemResponse();

	    response.setId(item.getId());
	    response.setItemName(item.getItemName());
	    response.setDescription(item.getDescription());
	    response.setLocation(item.getLocation());
	    response.setColor(item.getColor());
	    response.setReportType(item.getReportType());
	    response.setStatus(item.getItemStatus());
	    response.setCreatedAt(item.getCreatedAt());

	    if (item.getUser() != null) {
	        response.setUserId(item.getUser().getId());
	        response.setUserName(item.getUser().getName());
	    }

	    return response;
	}
}

package com.ecommerce.store.controller;

import com.ecommerce.store.model.CartItem;
import com.ecommerce.store.model.Product;
import com.ecommerce.store.model.User;
import com.ecommerce.store.repository.CartItemRepository;
import com.ecommerce.store.repository.ProductRepository;
import com.ecommerce.store.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/cart")
public class CartItemController {

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestParam Long productId, @RequestParam int quantity, Principal principal){
        User user = userRepository.findByEmail(principal.getName()).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);

        if(user == null || product == null) {
            return ResponseEntity.badRequest().body("Invalid user or Product");
        }

        CartItem item = new CartItem();
        item.setUser(user);
        item.setProduct(product);
        item.setQuantity(quantity);
        cartItemRepository.save(item);

        return ResponseEntity.ok("Product Added to Cart");
    }

    @GetMapping
    public List<CartItem> getUserCart(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElse(null);
        return  cartItemRepository.findByUser(user);
    }

    @DeleteMapping("/{productId}")
    public  ResponseEntity<?> removeFromCart(@PathVariable Long productId, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        try {
            cartItemRepository.deleteByUserAndProductId(user, productId);
            return ResponseEntity.ok("Product removed from cart");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove product from cart: " + e.getMessage());
        }

    }
}

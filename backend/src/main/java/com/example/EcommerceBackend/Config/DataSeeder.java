package com.example.EcommerceBackend.Config;

import com.example.EcommerceBackend.Entities.Product;
import com.example.EcommerceBackend.Repositories.ProductRepo;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepo productRepo;

    @Override
    public void run(String... args) {
        if (productRepo.count() > 0) {
            return;
        }

        productRepo.saveAll(List.of(
                product(
                        "STAR-BAG-001",
                        "Everyday Canvas Tote",
                        "A durable canvas tote for work, shopping, and daily errands.",
                        249,
                        "Bags",
                        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
                        18
                ),
                product(
                        "STAR-BOTTLE-002",
                        "Steel Water Bottle",
                        "A reusable insulated bottle that keeps drinks cold or warm for hours.",
                        189,
                        "Lifestyle",
                        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
                        24
                ),
                product(
                        "STAR-LAMP-003",
                        "Minimal Desk Lamp",
                        "A clean desk lamp with soft light for studying, reading, and work.",
                        349,
                        "Home",
                        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
                        9
                ),
                product(
                        "STAR-HEAD-004",
                        "Wireless Headphones",
                        "Comfortable wireless headphones for music, calls, and focus time.",
                        699,
                        "Electronics",
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
                        12
                ),
                product(
                        "STAR-NOTE-005",
                        "Softcover Notebook",
                        "A smooth notebook for planning, journaling, and class notes.",
                        79,
                        "Stationery",
                        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
                        35
                ),
                product(
                        "STAR-CLOCK-006",
                        "Modern Wall Clock",
                        "A quiet wall clock with a simple face and warm modern style.",
                        219,
                        "Home",
                        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=900&q=80",
                        7
                ),
                product(
                        "STAR-WALLET-007",
                        "Slim Card Wallet",
                        "A compact wallet for cards, cash, and everyday carry.",
                        159,
                        "Accessories",
                        "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
                        15
                ),
                product(
                        "STAR-KEY-008",
                        "Leather Key Holder",
                        "A neat key holder made for simple organization on the go.",
                        129,
                        "Accessories",
                        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80",
                        5
                )
        ));
    }

    private Product product(
            String sku,
            String title,
            String description,
            Integer price,
            String category,
            String thumbnail,
            Integer stock
    ) {
        Product product = new Product();
        product.setSku(sku);
        product.setTitle(title);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);
        product.setThumbnail(thumbnail);
        product.setStock(stock);
        return product;
    }
}

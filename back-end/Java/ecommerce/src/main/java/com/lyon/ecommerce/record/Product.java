package com.lyon.ecommerce.record;


public record Product(Long id, String title, String image, Double price,
                      String description, Rating rating, Category category) {
}

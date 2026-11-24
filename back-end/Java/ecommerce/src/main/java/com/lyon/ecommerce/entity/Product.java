package com.lyon.ecommerce.entity;


 public class Product {

     private Long id;
     private String title;
     private String description;
     private Double price;
     private Integer quantite;
     private Category category;
     private String image;
     private Rating rating;

     public String getTitle() {
         return title;
     }

     public void setTitle(String name) {
         this.title = title;
     }

     public Double getPrice() {
         return price;
     }

     public void setPrice(Double price) {
         this.price = price;
     }

     public Integer getQuantite() {
         return quantite;
     }

     public void setQuantite(Integer quantite) {
         this.quantite = quantite;
     }

     public Long getId() {
         return id;
     }

     public void setId(Long id) {
         this.id = id;
     }

     public Category getCategory() {
         return category;
     }

     public void setCategory(Category category) {
         this.category = category;
     }

     public Rating getRating() {
         return rating;
     }

     public void setRating(Rating rating) {
         this.rating = rating;
     }

     public String getImage() {
         return image;
     }

     public void setImage(String image) {
         this.image = image;
     }

     public String getDescription() {
         return description;
     }

     public void setDescription(String description) {
         this.description = description;
     }
}

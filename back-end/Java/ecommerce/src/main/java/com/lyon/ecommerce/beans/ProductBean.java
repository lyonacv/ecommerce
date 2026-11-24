package com.lyon.ecommerce.beans;


public class ProductBean {

    private Long id;
    private String title;
    private String description;
    private Double price;
    private Integer quantite;
    private CategoryBean categoryBean;
    private String image;
    private RatingBean ratingBean;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
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

    public CategoryBean getCategoryBean() {
        return categoryBean;
    }

    public void setCategory(CategoryBean categoryBean) {
        this.categoryBean = categoryBean;
    }

    public RatingBean getRatingBean() {
        return ratingBean;
    }

    public void setRating(RatingBean ratingBean) {
        this.ratingBean = ratingBean;
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

package com.lyon.ecommerce.service;

import com.lyon.ecommerce.beans.ProductBean;
import com.lyon.ecommerce.beans.RatingBean;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final List<ProductBean> productBeans = new ArrayList<>();

    @Autowired
    private CategoryService categoryService;

    @PostConstruct
    private void setProducts() {
        RatingBean rating = new RatingBean();
        rating.setRate(Double.valueOf("4.9"));
        rating.setCount(5);

        ProductBean product = new ProductBean();
        product.setId(1L);
        product.setTitle("Tea");
        product.setDescription("");
        product.setImage("");
        product.setPrice(4.0);
        product.setQuantite(6);
        product.setRating(rating);
        product.setCategory(categoryService.getCategoryById(1L));

        ProductBean product1 = new ProductBean();
        product1.setId(2L);
        product1.setTitle("Coffee");
        product1.setPrice(8.0);
        product1.setDescription("");
        product1.setImage("");
        product1.setQuantite(10);
        product1.setRating(rating);
        product1.setCategory(categoryService.getCategoryById(2L));

        ProductBean product2 = new ProductBean();
        product2.setId(3L);
        product2.setTitle("Chocolate");
        product2.setDescription("");
        product2.setImage("");
        product2.setPrice(6.0);
        product2.setQuantite(20);
        product2.setRating(rating);
        product2.setCategory(categoryService.getCategoryById(3L));

        ProductBean product3 = new ProductBean();
        product3.setId(4L);
        product3.setTitle("Carot");
        product3.setDescription("");
        product3.setImage("");
        product3.setPrice(4.0);
        product3.setQuantite(8);
        product3.setRating(rating);
        product3.setCategory(categoryService.getCategoryById(3L));

        ProductBean product4 = new ProductBean();
        product4.setId(5L);
        product4.setTitle("Tomate");
        product4.setPrice(4.0);
        product4.setDescription("");
        product4.setImage("");
        product4.setQuantite(8);
        product4.setRating(rating);
        product4.setCategory(categoryService.getCategoryById(3L));

        ProductBean product5 = new ProductBean();
        product5.setId(6L);
        product5.setTitle("Carot");
        product5.setPrice(4.0);
        product5.setDescription("");
        product5.setImage("");
        product5.setQuantite(8);
        product5.setRating(rating);
        product5.setCategory(categoryService.getCategoryById(3L));

        ProductBean product6 = new ProductBean();
        product6.setId(7L);
        product6.setTitle("Apple");
        product6.setPrice(4.0);
        product6.setDescription("");
        product6.setImage("");
        product6.setQuantite(10);
        product6.setRating(rating);
        product6.setCategory(categoryService.getCategoryById(3L));

        ProductBean product7 = new ProductBean();
        product7.setId(8L);
        product7.setTitle("Bananne");
        product7.setPrice(4.0);
        product7.setDescription("");
        product7.setImage("");
        product7.setQuantite(13);
        product7.setRating(rating);
        product7.setCategory(categoryService.getCategoryById(3L));

        ProductBean product8 = new ProductBean();
        product8.setId(9L);
        product8.setTitle("Straberry");
        product8.setPrice(4.0);
        product8.setDescription("");
        product8.setImage("");
        product8.setQuantite(8);
        product8.setRating(rating);
        product8.setCategory(categoryService.getCategoryById(3L));

        productBeans.add(product);
        productBeans.add(product1);
        productBeans.add(product2);
        productBeans.add(product3);
        productBeans.add(product4);
        productBeans.add(product5);
        productBeans.add(product6);
        productBeans.add(product7);
        productBeans.add(product8);
    }

    public List<ProductBean> getProductBeans() {
        return productBeans;
    }

    /**
     * Méthode pour enregistre un product
     * @param productBean product
     * @return objet de type productBean
     */
    public ProductBean save(ProductBean productBean) {
        Long id = this.productBeans.size()+1L;
        productBean.setId(id);
        this.productBeans.add(productBean);
        return productBean;
    }

    /**
     * Méthode pour mettre à jour un objet de type ProductBean
     * @param productBean product
     * @return un objet de type productBean
     */
    public ProductBean update(ProductBean productBean) {
        ProductBean pro = this.productBeans.stream().filter(p -> p.getId()
                .equals(productBean.getId())).findAny().orElse(null);
        int index = this.productBeans.indexOf(pro);
        this.productBeans.set(index, productBean);
        return productBean;
    }

    /**
     * Méthode pour supprimir un product
     * @param id identifiant du product
     */
    public void delete(Long id) {
        ProductBean pro = this.productBeans.stream().filter(p -> p.getId().equals(id)).findAny().orElse(null);
        this.productBeans.remove(pro);
    }
}

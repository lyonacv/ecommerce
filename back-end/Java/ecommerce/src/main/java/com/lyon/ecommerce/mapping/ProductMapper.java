package com.lyon.ecommerce.mapping;

import com.lyon.ecommerce.beans.CategoryBean;
import com.lyon.ecommerce.beans.ProductBean;
import com.lyon.ecommerce.beans.RatingBean;
import com.lyon.ecommerce.record.Category;
import com.lyon.ecommerce.record.Product;
import com.lyon.ecommerce.record.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Classe pour faire le mapping un objet ProductBean vers un objet Product
 */
@Service
public class ProductMapper implements Mapper<ProductBean, Product> {

    @Autowired
    private Mapper<CategoryBean, Category> categoryMapper;

    @Autowired
    private Mapper<RatingBean, Rating> ratingMapper;

    /**
     * Méthode pour mapper un objet ProductBean vers un objet product
     * @param productBean
     * @return un objet de type Product
     */
    @Override
    public Product toDo(ProductBean productBean) {
        Product product = null;
        if (productBean != null) {
            Category category = categoryMapper.toDo(productBean.getCategoryBean());
            Rating rating = ratingMapper.toDo(productBean.getRatingBean());
            product = new Product(productBean.getId(), productBean.getTitle(), productBean.getImage(),  productBean.getPrice(), productBean.getDescription(), rating , category);
        }
        return product;
    }

    /**
     * Méthode pour mapper un objet de type Product vers type ProductBean
     * @param product objet de type Product
     * @return un objet de type ProductBean
     */
    @Override
    public ProductBean doTo(Product product) {
        ProductBean productBean = new ProductBean();
        if (product != null) {
            RatingBean ratingBean = ratingMapper.doTo(product.rating());
            CategoryBean categoryBean = categoryMapper.doTo(product.category());
            productBean.setId(product.id());
            productBean.setImage(product.image());
            productBean.setDescription(product.description());
            productBean.setPrice(product.price());
            productBean.setTitle(product.title());
            productBean.setRating(ratingBean);
            productBean.setCategory(categoryBean);
        }
        return productBean;
    }
}

package com.lyon.ecommerce.mapping;

import com.lyon.ecommerce.beans.CategoryBean;
import com.lyon.ecommerce.record.Category;
import org.springframework.stereotype.Service;

/**
 * Classe pour mapper un objet CategoryBean vers Category
 */
@Service
public class CategoryMapper implements Mapper<CategoryBean, Category> {

    @Override
    public Category toDo(CategoryBean categoryBean) {
        Category category = null;
        if (categoryBean != null) {
            category = new Category(categoryBean.getId(),
                    categoryBean.getName(),
                    categoryBean.getDescription());
        }
        return category;
    }

    @Override
    public CategoryBean doTo(Category category) {
        CategoryBean categoryBean = new CategoryBean();
        if (category != null) {
            categoryBean.setId(category.id());
            categoryBean.setName(category.name());
            categoryBean.setDescription(category.description());
        }
        return categoryBean;
    }
}

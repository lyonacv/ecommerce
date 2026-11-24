package com.lyon.ecommerce.service;

import com.lyon.ecommerce.beans.CategoryBean;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Class Category Service
 */
@Service
public class CategoryService {

   private final List<CategoryBean> categoryBeans = new ArrayList<>();

   @PostConstruct
   private void setCategories () {

      CategoryBean category = new CategoryBean();
      category.setId(1L);
      category.setName("Drinks hot");
      category.setDescription("");

      CategoryBean category1 = new CategoryBean();
      category1.setId(2L);
      category1.setName("Fruits");
      category1.setDescription("");

      CategoryBean category2 = new CategoryBean();
      category2.setId(3L);
      category2.setName("Vegetables");
      category2.setDescription("");

      categoryBeans.add(category);
      categoryBeans.add(category1);
      categoryBeans.add(category2);
   }

   /**
    * Méthode pour retourner une category par id
    * @param id identifiant de la category
    * @return objet de type Category
    */
   public CategoryBean getCategoryById(Long id) {
      return categoryBeans.stream().filter(p -> id.equals(p.getId())).findAny().orElse(null);
   }

   public List<CategoryBean> getCategoryBeans() {
      return categoryBeans;
   }

   /**
    * Méthode pour create new category
    * @param categoryBean category
    */
   public CategoryBean save(CategoryBean categoryBean) {
      Long id = this.getCategoryBeans().size()+1L;
      categoryBean.setId(id);
      this.categoryBeans.add(categoryBean);
      return categoryBean;
   }

   /**
    * Méthode pour mettre à jour une categorie
    * @param categoryBean category
    * @return objet de type Categorie
    */
   public CategoryBean update(CategoryBean categoryBean) {
      CategoryBean category = this.categoryBeans.stream().filter(p -> p.getId().equals(categoryBean.getId())).findAny().orElse(null);
      int index = this.categoryBeans.indexOf(category);
      this.categoryBeans.set(index,categoryBean);
      return categoryBean;
   }

   /**
    * Méthode pour supprimer une category
    * @param id identifiant du category
    */
   public void delete(Long id) {
      this.categoryBeans.removeIf(c -> id.equals(c.getId()));
   }
}

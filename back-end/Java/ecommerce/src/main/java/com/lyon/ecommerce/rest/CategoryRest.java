package com.lyon.ecommerce.rest;

import com.lyon.ecommerce.beans.CategoryBean;
import com.lyon.ecommerce.beans.ProductBean;
import com.lyon.ecommerce.mapping.Mapper;
import com.lyon.ecommerce.record.Category;
import com.lyon.ecommerce.service.CategoryService;
import com.lyon.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/api")
public class CategoryRest {

    @Autowired
    private Mapper<CategoryBean, Category> categoryMapper;

    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.getCategoryBeans().stream().map(categoryMapper::toDo).toList();
    }

    @GetMapping("/categorie/{id}")
    public Category getCategorieById(@PathVariable("id") Long id) {
        return categoryService.getCategoryBeans().stream()
                .filter(c -> id.compareTo(c.getId()) == 0)
                .map(categoryMapper::toDo).findAny().orElse(null);
    }

    @GetMapping("/totalProduitByCategory")
    public Map<String, Integer> getTotalProduitByCategory() {
        return productService.getProductBeans().stream()
                .collect(Collectors.groupingBy(p-> p.getCategoryBean().getName(),
                        Collectors.summingInt(ProductBean::getQuantite)));

    }

    @PostMapping("/category")
    public ResponseEntity<Category> saveProduct(@RequestBody Category category) {
        CategoryBean categoryBean = categoryMapper.doTo(category);
        Category ca = categoryMapper.toDo(categoryService.save(categoryBean));
        return new ResponseEntity<Category>(ca,HttpStatus.OK);
    }

    @PutMapping("/category")
    public ResponseEntity<Category> updateProduct(@RequestBody Category category) {
        CategoryBean categoryBean = categoryMapper.doTo(category);
        Category ca = categoryMapper.toDo(categoryService.update(categoryBean));
        return new ResponseEntity<Category>(ca, HttpStatus.OK);
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable("id") Long id) {
        categoryService.delete(id);
        String json = "{\"result\": \"Todo delete\"}";
        return new ResponseEntity<Object>(json, HttpStatus.OK);
    }

}

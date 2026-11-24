package com.lyon.ecommerce.rest;

import com.lyon.ecommerce.beans.ProductBean;
import com.lyon.ecommerce.mapping.Mapper;
import com.lyon.ecommerce.record.Product;
import com.lyon.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ProduitRest {

    @Autowired
    private Mapper<ProductBean, Product> productMapper;

    @Autowired
    private ProductService productService;

    @GetMapping("/titles")
    public String names(){
        return productService.getProductBeans().stream().map(ProductBean::getTitle).collect(Collectors.joining(" , "));
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getProductBeans().stream().map(productMapper::toDo).toList();
    }

    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable("id") Long id) {
        return productService.getProductBeans().stream()
                .filter(p -> p.getId().equals(id))
                .map(productMapper::toDo).findAny().orElse(null);
    }

    @PostMapping("/product")
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        ProductBean productBean = productMapper.doTo(product);
        Product po = productMapper.toDo(productService.save(productBean));
        return new ResponseEntity<Product>(po, HttpStatus.CREATED);
    }

    @PutMapping("/product")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        ProductBean productBean = productMapper.doTo(product);
        Product po = productMapper.toDo(productService.update(productBean));
        return new ResponseEntity<Product>(po, HttpStatus.OK);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
        productService.delete(id);
        String json = "{\"result\": \"Todo delete\"}";
        return new ResponseEntity<Object>(json, HttpStatus.OK);
    }
}

package com.lyon.ecommerce.mapping;

/**
 * Interface pour mapper un objet de type A à un objet de type B
 * @param <A>
 * @param <B>
 */
public interface Mapper <A, B> {
    /**
     * Méthode pour faire le mapping d'un objet de type A vers un objet de type B
     * @param object
     * @return Objet de type B
     */
    B toDo(A object);

    /**
     * Méthode pour faire le mapping d'un objet de type B vers un objet de type A
     * @param object
     * @return Objet de type A
     */
    A doTo (B object);
}

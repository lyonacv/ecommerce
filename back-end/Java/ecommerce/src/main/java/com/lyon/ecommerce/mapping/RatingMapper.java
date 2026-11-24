package com.lyon.ecommerce.mapping;

import com.lyon.ecommerce.beans.RatingBean;
import com.lyon.ecommerce.record.Rating;
import org.springframework.stereotype.Service;

/**
 * Classe pour mapper un objet RatingBean vers un objet Rating
 *
 */
@Service
public class RatingMapper implements Mapper<RatingBean, Rating> {

    /**
     * Méthode pour mapper un objet RatingBean vers un objet rating
     * @param ratingBean objet de type RatingBean
     * @return un objet de type Rating
     */
    @Override
    public Rating toDo(RatingBean ratingBean) {
        Rating rating = null;
        if( ratingBean != null ) {
            rating = new Rating(ratingBean.getRate(), ratingBean.getCount());
        }
        return rating;
    }

    /**
     * Methode pour mapper un objet de type RatingBean
     * @param rating objet de type Rating bean
     * @return RatingBean
     */
    @Override
    public RatingBean doTo(Rating rating) {
        RatingBean ratingBean = new RatingBean();
        if (rating != null) {
            ratingBean.setRate(rating.rate());
            ratingBean.setCount(rating.count());
        }
        return ratingBean;
    }
}

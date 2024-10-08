import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import RestaurantCard from '../../components/RestaurantCard';
import { getAllRestaurants } from '../../.husky/apiData/RestaurantData';

export default function All() {
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    getAllRestaurants()
      .then((data) => {
        if (isMounted) {
          setRestaurants(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Container>
      <h1 className="text-center my-4">All Restaurants</h1>
      <Button
        variant="primary"
        onClick={() => router.push('/Restaurants/new')}
        className="mb-3"
      >
        Add New Restaurant
      </Button>
      <Row xs={1} md={2} lg={3} className="g-4">
        {restaurants.map((restaurant) => (
          <Col key={restaurant.id}>
            <RestaurantCard
              id={restaurant.id}
              name={restaurant.name}
              imageUrl={restaurant.image_url}
              streetAddress={restaurant.street_address}
              city={restaurant.city}
              state={restaurant.state}
              zipCode={restaurant.zip_code}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

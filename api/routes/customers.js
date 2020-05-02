const { pool } = require('../config')
// const bcrypt = require('bcrypt')

// /customer/:cid/restaurant/:rest_id/order
const orderFood = (request, response) => {
  const { cid, rest_id } = request.params
  // this should be an array of array. there should be food name, fid, price, quantity ORDERED (NOT QUANTITY LEFT)
  var food_array = request.body.orderList
  const array_length = food_array.length
  const { payment_method, restaurant_location, location } = request.body
  var fee = 3.00
  const order_id = pool.query('SELECT addOrder($1, $2, $3, $4, $5)', [fee, cid, payment_method, restaurant_location, location])
  var i = 0
  for (i = 0; i < array_length; i++) {
    pool.query('SELECT addFoodToOrder($1, $2, $3)', [order_id, food_array[i].fid, food_array[i].quantity], (error, results) => {
      if (error) {
        response.status(400).send('Unable to order')
        throw error
      }

      // var isAvailable = pool.query('SELECT availability FROM Food_Items WHERE fid = $1', [food_array[i].fid])

    })
  }
  
}

// /customer/:cid/login
const login = (request, response) => {
  const username = request.body.username
  // const hashedPassword = bcrypt.hash(request.body.password, 10)
  const password = request.body.password

  pool.query('SELECT authUser($1, $2)', [username, password], (error, results) => {
    if (error) {
      response.status(400).send('Cannot Login. Please try again.')
      throw error
    }
    response.status(200).send('Successfully logged in!')
  })
}

// /customer/:cid/restaurant
const getRestaurants = (request, response) => {
  pool.query('SELECT * FROM restaurants', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// /customer/:cid/restaurant_categories
const getRestaurantCategories = (request, response) => {
  pool.query('SELECT * FROM restaurant_categories', (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows)
  })
}

// /customer/:cid/restaurant/:rest_id/menus
const getMenusByRestId = (request, response) => {
  const {rest_id} = request.params

  pool.query('SELECT * FROM Menus where rest_id = $1', [rest_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// /customer/:cid/restaurant/:rest_id/menus/:menu_id
const getFoodItemsByMenuId = (request, response) => {
  const {menu_id} = request.params

  pool.query('SELECT * FROM food_items where menu_id = $1', [menu_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


// /customer/:cid/restaurant/:rest_id/menus/:menu_id/:fid
const getFoodAvailabilityByFid = (request, response) => {
  const { menu_id, fid } = request.params

  pool.query('SELECT f.name, f.availability FROM Food_Items f WHERE f.menu_id = $1 AND f.fid = $2', [menu_id, fid], (error, results) => {
    if (error) {
      response.status(400).send('Unable to get food availability')
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// /customer/:cid/restaurant/:rest_id/menus/:menu_id/:name
const getFoodAvailabilityByName = (request, response) => {
  const { menu_id, name } = request.params

  pool.query('SELECT f.name, f.availability FROM Food_Items f WHERE f.menu_id = $1 AND f.name = $2', [menu_id, name], (error, results) => {
    if (error) {
      response.status(400).send('Unable to get food availability')
      throw error
    }
    response.status(200).json(results.rows)
  })
}


// /customer/:cid/profile
const viewProfile = (request, response) => {
  const { cid } = request.params
  
  pool.query('SELECT getCustomerProfile($1)', [cid], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows)
  })
}

// /customer/:cid/points
const getPointsById = (request, response) => {
  const { cid } = request.params

  pool.query('SELECT * FROM Customers WHERE cid = $1', [cid], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows)
  })
}

// /customer/:cid/orders
const getOrdersByCid = (request, response) => {
  const { cid } = request.params

  pool.query('SELECT * FROM Orders WHERE cid = $1', [cid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// /customer/:cid/orders/:did/review
const rateDeliveriesByDid = (request, response) => {
  const { cid, did } = request.params
  const { rating } = request.body

  pool.query('INSERT INTO customer_rates_delivery (cid, did, rating) VALUES ($1, $2, $3)', [cid, did, rating], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Delivery Rating added`)

  })
}

// /customer/:cid/orders/food_items/:oid
const getFoodItemsBySpecifiedOrderId = (request, response) => {
  const { oid } = request.params

  pool.query('SELECT o.fid, f.name FROM Food_Items f, Order_Contains_Food o WHERE o.oid = $1 AND o.fid = f.fid', [oid], (error, results) => {
    if (error) {
      response.status(400).send('Unable to get food items')
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// /customer/:cid/orders/food_item/:oid/:fid/review
const reviewsFoodItems = (request, response) => {
  const { cid, fid } = request.params
  const { review } = request.body

  pool.query('INSERT INTO reviews (cid, fid, review_desc) VALUES ($1, $2, $3)', [cid, fid, review], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('Review sent')
  })
}

// /customer/:cid/profile/insertCC
const insertCCInfo = (request, response) => {
  const { cid } = request.params
  const cc_name = request.body.cc_name
  const expiryDate = request.body.expiryDate
  const num = request.body.num

  pool.query('SELECT updateCC($1, $2, $3, $4)', [cid, cc_name, expiryDate, num], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('Credit Card Updated')
  })
}


// const usePoints = (request, response) => {
//   const 
// }




module.exports = {
  orderFood,
  login,
  getRestaurants,
  getRestaurantCategories,
  getMenusByRestId,
  getFoodItemsByMenuId,
  getFoodAvailabilityByFid,
  getFoodAvailabilityByName,
  viewProfile,
  getPointsById,
  getOrdersByCid,
  rateDeliveriesByDid,
  getFoodItemsBySpecifiedOrderId,
  reviewsFoodItems,
  insertCCInfo
}
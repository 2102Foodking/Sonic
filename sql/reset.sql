DROP TYPE rights CASCADE;
DROP TYPE statuses CASCADE;
DROP TYPE methods CASCADE;

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Restaurant_Categories CASCADE;
DROP TABLE IF EXISTS FDS_Managers CASCADE;
DROP TABLE IF EXISTS Promotions CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS Riders CASCADE;
DROP TABLE IF EXISTS Deliveries CASCADE;
DROP TABLE IF EXISTS Restaurants CASCADE;
DROP TABLE IF EXISTS Menus CASCADE;
DROP TABLE IF EXISTS Restaurant_Staff CASCADE;
DROP TABLE IF EXISTS Food_Items CASCADE;
DROP TABLE IF EXISTS Reports CASCADE;
DROP TABLE IF EXISTS Managers_Has_Promotions CASCADE;
DROP TABLE IF EXISTS Restaurants_Has_Promotions CASCADE;
DROP TABLE IF EXISTS Reviews CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Order_Contains_Food CASCADE;
DROP TABLE IF EXISTS Customer_Rates_Delivery CASCADE;
DROP TABLE IF EXISTS Shifts CASCADE;

DROP FUNCTION IF EXISTS getRestaurants();
DROP FUNCTION IF EXISTS getMenus(VARCHAR);
DROP FUNCTION IF EXISTS getFoodItems(VARCHAR, VARCHAR);
DROP FUNCTION IF EXISTS addUser(VARCHAR, VARCHAR, VARCHAR, RIGHTS);
DROP FUNCTION IF EXISTS addFdsManager(VARCHAR, VARCHAR, VARCHAR);
DROP FUNCTION IF EXISTS addRestaurantStaff(VARCHAR, VARCHAR, VARCHAR);
DROP FUNCTION IF EXISTS addCustomer(VARCHAR, VARCHAR, VARCHAR);
DROP FUNCTION IF EXISTS addRider(VARCHAR, VARCHAR, VARCHAR);
DROP FUNCTION IF EXISTS authUser(VARCHAR, VARCHAR);

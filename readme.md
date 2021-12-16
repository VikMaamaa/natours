# Natours Application

Built: using modern technologies: nodejs, express, mongodDb, mongoose

Natours has
1.E-Mail Verification System 
2.MapBox Geolocation System to indicate locations of tours
3.Online Payment System
4.Login/Register feature
5.CMS for Admin
6.JWT Authentication
7.Image Resizer for resizing images during uploads
8.Multer for Image storage

Natours is an ecommerce site that allow purchases of tours, a user can register and login, 
there are three different roles for users: 
1.Admin
2.User
3.Tour Guides

The Admin can create new tours, edit and delete from the admin dashboard, the admin can also mange users and assign roles to users.
The Admin can also see users who made bookings and can assign tour guides to different tours.

The User can access history of payments made and bookings made. Users who are logged in  and have paid for a tour, can rate and review that tour.
Admin and Tour Guides are restricted from making reviews.

#To Deploy.
when deploying these are the configuration variables that needs to be specified:
1.DATABASE - MongoDb Address
2.EMAIL_FROM - email address that specifies sender
3.EMAIL_PASSWORD - email password
4.EMAIL_USERNAME - email address
5.JWT_COOKIES_EXPIRE_IN - specifies days for JWT expiration(e.g 90)
6.JWT_EXPIRES_IN - specifies days for JWT expiration(e.g 90d)
7.JWT_SECRET - text to be used for JWT encryption and decryption
8.NODE_ENV - 'production' to be used
9.STRIPE_SECRET_KEY - secret key for stripe payment gateway

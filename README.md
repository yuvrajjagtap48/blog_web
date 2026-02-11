# 10-02-2026
- Install tailwind css and DaisyUI
- Install react-router-dom
- Create Login-Logout (SignIn + Login)
- Create "/" => /Body => NavBar + Footer
- Create "/" => /Feed 
- 

Body 
    NavBar
    Route = /login  => Login
    Route = /blogs => blogs/ like 
    Route = /profile  => Profile
    Route = /Create  => Create Blog
    Route = /Edit => Edit Blog



    


# 11-02-2026
API Design

authRouter
    POST /signup
    POST /login
    POST /logout

Blogs
    POST    /blogs/                => 
    GET     /blogs/                => 
    GET     /blogs/{id}/
    PATCH   /blogs/{id}/
    DELETE  /blogs/{id}/
    POST    /blogs/{id}/like/
    GET     /blogs/{id}/comments/
    POST    /blogs/{id}/comments/


profileRouter
    GET   /profile
    PATCH /profile/edit
    PATCH /profile/password //forgot password API

- Plan API Design 
- Create redux store for app
- set user in store 
- Create Profile route for user 
- Create profile edit route for user
- Create Blog feed that contain all blog 
- Add Pagination to Blogs feed that only contain 6 blogs at time 
- Create BlogDetails that contain full info about blogs
 
    
    
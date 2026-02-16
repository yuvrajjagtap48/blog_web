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

    
# 12-02-2026
- Resolve error of redux
- Add BlogSlice for increment of like button
- Update Blogs components 
- add Comments feature with author reply on it 


# 13-02-2026
- Create a new Route for Creating NewBlog 
- Create User can create new blog with value{Title,AuthorName,PhotoUrl,CreatedDate,LastModify,DetailInfo}
- Add CreatedDate and LastModify date to BlogDetails using system date 
- One user can add multiple comments and blogs but only like each blog once
- Fix auto logout on page refresh by implementing localStorage persistence for user authentication
- Remove CreateNewBlog route and add it inside feed page 
- Add flotting back button to website
- remove some routes
- show Profile and newBlog at same route
- update navbar
- add {home about contact} route 
- add logout option icon with logout functionlity
- add create new blog option on navbar so user can see it 
- Add blur effect to popup of profile and create new blog
- Add info into footer and place it after blog feed
- clean some of code 


# 16-02-2026
# Debouncing in search
- if difference between 2 key strockes is <200ms => DECLINE API call =>   >200ms make API call
-  
 useEffect(() => {
    // make an API call after every key press
    // but if the difference between 2 API calls is <200ms
    // decline the API call

    const timer = setTimeout(() => {
      if (searchQuery) {
        getSearchResults();
      }
    }, 200);


    /**
     * press key - i
     *  - render the component with searchQuery = "i"
     *  - useEffect();
     *  - start timer => make api call after 200ms
     * 
     * key - ip 
     *  - destroy the component(useEffect return method)
     *  - re-render the component
     *  - useEffect()
     *  - clear the previous timer (for "i") => no API call for "i"
     *  - start new timer for "ip"
     * 
     * 
     * - new timer starts for "ip"
     * setTimeout(200) - make an API call for "ip"
     * 
     * 
     */
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchResults = async () => {
    const data = await fetch(`http://localhost:3000/blogs?q=${searchQuery}`);
    const json = await data.json();
    console.log(json);
    
  }
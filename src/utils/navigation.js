const getNavigation = (user) => {

    const authLinks = [
      {
        title: "Books",
        link: "/books"
      },
      {
        title: "Events",
        link: "/events"
      },
      {
        title: "Share your thoughts",
        link: "/share"
      },
      {
        title: "Profile",
        link: `/profile/${user && user.id}`
      }
    ]
  
    const guestLinks = [
      {
        title: "Books",
        link: "/books"
      },
      {
        title: "Events",
        link: "/events"
      },
      {
        title: "Register",
        link: "/register"
      },
      {
        title: "Login",
        link: "/login"
      }
    ]
    const loggedIn = user && user.loggedIn
    // const loggedIn=true
    return loggedIn ? authLinks : guestLinks
  }
  
  export default getNavigation
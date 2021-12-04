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
        title: "My Page",
        link: `/my-page/${user && user.userId}`
      },
      {
        title: "Logout",
        link: "/logout"
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
    const loggedIn = user && user.username
    return loggedIn ? authLinks : guestLinks
  }
  
  export default getNavigation
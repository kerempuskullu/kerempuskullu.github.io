window.onload = function() {
  updateDom(window.location.pathname);
  updateLinks();
  async function updateDom(path) {
    path = path.substring(1);
    if (path === "") {
      path = "/";
    }
    document.getElementById("content").innerHTML = document.getElementById(path).innerHTML;
    window.scrollTo(0, 0);
  }

  function updateLinks() {
    document.querySelectorAll("a").forEach((link) => {
      if (link.host === window.location.host) {
        link.setAttribute("data-internal", true);
        link.addEventListener("click", async (e) => {
          const destination = link.getAttribute("href");
          e.preventDefault();
          history.pushState({
            route: destination
          }, destination, destination);
          await updateDom("/" + destination);
        });
      } else {
        link.setAttribute("data-external", true);
      }
    });
  }
  window.onpopstate = function() {
    updateDom(window.location.pathname);
  };
};

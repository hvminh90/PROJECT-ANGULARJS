using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace AngularJS_Test1
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            //routes.MapRoute(
            //    name: "AngularCatchAllRoute",
            //    url: "angular/{*.}",
            //    defaults: new { controller = "Angular", action = "Index", id = UrlParameter.Optional }
            //);

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);


            //routes.MapRoute(
            //    name: "about",
            //    url: "Home/About",
            //    defaults: new { controller = "Home", action = "About" });

            //routes.MapRoute(
            //    name: "NhanVien",
            //    url: "Home/NhanVien",
            //    defaults: new { controller = "Home", action = "NhanVien" });

            //routes.MapRoute(
            //    name: "Info",
            //    url: "Home/Info",
            //    defaults: new { controller = "Home", action = "Info" });


           routes.MapRoute(
               name: "Default",
               url: "{*url}",
               defaults: new { controller = "Home", action = "Index" });

            //routes.AppendTrailingSlash = true;
        }
    }
}

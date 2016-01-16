using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace AngularJS_Test1
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.Formatters.XmlFormatter.AddUriPathExtensionMapping("xml", XmlMediaTypeFormatter.DefaultMediaType);
            config.Formatters.JsonFormatter.AddUriPathExtensionMapping("json", JsonMediaTypeFormatter.DefaultMediaType);
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

           
        }
    }
}

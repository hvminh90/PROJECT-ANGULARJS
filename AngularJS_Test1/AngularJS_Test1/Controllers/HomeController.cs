using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJS_Test1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult NhanVien()
        {
            return View();
        }
        public ActionResult About()
        {
            return View();
        }
        public ActionResult Info()
        {
            return View();
        }
    }
}

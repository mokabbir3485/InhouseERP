
using InHouseERP.UI;
using Microsoft.AspNet.SignalR;
using System;
using System.Threading;
using System.Web.Mvc;

namespace HomeCinema.Web.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }

        
    }
}
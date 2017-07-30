using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iPOS.Web.Areas.Administrator.Controllers
{
    public class ReferenceController : Controller
    {
        // GET: Administrator/Reference
        public ActionResult Index()
        {
            ViewBag.Form = "Adjustment";
            ViewBag.Controller = "Adjustment";
            ViewBag.Action = "Module";

            return View();
        }
    }
}
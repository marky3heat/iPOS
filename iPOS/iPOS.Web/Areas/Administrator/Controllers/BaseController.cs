using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iPOS.Web.Areas.Administrator.Controllers
{
    public class BaseController : Controller
    {
        // GET: Administrator/Base
        public ActionResult Index()
        {
            return View();
        }
    }

}
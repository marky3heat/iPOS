using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using iPOS.Web.Service.Interface;
using iPOS.Web.Database;
using iPOS.Web.Models;
using iPOS.Web.Repository;
using iPOS.Web.Service;

namespace iPOS.Web.Areas.Administrator.Controllers
{
    public class PawningController : Controller
    {
        #region PUBLIC CONSTRUCTOR
        private readonly IReferenceService _referenceService;

        public PawningController(IReferenceService referenceService)
        {
            _referenceService = referenceService;
        }
        public PawningController()
        {
            _referenceService = new ReferenceService(new UnitOfWorkFactory());
        }
        #endregion

        // GET: Administrator/Pawning
        public ActionResult Index()
        {
            ViewBag.Form = "Pawning";
            ViewBag.Controller = "Pawning";
            ViewBag.Action = "Module";

            return View();
        }
    }
}
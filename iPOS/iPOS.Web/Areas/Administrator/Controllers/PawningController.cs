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
        private readonly IPawningService _pawningService;

        public PawningController(IPawningService pawningService)
        {
            _pawningService = pawningService;
        }
        public PawningController()
        {
            _pawningService = new PawningService(new UnitOfWorkFactory());
        }
        #endregion

        #region VIEW
        // GET: Administrator/Pawning
        public ActionResult Index()
        {
            ViewBag.Form = "Pawning";
            ViewBag.Controller = "Pawning";
            ViewBag.Action = "Module";

            return View();
        }
        #endregion

        #region JSON REQUEST METHODS
        // GET
        [HttpGet]
        [Route("Administrator/Customer/GetCustomerList")]
        public async Task<JsonResult> GetPawnedItems(int page, int pageSize)
        {
            var listItemType = await _appraisalService.GetItemTypeList();
            var listItemCategory = await _appraisalService.GetItemCategoryList();
            var listAppraisedItem = await _appraisalService.GetList(page, pageSize);

            var result =
                from a in listAppraisedItem
                join b in listItemCategory on a.ItemCategoryId equals b.ItemCategoryId
                join c in listItemType on a.ItemTypeId equals c.ItemTypeId
                select new
                {
                    a.AppraiseId,
                    a.AppraiseDate,
                    a.AppraiseNo,
                    a.ItemTypeId,
                    a.ItemCategoryId,
                    a.ItemName,
                    a.Weight,
                    a.AppraisedValue,
                    a.Remarks,
                    a.CustomerFirstName,
                    a.CustomerLastName,
                    a.IsPawned,
                    a.CreatedBy,
                    a.CreatedAt,
                    b.ItemCategoryName,
                    c.ItemTypeName
                };

            return Json(new { data = result.OrderByDescending(d => d.AppraiseDate).ThenBy(s => s.IsPawned), noMoreData = result.Count() < pageSize, recordCount = result.Count() }, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
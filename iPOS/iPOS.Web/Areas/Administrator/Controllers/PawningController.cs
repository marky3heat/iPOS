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
        private readonly IAppraisalService _appraisalService;
        private readonly ICustomerService _customerService;

        public PawningController(
            IPawningService pawningService,
            IAppraisalService appraisalService,
            ICustomerService customerServic)
        {
            _pawningService = pawningService;
            _appraisalService = appraisalService;
            _customerService = customerServic;
        }
        public PawningController()
        {
            _pawningService = new PawningService(new UnitOfWorkFactory());
            _appraisalService = new AppraisalService(new UnitOfWorkFactory());
            _customerService = new CustomerService(new UnitOfWorkFactory());
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
            var listPawnedItem = await _pawningService.GetList(page, pageSize);
            var result =
                from a in listPawnedItem
                select new
                {
                    a.PawnedItemId,
                    a.PawnedItemNo,
                    a.PawnedDate,
                    a.IsReleased
                };

            return Json(new { data = result.OrderByDescending(d => d.PawnedDate).ThenBy(s => s.IsReleased), noMoreData = result.Count() < pageSize, recordCount = result.Count() }, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> GetAppraisedItem(int ItemTypeId)
        {
            var listAppraisedItem = await _appraisalService.GetList();
            var result = listAppraisedItem.Select(item => new appraiseditem
            {
                AppraiseId = item.AppraiseId,

            });

            return Json(result.OrderBy(o => o.), JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> GetItemCategory(int ItemTypeId)
        {
            var list = await _appraisalService.GetItemCategoryByItemTypeId(ItemTypeId);
            var result = list.Select(item => new itemcategory()
            {
                ItemCategoryId = item.ItemCategoryId,
                ItemCategoryName = item.ItemCategoryName,
                ItemTypeId = item.ItemTypeId
            });

            return Json(result.OrderBy(o => o.ItemCategoryName), JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}
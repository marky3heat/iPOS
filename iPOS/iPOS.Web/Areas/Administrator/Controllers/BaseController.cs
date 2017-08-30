﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using iPOS.Web.Service.Interface;
using iPOS.Web.Database;
using iPOS.Web.Models;
using iPOS.Web.Areas.Administrator.Models;
using iPOS.Web.Repository;
using iPOS.Web.Service;


namespace iPOS.Web.Areas.Administrator.Controllers
{
    public class BaseController : Controller
    {
        #region PUBLIC CONSTRUCTOR
        private readonly IPawningService _pawningService;
        private readonly IAppraisalService _appraisalService;
        private readonly ICustomerService _customerService;
        private readonly IReferenceService _referenceService;
        private readonly IPawnshopTransactionService _pawnshopTransactionService;

        public BaseController(
            IPawningService pawningService,
            IAppraisalService appraisalService,
            ICustomerService customerServic,
            IReferenceService referenceService,
            IPawnshopTransactionService pawnshopTransactionService)
        {
            _pawningService = pawningService;
            _appraisalService = appraisalService;
            _customerService = customerServic;
            _referenceService = referenceService;
            _pawnshopTransactionService = pawnshopTransactionService;
        }
        public BaseController()
        {
            _pawningService = new PawningService(new UnitOfWorkFactory());
            _appraisalService = new AppraisalService(new UnitOfWorkFactory());
            _customerService = new CustomerService(new UnitOfWorkFactory());
            _referenceService = new ReferenceService(new UnitOfWorkFactory());
            _pawnshopTransactionService = new PawnshopTransactionService(new UnitOfWorkFactory());
        }
        #endregion

        #region VIEW

        // GET: Administrator/Base
        public ActionResult Index()
        {
            return View();
        }

        #endregion

        #region JSON REQUEST METHODS

        public async Task<JsonResult> GetCustomer()
        {
            var listCustomer = await _customerService.GetCustomerList();
            var result = listCustomer.Select(item => new tbl_ipos_customer()
            {
                CustomerId = item.autonum,
                FirstName = item.first_name + " " + item.last_name,
                LastName = item.last_name
            });

            return Json(result.OrderBy(o => o.LastName), JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> GetItemType()
        {
            var list = await _appraisalService.GetItemTypeList();
            var result = list.Select(item => new tbl_ipos_itemtype()
            {
                ItemTypeId = item.ItemTypeId,
                ItemTypeName = item.ItemTypeName
            });

            return Json(result.OrderBy(o => o.ItemTypeName), JsonRequestBehavior.AllowGet);
        }
        public async Task<JsonResult> GetItemCategory(int ItemTypeId)
        {
            var list = await _appraisalService.GetItemCategoryByItemTypeId(ItemTypeId);
            var result = list.Select(item => new tbl_ipos_itemcategory()
            {
                ItemCategoryId = item.ItemCategoryId,
                ItemCategoryName = item.ItemCategoryName,
                ItemTypeId = item.ItemTypeId
            });

            return Json(result.OrderBy(o => o.ItemCategoryName), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetServerDate()
        {
            var serverDate = DateTime.Now.ToString("MM/dd/yyyy");

            return Json(serverDate, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetTransactionNo()
        {
            var result = _referenceService.GetSelectedNoGenerator(1, "1");

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion
    }

}
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
using iPOS.Web.Repository;
using iPOS.Web.Service;

namespace iPOS.Web.Areas.Administrator.Controllers
{
    public class AppraisalController : Controller
    {
        #region PUBLIC CONSTRUCTOR
        private readonly IAppraisalService _appraisalService;

        public AppraisalController(IAppraisalService customerService)
        {
            _appraisalService = customerService;
        }
        public AppraisalController()
        {
            _appraisalService = new AppraisalService(new UnitOfWorkFactory());
        }
        #endregion

        #region VIEW
        public ActionResult Index()
        {
            ViewBag.Controller = "Appraisal";
            ViewBag.Action = "Appraise List";
            ViewBag.activeAppraisal = "active bg-grey-800";
            return View();
        }
        #endregion

        #region JSON REQUEST METHODS
        // GET
        [HttpGet]
        [Route("Administrator/Customer/GetCustomerList")]
        public async Task<JsonResult> GetAppraisedItemList(int page, int pageSize)
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
        public ActionResult GetAppraiseNo()
        {
            var apraiseNo = _appraisalService.GetAppraiseNo();

            return Json(apraiseNo+1, JsonRequestBehavior.AllowGet);
        }
        // POST
        [HttpPost]
        public async Task<JsonResult> SaveAppraisedItem(tbl_ipos_appraiseditem item)
        {
            try
            {
                tbl_ipos_appraiseditem model = null;

                bool success = false;
                string message = "";

                if (string.IsNullOrEmpty(item.AppraiseId.ToString()) || item.AppraiseId.ToString() == "0")
                {
                    //DateTime dt = DateTime.ParseExact(item.AppraiseDate, "yyyy/MM/dd", CultureInfo.InvariantCulture);

                    model = new tbl_ipos_appraiseditem();
                    model.AppraiseDate = item.AppraiseDate;
                    model.AppraiseNo = item.AppraiseNo;
                    model.ItemTypeId = item.ItemTypeId;
                    model.ItemCategoryId = item.ItemCategoryId;
                    model.ItemName = item.ItemName;
                    model.Weight = item.Weight;
                    model.AppraisedValue = item.AppraisedValue;
                    model.Remarks = item.Remarks;
                    model.CustomerFirstName = item.CustomerFirstName;
                    model.CustomerLastName = item.CustomerLastName;
                    model.IsPawned = false;
                    model.CreatedAt = DateTime.Now;
                    model.CreatedBy = "";

                    var result = await _appraisalService.Save(model);
                    success = result;
                    if (result)
                    {
                        message = "Successfully saved.";
                    }
                    else
                    {
                        message = "Error saving data. Duplicate entry.";
                    }
                }
                else
                {
                    model = await _appraisalService.FindById(item.AppraiseId);
                    model.ItemTypeId = item.ItemTypeId;
                    model.ItemCategoryId = item.ItemCategoryId;
                    model.ItemName = item.ItemName;
                    model.Weight = item.Weight;
                    model.AppraisedValue = item.AppraisedValue;
                    model.Remarks = item.Remarks;
                    model.CustomerFirstName = item.CustomerFirstName;
                    model.CustomerLastName = item.CustomerLastName;

                    var result = await _appraisalService.Update(model);
                    success = result;
                    if (result)
                    {
                        message = "Successfully updated.";
                    }
                    else
                        message = "Error saving data. Please contact administrator.";
                }

                return Json(new { success = success, message = message });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        #endregion
    }
}
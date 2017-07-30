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
    public class ReferenceController : Controller
    {
        #region PUBLIC CONSTRUCTOR
        private readonly IReferenceService _referenceService;

        public ReferenceController(IReferenceService referenceService)
        {
            _referenceService = referenceService;
        }
        public ReferenceController()
        {
            _referenceService = new ReferenceService(new UnitOfWorkFactory());
        }
        #endregion

        // GET: Administrator/Reference
        public ActionResult Index()
        {
            ViewBag.Form = "Adjustment";
            ViewBag.Controller = "Adjustment";
            ViewBag.Action = "Module";

            return View();
        }

        #region Json Methods

        // GET
        [HttpGet]
        [Route("Administrator/Reference/LoadItemTypeList")]
        public async Task<JsonResult> LoadItemTypeList()
        {
            var listItemType = await _referenceService.GetItemTypeList();

            var result =
                from a in listItemType
                select a;

            return Json(new { data = result }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("Administrator/Reference/LoadItemCategoryList")]
        public async Task<JsonResult> LoadItemCategoryList()
        {
            var listItemCategory = await _referenceService.GetItemCategoryList();
            var listItemType = await _referenceService.GetItemTypeList();

            var result =
                from a in listItemCategory
                join b in listItemType on a.ItemTypeId equals b.ItemTypeId
                select new
                {
                    a.ItemCategoryId,
                    a.ItemCategoryName,
                    b.ItemTypeName
                };

            return Json(new { data = result }, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> GetItemType()
        {
            var listItemCategory = await _referenceService.GetItemTypeList();
            var result = listItemCategory.Select(item => new itemtype()
            {
                ItemTypeId = item.ItemTypeId,
                ItemTypeName = item.ItemTypeName,
            });

            return Json(result.OrderBy(o => o.ItemTypeName), JsonRequestBehavior.AllowGet);
        }

        // POST
        [HttpPost]
        public async Task<JsonResult> SaveItemType(itemtype itemtype)
        {
            try
            {
                itemtype itemTypeModel = null;

                bool success = false;
                string message = "";

                if (string.IsNullOrEmpty(itemtype.ItemTypeId.ToString()) || itemtype.ItemTypeId.ToString() == "0")
                {
                    itemTypeModel = new itemtype();
                    itemTypeModel.ItemTypeId = itemtype.ItemTypeId;
                    itemTypeModel.ItemTypeName = itemtype.ItemTypeName;
                    itemTypeModel.CreatedBy = "";
                    itemTypeModel.CreatedAt = DateTime.Now;

                    var result = await _referenceService.SaveItemType(itemTypeModel);
                    success = result;
                    if (result)
                    {
                        message = "Successfully saved.";
                    }
                    else
                    {
                        message = "Error saving data. Please contact administrator.";
                    }
                }
                else
                {
                    itemTypeModel = await _referenceService.FindItemTypeById(itemtype.ItemTypeId);
                    itemTypeModel.ItemTypeId = itemtype.ItemTypeId;
                    itemTypeModel.ItemTypeName = itemtype.ItemTypeName;
                    itemTypeModel.CreatedBy = "";
                    itemTypeModel.CreatedAt = DateTime.Now;

                    var result = await _referenceService.UpdateItemType(itemTypeModel);
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

        [HttpPost]
        public async Task<JsonResult> SaveItemCategory(itemcategory itemcategory)
        {
            try
            {
                itemcategory itemCategoryModel = null;

                bool success = false;
                string message = "";

                if (string.IsNullOrEmpty(itemcategory.ItemCategoryId.ToString()) || itemcategory.ItemCategoryId.ToString() == "0")
                {
                    itemCategoryModel = new itemcategory();
                    itemCategoryModel.ItemTypeId = itemcategory.ItemTypeId;
                    itemCategoryModel.ItemCategoryName = itemcategory.ItemCategoryName;
                    itemCategoryModel.ItemTypeId = itemcategory.ItemTypeId;
                    itemCategoryModel.CreatedBy = "";
                    itemCategoryModel.CreatedAt = DateTime.Now;

                    var result = await _referenceService.SaveItemCategory(itemCategoryModel);
                    success = result;
                    if (result)
                    {
                        message = "Successfully saved.";
                    }
                    else
                    {
                        message = "Error saving data. Please contact administrator.";
                    }
                }
                else
                {
                    itemCategoryModel = await _referenceService.FindItemCategoryById(itemcategory.ItemCategoryId);
                    itemCategoryModel.ItemTypeId = itemcategory.ItemTypeId;
                    itemCategoryModel.ItemCategoryName = itemcategory.ItemCategoryName;
                    itemCategoryModel.ItemTypeId = itemcategory.ItemTypeId;
                    itemCategoryModel.CreatedBy = "";
                    itemCategoryModel.CreatedAt = DateTime.Now;

                    var result = await _referenceService.UpdateItemCategory(itemCategoryModel);
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
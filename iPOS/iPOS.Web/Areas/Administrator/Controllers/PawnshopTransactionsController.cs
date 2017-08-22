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
    public class PawnshopTransactionsController : Controller
    {
        #region PUBLIC CONSTRUCTOR
        private readonly IPawningService _pawningService;
        private readonly IAppraisalService _appraisalService;
        private readonly ICustomerService _customerService;
        private readonly IReferenceService _referenceService;
        private readonly IPawnshopTransactionService _pawnshopTransactionService;

        public PawnshopTransactionsController(
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
        public PawnshopTransactionsController()
        {
            _pawningService = new PawningService(new UnitOfWorkFactory());
            _appraisalService = new AppraisalService(new UnitOfWorkFactory());
            _customerService = new CustomerService(new UnitOfWorkFactory());
            _referenceService = new ReferenceService(new UnitOfWorkFactory());
            _pawnshopTransactionService = new PawnshopTransactionService(new UnitOfWorkFactory());
        }
        #endregion

        #region VIEW
        // GET: Administrator/Administrator
        public ActionResult Index()
        {
            ViewBag.Form = "Pawnshop Transaction";
            ViewBag.Controller = "Pawnshop Transaction";
            ViewBag.Action = "";

            return View();
        }
        #endregion

        #region JSON REQUEST METHODS
        public async Task<JsonResult> SaveTransactionSales(PawnshopTransactionModel model)
        {
            try
            {
                bool success = false;
                string message = "";

                return Json(new { success = success, message = message });

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<JsonResult> SaveTransactionPawning(PawnshopTransactionModel model)
        {
            try
            {
                bool success = false;
                string message = "";

                if (string.IsNullOrEmpty(model.TransactionId.ToString()) || model.TransactionId.ToString() == "0")
                {
                    tbl_ipos_pawnshop_transactions model1 = new tbl_ipos_pawnshop_transactions();
                    model1.TransactionNo = model.TransactionNo;
                    model1.TransactionDate = model.TransactionDate;
                    model1.TransactionType = "Pawning";
                    model1.Terminal = "1";
                    model1.Status = "On Process";
                    model1.ReviewedBy = "";
                    model1.ApprovedBy = "";
                    model1.CreatedBy = "";
                    model1.CreatedAt = DateTime.Now;

                    tbl_ipos_customer model2 = new tbl_ipos_customer();
                    model2.FirstName = model.FirstName;
                    model2.LastName = model.LastName;
                    model2.MiddleName = "";
                    model2.MiddleInitial = "";
                    model2.Address = model.Address;
                    model2.ContactNo = model.ContactNo;

                    tbl_ipos_appraiseditem model3 = new tbl_ipos_appraiseditem();
                    model3.AppraiseDate = DateTime.Now;
                    model3.AppraiseNo = "";
                    model3.PawnshopTransactionNo = model.TransactionNo;
                    model3.ItemTypeId = model.ItemTypeId;
                    model3.ItemCategoryId = model.ItemCategoryId ;
                    model3.ItemName = model.ItemName;
                    model3.Weight = "";
                    model3.AppraisedValue = 0;
                    model3.Remarks = model.Remarks;
                    model3.CustomerFirstName = model.FirstName;
                    model3.CustomerLastName = model.LastName;
                    model3.IsPawned = false;
                    model3.CreatedAt = DateTime.Now;
                    model3.CreatedBy = "";

                    var result = await _pawnshopTransactionService.SavePawnshopTransactions(model1);
                    var result1 = await _customerService.SaveCustomer(model2);
                    var result2 = await _appraisalService.Save(model3);

                    success = result;
                    success = result1;
                    success = result2;

                    if (result)
                    {
                        tbl_ipos_no_generator noGenerator = new tbl_ipos_no_generator();
                        noGenerator = await _referenceService.FindByIdAndTerminalNoGenerator(1,"1");
                        noGenerator.No = Int32.Parse(model.TransactionNo)+1;
                        await _referenceService.UpdateNoGenerator(noGenerator);

                        message = "Successfully saved.";
                    }
                    else
                    {
                        message = "Error saving data. Duplicate entry.";
                    }
                }

                return Json(new { success = success, message = message });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<JsonResult> SaveTransactionLayaway(PawnshopTransactionModel model)
        {
            try
            {
                bool success = false;
                string message = "";



                return Json(new { success = success, message = message });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }  
        }

        public ActionResult GetTransactionNo()
        {
            var result = _referenceService.GetSelectedNoGenerator(1,"1");

            return Json(result.ToString(), JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}
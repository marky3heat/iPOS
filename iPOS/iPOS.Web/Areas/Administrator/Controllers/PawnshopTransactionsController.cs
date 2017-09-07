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

        [HttpGet]
        public async Task<JsonResult> GetTransactions()
        {
            var listPawnshopTransactions = await _pawnshopTransactionService.GetListPawnshopTransactions();

            var result =
                from a in listPawnshopTransactions
                select new
                {
                    a.TransactionId,
                    a.TransactionNo,
                    a.TransactionType,
                    a.TransactionDate,
                    a.Status,
                };

            return Json(new { data = result.OrderByDescending(d => d.Status).ThenBy(s => s.TransactionType) }, JsonRequestBehavior.AllowGet);
        }

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
                    model1.CustomerId = model.CustomerId;
                    model1.Terminal = "1";
                    model1.Status = "On Process";
                    model1.ReviewedBy = "";
                    model1.ApprovedBy = "";
                    model1.CreatedBy = "";
                    model1.CreatedAt = DateTime.Now;

                    tbl_ipos_appraiseditem model2 = new tbl_ipos_appraiseditem();
                    model2.AppraiseDate = DateTime.Now;
                    model2.AppraiseNo = "";
                    model2.ItemTypeId = model.ItemTypeId;
                    model2.ItemCategoryId = model.ItemCategoryId ;
                    model2.ItemName = model.ItemName;
                    model2.Weight = "";
                    model2.AppraisedValue = 0;
                    model2.Remarks = model.Remarks;
                    model2.CustomerFirstName = model.first_name;
                    model2.CustomerLastName = model.last_name;
                    model2.IsPawned = false;
                    model2.CreatedAt = DateTime.Now;
                    model2.CreatedBy = "";
                    model2.PawnshopTransactionId = model.TransactionNo;

                    tbl_ipos_pawneditem model3 = new tbl_ipos_pawneditem();
                    model3.PawnedItemNo = "";
                    model3.PawnedDate = null;
                    model3.PawnedDate = "";
                    model3.CustomerId = "";
                    model3.PawnedItemContractNo = "";
                    model3.LoanableAmount = "";
                    model3.InterestRate = "";
                    model3.InterestAmount = "";
                    model3.InitialPayment = "";
                    model3.ServiceCharge = "";
                    model3.Others = "";
                    model3.IsInterestDeducted = "";
                    model3.NetCashOut = "";
                    model3.TermsId = "";
                    model3.ScheduleOfPayment = "";
                    model3.NoOfPayments = "";
                    model3.DueDateStart = "";
                    model3.DueDateEnd = "";
                    model3.Status = "";
                    model3.IsReleased = "";
                    model3.CreatedBy = "";
                    model3.CreatedAt = "";

                    var result = await _pawnshopTransactionService.SavePawnshopTransactions(model1);
                    var result1 = await _appraisalService.Save(model2);

                    success = result;
                    success = result1;

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
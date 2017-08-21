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
        public async Task<JsonResult> SaveTransactionSales(PawnshopTransactionModel model)
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
                    model1.TransactionType = model.TransactionType;
                    model1.Terminal = model.Terminal;
                    model1.Status = model.Status;
                    model1.ReviewedBy = model.ReviewedBy;
                    model1.ApprovedBy = model.ApprovedBy;
                    model1.CreatedBy = "";
                    model1.CreatedAt = DateTime.Now;
                }

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


        #endregion
    }
}
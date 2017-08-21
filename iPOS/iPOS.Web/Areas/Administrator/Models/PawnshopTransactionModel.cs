using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iPOS.Web.Areas.Administrator.Models
{
    public class PawnshopTransactionModel
    {
        public int TransactionId { get; set; }
        public System.DateTime TransactionDate { get; set; }
        public string TransactionType { get; set; }
        public int CustomerId { get; set; }
        public int ItemId { get; set; }
        public int PawnId { get; set; }
        public int SaleId { get; set; }
        public int LayAwayId { get; set; }
        public string Status { get; set; }
        public string ReviewedBy { get; set; }
        public string ApprovedBy { get; set; }

        public int AppraiseId { get; set; }
        public System.DateTime AppraiseDate { get; set; }
        public string AppraiseNo { get; set; }
        public int ItemTypeId { get; set; }
        public int ItemCategoryId { get; set; }
        public string ItemName { get; set; }
        public string Weight { get; set; }
        public decimal AppraisedValue { get; set; }
        public string Remarks { get; set; }
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
        public bool IsPawned { get; set; }

        public int PawnedItemId { get; set; }
        public string PawnedItemNo { get; set; }
        public System.DateTime PawnedDate { get; set; }
        public int AppraiseIdP { get; set; }
        public int CustomerIdP { get; set; }
        public string PawnedItemContractNo { get; set; }
        public decimal LoanableAmount { get; set; }
        public decimal InterestRate { get; set; }
        public decimal InterestAmount { get; set; }
        public decimal InitialPayment { get; set; }
        public decimal ServiceCharge { get; set; }
        public decimal Others { get; set; }
        public decimal IsInterestDeducted { get; set; }
        public decimal NetCashOut { get; set; }
        public string TermsId { get; set; }
        public string ScheduleOfPayment { get; set; }
        public int NoOfPayments { get; set; }
        public System.DateTime DueDateStart { get; set; }
        public System.DateTime DueDateEnd { get; set; }
        public string StatusP { get; set; }
        public bool IsReleased { get; set; }
    }
}
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace iPOS.Web.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_ipos_pawnshop_transactions
    {
        public int TransactionId { get; set; }
        public string TransactionNo { get; set; }
        public System.DateTime TransactionDate { get; set; }
        public string TransactionType { get; set; }
        public string Terminal { get; set; }
        public string Status { get; set; }
        public string ReviewedBy { get; set; }
        public string ApprovedBy { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedAt { get; set; }
    }
}
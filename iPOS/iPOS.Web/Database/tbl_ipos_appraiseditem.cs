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
    
    public partial class tbl_ipos_appraiseditem
    {
        public int AppraiseId { get; set; }
        public Nullable<System.DateTime> AppraiseDate { get; set; }
        public string AppraiseNo { get; set; }
        public Nullable<int> ItemTypeId { get; set; }
        public Nullable<int> ItemCategoryId { get; set; }
        public string ItemName { get; set; }
        public string Weight { get; set; }
        public Nullable<decimal> AppraisedValue { get; set; }
        public string Remarks { get; set; }
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
        public Nullable<bool> IsPawned { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string PawnshopTransactionId { get; set; }
    }
}

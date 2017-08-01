using System;
using System.Collections.Generic;
using iPOS.Web.Database;

namespace iPOS.Web.Models
{
    public class AppraisalViewModel
    {
        public AppraisalViewModel()
        {
            this.ItemCategorys = new List<itemcategory>();
            this.Customers = new List<customer>();
        }
        public virtual ICollection<itemcategory> ItemCategorys { get; set; }
        public virtual ICollection<customer> Customers { get; set; }

        public int AppraiseId { get; set; }
        public string AppraiseDate { get; set; }
        public string AppraiseNo { get; set; }
        public int ItemTypeId { get; set; }
        public int ItemCategoryId { get; set; }
        public string ItemName { get; set; }
        public string Weight { get; set; }
        public string Remarks { get; set; }
        public decimal AppraisedValue { get; set; }
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
        public bool IsPawned { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
    }
}
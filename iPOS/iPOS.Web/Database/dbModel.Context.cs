﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class dbpawnshopEntities : DbContext
    {
        public dbpawnshopEntities()
            : base("name=dbpawnshopEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tbl_ipos_itemcategory> tbl_ipos_itemcategory { get; set; }
        public virtual DbSet<tbl_ipos_itemtype> tbl_ipos_itemtype { get; set; }
        public virtual DbSet<tbl_ipos_no_generator> tbl_ipos_no_generator { get; set; }
        public virtual DbSet<tbl_ipos_customer> tbl_ipos_customer { get; set; }
        public virtual DbSet<tbl_ipos_pawneditem> tbl_ipos_pawneditem { get; set; }
        public virtual DbSet<tbl_ipos_appraiseditem> tbl_ipos_appraiseditem { get; set; }
        public virtual DbSet<tbl_ipos_pawnshop_transactions> tbl_ipos_pawnshop_transactions { get; set; }
    }
}

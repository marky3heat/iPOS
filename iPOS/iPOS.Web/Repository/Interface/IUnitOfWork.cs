﻿using System;
using System.Threading.Tasks;
using iPOS.Web.Database;
using iPOS.Web.Models;

namespace iPOS.Web.Repository.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<customer> CustomerRepository { get; }
        IRepository<AppraisalViewModel> AppraisalModelRepository { get; }
        IRepository<appraiseditem> AppraisedItemRepository { get; }
        IRepository<pawneditem> PawnedItemRepository { get; }
        IRepository<releaseditem> ReleasedItemRepository { get; }
        IRepository<itemcategory> ItemCategoryRepository { get; }
        IRepository<itemtype> ItemTypeRepository { get; }
        IRepository<tbl_pawnshop_transactions> PawnshopTransactionsRepository { get; }

        void SaveChanges();
        Task SaveChangesAsync();

        Task MaxAsync();
    }
}

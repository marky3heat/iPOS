using System;
using System.Threading.Tasks;
using iPOS.Web.Database;
using iPOS.Web.Models;

namespace iPOS.Web.Repository.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<tbl_ipos_no_generator> NoGeneratorRepository { get; }

        IRepository<tbl_ipos_pawnshop_transactions> PawnshopTransactionsRepository { get; }

        IRepository<tbl_customer> CustomerRepository { get; }

        IRepository<tbl_ipos_appraiseditem> AppraisedItemRepository { get; }
        IRepository<tbl_ipos_pawneditem> PawnedItemRepository { get; }

        IRepository<tbl_ipos_itemcategory> ItemCategoryRepository { get; }
        IRepository<tbl_ipos_itemtype> ItemTypeRepository { get; }

        void SaveChanges();
        Task SaveChangesAsync();

        Task MaxAsync();
    }
}

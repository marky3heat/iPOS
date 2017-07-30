using System;
using System.Threading.Tasks;
using iPOS.Web.Database;
using iPOS.Web.Models;

namespace iPOS.Web.Repository.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<customer> CustomerRepository { get; }
        IRepository<AppraisalViewModel> AppraisalModelRepository { get; }
        IRepository<apraiseditem> AppraisedItemRepository { get; }
        IRepository<itemcategory> ItemCategoryRepository { get; }
        IRepository<itemtype> ItemTypeRepository { get; }
        IRepository<pawneditem> PawnedItemRepository { get; }

        void SaveChanges();
        Task SaveChangesAsync();

        Task MaxAsync();
    }
}

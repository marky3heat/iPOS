using System.Collections.Generic;
using System.Threading.Tasks;
using iPOS.Web.Database;
using iPOS.Web.Models;

namespace iPOS.Web.Service.Interface
{
    interface IPawnshopTransactionService
    {
        #region  PawnhopTransactions

        Task<bool> SavePawnshopTransactions(tbl_pawnshop_transactions model);
        Task<bool> UpdatePawnshopTransactions(tbl_pawnshop_transactions model);
        Task<bool> DeletePawnshopTransactions(string id);

        Task<tbl_pawnshop_transactions> FindByIdPawnshopTransactions(int id);
        Task<List<tbl_pawnshop_transactions>> GetListPawnshopTransactions();

        #endregion

    }
}

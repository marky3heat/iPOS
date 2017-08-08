using System.Collections.Generic;
using System.Threading.Tasks;
using iPOS.Web.Database;
using iPOS.Web.Models;

namespace iPOS.Web.Service.Interface
{
    public interface IPawningService
    {
        #region Pawning

        Task<pawneditem> FindById(int id);
        Task<pawneditem> FindByPawnNo(string pawnedItemNo);
        Task<List<pawneditem>> GetList(int pageIndex = 0, int pageSize = 100);
        Task<bool> Save(pawneditem model);
        Task<bool> Update(pawneditem model);
        Task<bool> Delete(string id);
        int GetItemCode();
        int GetContractNo();

        #endregion
    }
}

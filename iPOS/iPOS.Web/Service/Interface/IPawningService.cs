using System.Collections.Generic;
using System.Threading.Tasks;
using iPOS.Web.Database;
using iPOS.Web.Models;

namespace iPOS.Web.Service.Interface
{
    interface IPawningService
    {
        #region Pawning

        Task<apraiseditem> FindById(int id);
        Task<apraiseditem> FindByAppraiseNo(string appraiseNo);
        Task<List<apraiseditem>> GetList(int pageIndex = 0, int pageSize = 100);
        Task<bool> Save(apraiseditem model);
        Task<bool> Update(apraiseditem model);
        Task<bool> Delete(string id);

        #endregion
    }
}

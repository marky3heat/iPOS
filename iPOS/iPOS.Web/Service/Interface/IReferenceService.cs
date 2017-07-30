using System.Collections.Generic;
using System.Threading.Tasks;
using iPOS.Web.Database;
using iPOS.Web.Models;

namespace iPOS.Web.Service.Interface
{
    public interface IReferenceService
    {
        #region ItemCategory
        Task<itemcategory> FindItemCategoryById(int id);

        Task<List<itemcategory>> GetItemCategoryList(int pageIndex = 0, int pageSize = 100);

        Task<bool> SaveItemCategory(itemcategory model);

        Task<bool> UpdateItemCategory(itemcategory model);

        Task<bool> DeleteItemCategory(int id);
        #endregion

        #region ItemType
        Task<itemtype> FindItemTypeById(int id);

        Task<List<itemtype>> GetItemTypeList(int pageIndex = 0, int pageSize = 100);

        Task<bool> SaveItemType(itemtype model);

        Task<bool> UpdateItemType(itemtype model);

        Task<bool> DeleteItemType(int id);
        #endregion
    }
}
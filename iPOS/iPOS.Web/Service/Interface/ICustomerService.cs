using iPOS.Web.Database;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iPOS.Web.Service.Interface
{
    public interface ICustomerService
    {
        #region Customer
        Task<customer> FindByIdCustomer(int id);

        Task<customer> FindByFirstnameLastnameCustomer(string firstname, string lastname);

        Task<List<customer>> GetCustomerList(int pageIndex = 0, int pageSize = 100);

        Task<bool> SaveCustomer(customer model);

        Task<bool> UpdateCustomer(customer model);

        Task<bool> DeleteCustomer(string id);
        #endregion
    }
}
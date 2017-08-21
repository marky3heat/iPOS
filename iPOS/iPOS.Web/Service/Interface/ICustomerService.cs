﻿using iPOS.Web.Database;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iPOS.Web.Service.Interface
{
    public interface ICustomerService
    {
        #region Customer
        Task<tbl_ipos_customer> FindByIdCustomer(int id);

        Task<tbl_ipos_customer> FindByFirstnameLastnameCustomer(string firstname, string lastname);

        Task<List<tbl_ipos_customer>> GetCustomerList(int pageIndex = 0, int pageSize = 100);

        Task<bool> SaveCustomer(tbl_ipos_customer model);

        Task<bool> UpdateCustomer(tbl_ipos_customer model);

        Task<bool> DeleteCustomer(string id);
        #endregion
    }
}
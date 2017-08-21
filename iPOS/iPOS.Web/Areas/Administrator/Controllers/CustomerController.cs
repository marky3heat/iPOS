using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using iPOS.Web.Service.Interface;
using iPOS.Web.Database;
using iPOS.Web.Models;
using iPOS.Web.Repository;
using iPOS.Web.Service;

namespace iPOS.Web.Areas.Administrator.Controllers
{
  
    public class CustomerController : Controller
    {

        private readonly ICustomerService _customerService;

        #region PUBLIC CONSTRUCTOR
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }
        public CustomerController()
        {
            _customerService = new CustomerService(new UnitOfWorkFactory());
        }

        #endregion


        #region VIEW
        public ActionResult Index()
        {
            ViewBag.Controller = "Customer";
            ViewBag.Action = "Profile";
            ViewBag.activeCustomerProfile = "active";
            return View();
        }
        #endregion


        #region JSON REQUEST METHODS
        // GET
        [HttpGet]
        [Route("Administrator/Customer/GetCustomerList")]
        public async Task<JsonResult> GetCustomerList(int page, int pageSize)
        {
            var listCustomerProfile = await _customerService.GetCustomerList(page, pageSize);

            //var result =
            //    from r in listCustomerProfile
            //    select r;
            var result = listCustomerProfile.Select(i => new tbl_ipos_customer()
            {
                CustomerId = i.CustomerId,
                FirstName = i.FirstName != null ? i.FirstName : string.Empty,
                LastName = i.LastName != null ? i.LastName : string.Empty,
                MiddleName = i.MiddleName != null ? i.MiddleName : string.Empty,
                MiddleInitial = i.MiddleInitial != null ? i.MiddleInitial : string.Empty,
                Address = i.Address != null ? i.Address : string.Empty,
                ContactNo = i.ContactNo != null ? i.ContactNo : string.Empty,
            });

            return Json(new { data = result.OrderBy(o => o.FirstName), noMoreData = result.Count() < pageSize, recordCount = result.Count() }, JsonRequestBehavior.AllowGet);
        }
        // POST
        [HttpPost]
        public async Task<JsonResult> SaveCustomer(tbl_ipos_customer customer)
        {
            try
            {
                tbl_ipos_customer modelCustomer = null;

                bool success = false;
                string message = "";

                if (string.IsNullOrEmpty(customer.CustomerId.ToString()) || customer.CustomerId.ToString() == "0")
                {
                    modelCustomer = new tbl_ipos_customer();
                    modelCustomer.FirstName = customer.FirstName;
                    modelCustomer.LastName = customer.LastName;
                    modelCustomer.MiddleName = customer.MiddleName;
                    modelCustomer.MiddleInitial = customer.MiddleInitial;
                    modelCustomer.Address = customer.Address;
                    modelCustomer.ContactNo = customer.ContactNo;

                    var result = await _customerService.SaveCustomer(modelCustomer);
                    success = result;
                    if (result)
                    {
                        message = "Successfully saved.";
                    }
                    else
                    {
                        message = "Error saving data. Please contact administrator.";
                    }                   
                }
                else
                {
                    modelCustomer = await _customerService.FindByIdCustomer(customer.CustomerId);
                    modelCustomer.FirstName = customer.FirstName;
                    modelCustomer.LastName = customer.LastName;
                    modelCustomer.MiddleName = customer.MiddleName;
                    modelCustomer.MiddleInitial = customer.MiddleInitial;
                    modelCustomer.Address = customer.Address;
                    modelCustomer.ContactNo = customer.ContactNo;

                    var result = await _customerService.UpdateCustomer(modelCustomer);
                    success = result;
                    if (result)
                    {
                        message = "Successfully updated.";
                    }
                    else
                        message = "Error saving data. Please contact administrator.";
                }

                return Json(new { success = success, message = message });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        #endregion
    }
}
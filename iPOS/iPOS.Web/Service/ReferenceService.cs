using iPOS.Web.Database;
using iPOS.Web.Repository.Interface;
using iPOS.Web.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iPOS.Web.Service
{
    public class ReferenceService : IReferenceService
    {
        #region PRIVATE MEMBER VARIABLES
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;
        #endregion

        #region PUBLIC CONSTRUCTOR
        public ReferenceService(IUnitOfWorkFactory unitOfWorkFactory)
        {
            _unitOfWorkFactory = unitOfWorkFactory;
        }
        #endregion

        #region PUBLIC MEMBER METHODS (ITEM CATEGORY)
        public async Task<tbl_ipos_itemcategory> FindItemCategoryById(int id)
        {
            try
            {
                using (var uow = _unitOfWorkFactory.Create())
                {
                    return await uow.ItemCategoryRepository.FindAsync(id);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<List<tbl_ipos_itemcategory>> GetItemCategoryList(
            int pageIndex = 0,
            int pageSize = 100)
        {
            try
            {
                using (var uow = _unitOfWorkFactory.Create())
                {
                    var itemCategList = await uow.ItemCategoryRepository.AllWithAsync(null);

                    itemCategList = itemCategList
                        .Skip(pageSize * pageIndex)
                        .Take(pageSize).ToList();

                    return itemCategList.ToList();
                }


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> SaveItemCategory(tbl_ipos_itemcategory model)
        {
            try
            {
                using (var uow = _unitOfWorkFactory.Create())
                {
                    var result = await FindItemCategoryById(model.ItemCategoryId);
                    if (result == null)
                    {
                        uow.ItemCategoryRepository.Insert(model);
                        await uow.SaveChangesAsync();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateItemCategory(tbl_ipos_itemcategory model)
        {
            try
            {
                using (var uow = _unitOfWorkFactory.Create())
                {
                    var result = await FindItemCategoryById(model.ItemCategoryId);
                    if (result != null)
                    {
                        uow.ItemCategoryRepository.Update(model);
                        await uow.SaveChangesAsync();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteItemCategory(string id)
        {
            try
            {
                using (var uow = _unitOfWorkFactory.Create())
                {
                    if (!string.IsNullOrEmpty(id))
                    {
                        uow.ItemCategoryRepository.Delete(id);
                        await uow.SaveChangesAsync();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        #endregion

        #region PUBLIC MEMBER METHODS (ITEM TYPE)
        public async Task<tbl_ipos_itemtype> FindItemTypeById(int id)
        {
            try
            {
                using (var uow = _unitOfWorkFactory.Create())
                {
                    return await uow.ItemTypeRepository.FindAsync(id);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<List<tbl_ipos_itemtype>> GetItemTypeList(
            int pageIndex = 0,
            int pageSize = 100)
        {
            try
            {
                using (var uow = _unitOfWorkFactory.Create())
                {
                    var itemTypeList = await uow.ItemTypeRepository.AllWithAsync(null);

                    itemTypeList = itemTypeList
                        .Skip(pageSize * pageIndex)
                        .Take(pageSize).ToList();

                    return itemTypeList.ToList();
                }


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> SaveItemType(tbl_ipos_itemtype model)
        {
            try
            {
                using (var uow = _unitOfWorkFactory.Create())
                {
                    var result = await FindItemTypeById(model.ItemTypeId);
                    if (result == null)
                    {
                        uow.ItemTypeRepository.Insert(model);
                        await uow.SaveChangesAsync();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateItemType(tbl_ipos_itemtype model)
        {
            try
            {
                using (var uow = _unitOfWorkFactory.Create())
                {
                    var result = await FindItemTypeById(model.ItemTypeId);
                    if (result != null)
                    {
                        uow.ItemTypeRepository.Update(model);
                        await uow.SaveChangesAsync();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteItemType(string id)
        {
            try
            {
                using (var uow = _unitOfWorkFactory.Create())
                {
                    if (!string.IsNullOrEmpty(id))
                    {
                        uow.ItemTypeRepository.Delete(id);
                        await uow.SaveChangesAsync();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        #endregion
    }
}
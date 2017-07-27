﻿using System.Data.Entity;
using iPOS.Web.Repository.Interface;
using iPOS.Web.Database;
using iPOS.Web.Models;

namespace iPOS.Web.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        //private SagepmDBContext _dbContext;
        private dbpawnshopEntities _dbContext;

        public UnitOfWork()
        {
            //_dbContext = new SagepmDBContext();
            _dbContext = new dbpawnshopEntities();
        }

        //#region PRIVATE MEMBER VARIABLES
        private Repository<customer> _customerRepository;
        private Repository<AppraisalViewModel> _appraisalModelRepository;
        private Repository<apraiseditem> _appraisedItemsRepository;
        private Repository<itemcategory> _itemCategoryRepository;
        //#region PUBLIC MEMBER METHODS
        public IRepository<customer> CustomerRepository
        {
            get
            {
                if (_customerRepository == null)
                    _customerRepository = new Repository<customer>(_dbContext);
                return _customerRepository;
            }
        }
        public IRepository<AppraisalViewModel> AppraisalModelRepository
        {
            get
            {
                if (_appraisalModelRepository == null)
                    _appraisalModelRepository = new Repository<AppraisalViewModel>(_dbContext);
                return _appraisalModelRepository;
            }
        }
        public IRepository<apraiseditem> AppraisedItemRepository
        {
            get
            {
                if (_appraisedItemsRepository == null)
                    _appraisedItemsRepository = new Repository<apraiseditem>(_dbContext);
                return _appraisedItemsRepository;
            }
        }
        public IRepository<itemcategory> ItemCategoryRepository
        {
            get
            {
                if (_itemCategoryRepository == null)
                    _itemCategoryRepository = new Repository<itemcategory>(_dbContext);
                return _itemCategoryRepository;
            }
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }

        public System.Threading.Tasks.Task SaveChangesAsync()
        {
            return _dbContext.SaveChangesAsync();
        }

        public System.Threading.Tasks.Task MaxAsync()
        {
            return _dbContext.apraiseditems.MaxAsync(a => a.AppraiseId);
        }
        //#endregion        
    }
}

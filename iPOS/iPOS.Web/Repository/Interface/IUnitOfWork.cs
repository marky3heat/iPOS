using System;
using System.Threading.Tasks;
using iPOS.Web.Database;
using iPOS.Web.Models;

namespace iPOS.Web.Repository.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        //IRepository<AspNetUser> AspNetUsersRepository { get; }
        //IRepository<AspNetUserRole> AspNetUserRolesRepository { get; }
        //IRepository<AspNetRole> AspNetRolesRepository { get; }
        //IRepository<User> UsersRepository { get; }
        //IRepository<Project> ProjectsRepository { get; }
        //IRepository<ProjectTask> ProjectTasksRepository { get; }
        //IRepository<ProjectDocument> ProjectDocumentsRepository { get; }
        //IRepository<SagePM.Data.Models.Task> TasksRepository { get; }
        IRepository<customer> CustomerRepository { get; }
        IRepository<AppraisalViewModel> AppraisalModelRepository { get; }
        IRepository<apraiseditem> AppraisedItemRepository { get; }
        IRepository<itemcategory> ItemCategoryRepository { get; }
        void SaveChanges();
        Task SaveChangesAsync();

        Task MaxAsync();
    }
}

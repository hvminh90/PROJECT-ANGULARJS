using AngularJS_Test1.Infrastructure.Core;
using AngularJS_Test1.Models;
using AngularJS_Test1.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Security;

namespace AngularJS_Test1.Controllers.API
{
    //[Authorize(Roles = "Admin")]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiControllerBase
    {
        ItemDBEntities dbContext = new ItemDBEntities();
        MembershipService _membershipService = new MembershipService();
        //public CustomMemberShip MembershipService { get; set; }
        //public CustomRoleProvider AuthorizationService { get; set; }


        //protected override void Initialize(System.Web.Http.Controllers.HttpControllerContext controllerContext)
        //{
        //    //Your Logic
        //    //throw new HttpResponseException(controllerContext.Request.CreateErrorResponse(System.Net.HttpStatusCode.Unauthorized, "error"));
            
        //    if (AuthorizationService == null)
        //        AuthorizationService = new CustomRoleProvider();
        //    base.Initialize(controllerContext);
        //}
         [AllowAnonymous]
         [Route("test")]
        [HttpGet]
        public string Test()
        {
            return "minh";
        }

        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public HttpResponseMessage Login(HttpRequestMessage request, LoginViewModel user)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                MembershipContext _userContext = _membershipService.ValidateUser(user.Username, user.Password);

                if (_userContext.User != null)
                {
                    
                    response = request.CreateResponse(HttpStatusCode.OK, new { success = true });
                }
                else
                {
                    response = request.CreateResponse(HttpStatusCode.OK, new { success = false });
                }
                
                return response;
            });

            //var a = User.Identity.Name;
        }

        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public HttpResponseMessage Register(HttpRequestMessage request, RegistrationViewModel user)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var _user = CreateUser(user.Username, user.Email, user.Password, new int[] { 1 });

              

                if (_user != null)
                {
                    response = request.CreateResponse(HttpStatusCode.OK, new { success = true });
                }
                else
                {
                    response = request.CreateResponse(HttpStatusCode.OK, new { success = false });
                }
                return response;
            });
        }

        public User CreateUser(string username, string passWord, string email, int[] roles)
        {

            var passwordSalt = EncryptionService.CreateSalt();
            var user = new User()
            {
                Username = username,
                Salt = passwordSalt,
                Email = email,
                IsLocked = false,
                HashedPassword = "123456789",//EncryptionService.EncryptPassword(passWord, passwordSalt),
                DateCreated = DateTime.Now
            };
            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            if (roles != null || roles.Length > 0)
            {
                foreach (var role in roles)
                {
                    var userRole = new UserRole
                    {
                        RoleId = role,
                        UserId = user.ID
                    };
                    dbContext.UserRoles.Add(userRole);
                }
                dbContext.SaveChanges();
            }
            return user;
        }
        
    }
}
using AngularJS_Test1.Infrastructure.Core;
using AngularJS_Test1.Models;
using AngularJS_Test1.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace AngularJS_Test1.Controllers.API
{
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiControllerBase
    {
        ItemDBEntities dbContext = new ItemDBEntities();
        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public HttpResponseMessage Login(HttpRequestMessage request, LoginViewModel user)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                if (ValidateUser(user.Username, user.Password))
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

        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public HttpResponseMessage Register(HttpRequestMessage request, RegistrationViewModel user,string RoleId)
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
                HashedPassword = EncryptionService.EncryptPassword(passWord, passwordSalt),
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
        public User CheckExistUser(string username)
        {
           
            var user = dbContext.Users.Where(p => p.Username == username).FirstOrDefault();
            if (user != null) return user;
            return null;
        }
        private bool isPasswordValid(User user, string password)
        {
            return string.Equals(EncryptionService.EncryptPassword(password, user.Salt), user.HashedPassword);
        }

        private bool isUserValid(User user, string password)
        {
            if (isPasswordValid(user, password))
            {
                return !user.IsLocked;
            }

            return false;
        }
        public  bool ValidateUser(string username, string password)
        {
            var user = CheckExistUser(username);
            if (user != null && isUserValid(user, password))
                return true;
            return false;
        }
    }
}
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace AngularJS_Test1.Controllers.API
{
    public class FileUploadController : ApiController
    {
        [HttpPost]
        public string UploadFiles()
        {
            string Message, fileName, actualFileName;
            Message = fileName = actualFileName = string.Empty;
            bool flag = false;
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                var file = System.Web.HttpContext.Current.Request.Files[0];
                actualFileName = file.FileName;
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                int size = file.ContentLength;

                try
                {
                    file.SaveAs(Path.Combine(HttpContext.Current.Server.MapPath("~/Upload/TieuDe"), fileName));
                    Message = "Succsess";
                }
                catch (Exception)
                {
                    Message = "File upload failed! Please try again";
                }

            }
            return Message;
        }

    }
}


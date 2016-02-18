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
        public string Upload(HttpRequest request)
        {

            for (int i = 0; i < request.Files.Count; i++)
            {
                var file = request.Files[i];

                var fileName = Path.GetFileName(file.FileName);

                var path = Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/Upload/TieuDe/"), fileName);
                file.SaveAs(path);
            }
            return "success!";
        }
        //public string UploadFiles()
        //{
        //    int iUploadedCnt = 0;

        //    // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.
        //    string sPath = "";
        //    sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Upload/TieuDe/");

        //    System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

        //    // CHECK THE FILE COUNT.
        //    for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
        //    {
        //        System.Web.HttpPostedFile hpf = hfc[iCnt];

        //        if (hpf.ContentLength > 0)
        //        {
        //            // CHECK IF THE SELECTED FILE(S) ALREADY EXISTS IN FOLDER. (AVOID DUPLICATE)
        //            if (!File.Exists(sPath + Path.GetFileName(hpf.FileName)))
        //            {
        //                // SAVE THE FILES IN THE FOLDER.
        //                hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));
        //                iUploadedCnt = iUploadedCnt + 1;
        //            }
        //        }
        //    }

        //    // RETURN A MESSAGE (OPTIONAL).
        //    if (iUploadedCnt > 0)
        //    {
        //        return iUploadedCnt + " Files Uploaded Successfully";
        //    }
        //    else
        //    {
        //        return "Upload Failed";
        //    }
        //}


        //public async Task<HttpResponseMessage> PostStuff()
        //{
        //    //if (!Request.Content.IsMimeMultipartContent())
        //    //{
        //    //    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
        //    //}

        //    var root = HttpContext.Current.Server.MapPath("~/App_Data/Temp/FileUploads");
        //    Directory.CreateDirectory(root);
        //    var provider = new MultipartFormDataStreamProvider(root);
        //    var result = await Request.Content.ReadAsMultipartAsync(provider);
        //    //if (result.FormData["model"] == null)
        //    //{
        //    //    throw new HttpResponseException(HttpStatusCode.BadRequest);
        //    //}

        //    //var model = result.FormData["model"];
        //    ////TODO: Do something with the json model which is currently a string



        //    //get the files
        //    foreach (var file in result.FileData)
        //    {
        //        //TODO: Do something with each uploaded file
        //    }

        //    return Request.CreateResponse(HttpStatusCode.OK, "success!");
        //}


    }
}


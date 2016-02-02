using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AngularJS_Test1;

namespace AngularJS_Test1.Controllers.API
{
   
    public class TheLoaiController : ApiController
    {
        private ItemDBEntities db = new ItemDBEntities();

        // GET api/TheLoai
       //[Authorize(Roles="User")]
        public IQueryable<TheLoai> GetTheLoais()
        {
            return db.TheLoais.Where(p=>p.IsDelete == false);
        }

        // GET api/TheLoai/5
        [ResponseType(typeof(TheLoai))]
        public IHttpActionResult GetTheLoai(long id)
        {
            TheLoai theloai = db.TheLoais.Find(id);
            if (theloai == null)
            {
                return NotFound();
            }

            return Ok(theloai);
        }

        // PUT api/TheLoai/5
        public IHttpActionResult PutTheLoai(long id, TheLoai theloai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != theloai.TheLoaiId)
            {
                return BadRequest();
            }

            db.Entry(theloai).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheLoaiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/TheLoai
        [ResponseType(typeof(TheLoai))]
        public IHttpActionResult PostTheLoai(TheLoai theloai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TheLoais.Add(theloai);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = theloai.TheLoaiId }, theloai);
        }

        // DELETE api/TheLoai/5
        [ResponseType(typeof(TheLoai))]
        public IHttpActionResult DeleteTheLoai(long id)
        {
            TheLoai theloai = db.TheLoais.Find(id);
            if (theloai == null)
            {
                return NotFound();
            }

            //db.TheLoais.Remove(theloai);
            theloai.IsDelete = true;
            db.SaveChanges();

            return Ok(theloai);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TheLoaiExists(long id)
        {
            return db.TheLoais.Count(e => e.TheLoaiId == id) > 0;
        }
    }
}
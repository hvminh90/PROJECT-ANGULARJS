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

namespace AngularJS_Test1.Controllers
{
    public class NhanVienController : ApiController
    {
        private ItemDBEntities db = new ItemDBEntities();

        // GET api/APINhanVien
        public IQueryable<NhanVien> GetNhanViens()
        {
            return db.NhanViens;
        }

        // GET api/APINhanVien/5
        [ResponseType(typeof(NhanVien))]
        public IHttpActionResult GetNhanVien(long id)
        {
            NhanVien nhanvien = db.NhanViens.Find(id);
            if (nhanvien == null)
            {
                return NotFound();
            }

            return Ok(nhanvien);
        }

        // PUT api/APINhanVien/5
        public IHttpActionResult PutNhanVien(long id, NhanVien nhanvien)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nhanvien.ID)
            {
                return BadRequest();
            }

            db.Entry(nhanvien).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhanVienExists(id))
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

        // POST api/APINhanVien
        [ResponseType(typeof(NhanVien))]
        public IHttpActionResult PostNhanVien(NhanVien nhanvien)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.NhanViens.Add(nhanvien);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = nhanvien.ID }, nhanvien);
        }

        // DELETE api/APINhanVien/5
        [ResponseType(typeof(NhanVien))]
        public IHttpActionResult DeleteNhanVien(long id)
        {
            NhanVien nhanvien = db.NhanViens.Find(id);
            if (nhanvien == null)
            {
                return NotFound();
            }

            db.NhanViens.Remove(nhanvien);
            db.SaveChanges();

            return Ok(nhanvien);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhanVienExists(long id)
        {
            return db.NhanViens.Count(e => e.ID == id) > 0;
        }
    }
}
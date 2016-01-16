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
    public class TinTucController : ApiController
    {
        private ItemDBEntities db = new ItemDBEntities();

        // GET api/TinTuc
        public IQueryable<TinTuc> GetTinTucs()
        {
            return db.TinTucs;
        }
        [Route("api/TinTuc/getTinTuc-{id}")]
        public IQueryable<TinTuc> GetTinTucByTheLoaiId(long id)
        {
            return db.TinTucs.Where(p=>p.TheLoaiId == id);
        }

        // GET api/TinTuc/5
        [ResponseType(typeof(TinTuc))]
        public IHttpActionResult GetTinTuc(long id)
        {
            TinTuc tintuc = db.TinTucs.Find(id);
            if (tintuc == null)
            {
                return NotFound();
            }

            return Ok(tintuc);
        }

        // PUT api/TinTuc/5
        public IHttpActionResult PutTinTuc(long id, TinTuc tintuc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tintuc.TinTucId)
            {
                return BadRequest();
            }

            db.Entry(tintuc).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TinTucExists(id))
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

        // POST api/TinTuc
        [ResponseType(typeof(TinTuc))]
        public IHttpActionResult PostTinTuc(TinTuc tintuc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TinTucs.Add(tintuc);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tintuc.TinTucId }, tintuc);
        }

        // DELETE api/TinTuc/5
        [ResponseType(typeof(TinTuc))]
        public IHttpActionResult DeleteTinTuc(long id)
        {
            TinTuc tintuc = db.TinTucs.Find(id);
            if (tintuc == null)
            {
                return NotFound();
            }

            db.TinTucs.Remove(tintuc);
            db.SaveChanges();

            return Ok(tintuc);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TinTucExists(long id)
        {
            return db.TinTucs.Count(e => e.TinTucId == id) > 0;
        }
    }
}
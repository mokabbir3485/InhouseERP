using System;
using System.Collections.Generic;
using System.Linq;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_StockAuditGroupBLL //: IDisposible
    {
        public ad_StockAuditGroupBLL()
        {
            //ad_StockAuditGroupDAO = ad_StockAuditGroup.GetInstanceThreadSafe;
            ad_StockAuditGroupDAO = new ad_StockAuditGroupDAO();
        }

        public ad_StockAuditGroupDAO ad_StockAuditGroupDAO { get; set; }

        public List<ad_StockAuditGroup> GetAll()
        {
            try
            {
                return ad_StockAuditGroupDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockAuditGroup> GetAllActive()
        {
            try
            {
                return ad_StockAuditGroupDAO.GetAll().Where(g => g.IsActive).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_StockAuditGroup ad_StockAuditGroup)
        {
            try
            {
                return ad_StockAuditGroupDAO.Add(ad_StockAuditGroup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_StockAuditGroup ad_StockAuditGroup)
        {
            try
            {
                return ad_StockAuditGroupDAO.Update(ad_StockAuditGroup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int auditGroupId)
        {
            try
            {
                return ad_StockAuditGroupDAO.Delete(auditGroupId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
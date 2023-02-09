using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_StockAuditTypeBLL //: IDisposible
    {
        public ad_StockAuditTypeBLL()
        {
            //ad_StockAuditTypeDAO = ad_StockAuditType.GetInstanceThreadSafe;
            ad_StockAuditTypeDAO = new ad_StockAuditTypeDAO();
        }

        public ad_StockAuditTypeDAO ad_StockAuditTypeDAO { get; set; }

        public List<ad_StockAuditType> GetAll()
        {
            try
            {
                return ad_StockAuditTypeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockAuditType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_StockAuditTypeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockAuditType> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_StockAuditTypeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_StockAuditType _ad_StockAuditType)
        {
            try
            {
                return ad_StockAuditTypeDAO.Add(_ad_StockAuditType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_StockAuditType _ad_StockAuditType)
        {
            try
            {
                return ad_StockAuditTypeDAO.Update(_ad_StockAuditType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int AuditTypeId)
        {
            try
            {
                return ad_StockAuditTypeDAO.Delete(AuditTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
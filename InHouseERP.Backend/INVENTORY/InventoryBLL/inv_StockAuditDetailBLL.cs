using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockAuditDetailBLL //: IDisposible
    {
        public inv_StockAuditDetailBLL()
        {
            //inv_StockAuditDetailDAO = inv_StockAuditDetail.GetInstanceThreadSafe;
            inv_StockAuditDetailDAO = new inv_StockAuditDetailDAO();
        }

        public inv_StockAuditDetailDAO inv_StockAuditDetailDAO { get; set; }

        public List<inv_StockAuditDetail> GetAll()
        {
            try
            {
                return inv_StockAuditDetailDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockAuditDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_StockAuditDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockAuditDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockAuditDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockAuditDetail _inv_StockAuditDetail)
        {
            try
            {
                return inv_StockAuditDetailDAO.Add(_inv_StockAuditDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StockAuditDetail _inv_StockAuditDetail)
        {
            try
            {
                return inv_StockAuditDetailDAO.Update(_inv_StockAuditDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long auditDetailId)
        {
            try
            {
                return inv_StockAuditDetailDAO.Delete(auditDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
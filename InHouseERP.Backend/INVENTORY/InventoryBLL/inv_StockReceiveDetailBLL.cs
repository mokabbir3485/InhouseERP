using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockReceiveDetailBLL //: IDisposible
    {
        public inv_StockReceiveDetailBLL()
        {
            //inv_StockReceiveDetailDAO = inv_StockReceiveDetail.GetInstanceThreadSafe;
            inv_StockReceiveDetailDAO = new inv_StockReceiveDetailDAO();
        }

        public inv_StockReceiveDetailDAO inv_StockReceiveDetailDAO { get; set; }

        public List<inv_StockReceiveDetail> GetAll()
        {
            try
            {
                return inv_StockReceiveDetailDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockReceiveDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_StockReceiveDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockReceiveDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockReceiveDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockReceiveDetail _inv_StockReceiveDetail)
        {
            try
            {
                return inv_StockReceiveDetailDAO.Add(_inv_StockReceiveDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StockReceiveDetail _inv_StockReceiveDetail)
        {
            try
            {
                return inv_StockReceiveDetailDAO.Update(_inv_StockReceiveDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long sRDetailId)
        {
            try
            {
                return inv_StockReceiveDetailDAO.Delete(sRDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_XrptStockReceive> GetByRecivedId(long SRId)
        {
            try
            {
                return inv_StockReceiveDetailDAO.GetByRecivedId(SRId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}